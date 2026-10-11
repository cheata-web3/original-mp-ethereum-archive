// Reproduces the MP runtime and creation bytecode from the Etherscan source.
// Usage:
//   curl -sSLo soljson-v0.3.5.js https://binaries.soliditylang.org/bin/soljson-v0.3.5+commit.5f97274a.js
//   node scripts/verify-source-match.js soljson-v0.3.5.js
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const root = path.join(__dirname, '..');
const dir = path.join(root, 'verification/etherscan-source-match');
const settings = JSON.parse(fs.readFileSync(path.join(dir, 'compiler-settings.json'), 'utf8'));
const compilerPath = process.argv[2] || 'soljson-v0.3.5.js';

const read = (p) => fs.readFileSync(p, 'utf8').trim().replace(/^0x/, '');
const fail = (msg) => { console.error('FAIL: ' + msg); process.exit(1); };

const compilerHash = crypto.createHash('sha256').update(fs.readFileSync(compilerPath)).digest('hex');
if (compilerHash !== settings.compilerSha256) fail('compiler sha256 mismatch: ' + compilerHash);
console.log('Compiler sha256: PASS');

const solc = require(path.resolve(compilerPath));
const compile = solc.cwrap('compileJSON', 'string', ['string', 'number']);
const src = fs.readFileSync(path.join(dir, settings.sourceFile), 'utf8');
const out = JSON.parse(compile(src, settings.optimizer ? 1 : 0));
if (out.errors) fail(JSON.stringify(out.errors));
const c = out.contracts[settings.contractName];

const onchainRuntime = read(path.join(root, 'archive/runtime-bytecode.hex'));
if (c.runtimeBytecode !== onchainRuntime) fail('runtime bytecode differs from archive/runtime-bytecode.hex');
console.log('Runtime bytecode == on-chain runtime: PASS (' + onchainRuntime.length / 2 + ' bytes)');

const creationInput = read(path.join(root, 'archive/creation-input.hex'));
const args = read(path.join(dir, 'constructor-args.hex'));
if (creationInput !== c.bytecode + args) fail('creation input != compiled creation bytecode + constructor args');
console.log('Creation input == compiled creation bytecode + constructor args: PASS');

const w = args.match(/.{64}/g);
const str = (off) => { const i = off / 32; const n = parseInt(w[i], 16); return Buffer.from(w.slice(i + 1).join('').slice(0, n * 2), 'hex').toString(); };
const decoded = {
  _initialAmount: BigInt('0x' + w[0]).toString(),
  _tokenName: str(parseInt(w[1], 16)),
  _decimalUnits: parseInt(w[2], 16),
  _tokenSymbol: str(parseInt(w[3], 16)),
};
const expected = JSON.parse(fs.readFileSync(path.join(dir, 'decoded-constructor-args.json'), 'utf8'));
for (const k of Object.keys(decoded)) if (String(decoded[k]) !== String(expected[k])) fail('constructor arg ' + k);
console.log('Constructor args (' + decoded._tokenName + ', ' + decoded._tokenSymbol + ', ' + decoded._decimalUnits + ' decimals, ' + decoded._initialAmount + ' raw): PASS');
console.log('ALL CHECKS PASSED');
