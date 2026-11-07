// Public EIP-191 attestation only. Never requests a private key or sends a transaction.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { verifyMessage, getAddress } = require('ethers');
const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'archive/ethereum-mainnet.json'), 'utf8'));
const repository = 'https://github.com/cheata-web3/original-mp-ethereum-archive';
const digest = () => crypto.createHash('sha256')
  .update(fs.readFileSync(path.join(root, 'archive/hashes.txt'))).digest('hex');

function messageFor(p) {
  return [
    'MP creator-address control attestation v1',
    `Repository: ${repository}`,
    `Publisher account claimed by signer: cheata-web3`,
    `Network: Ethereum Mainnet (chain ID 1)`,
    `Contract: ${manifest.contractAddress}`,
    `Creation transaction: ${manifest.creationTransaction}`,
    `Creator address: ${manifest.creator}`,
    `Archive hashes.txt SHA-256: ${p.archiveManifestSha256}`,
    `Declared signing time (not independently timestamped): ${p.declaredSigningTime}`,
    `Nonce: ${p.nonce}`,
    'I attest that I currently control the creator address identified above.',
    'I associate this attestation with the named repository and publisher account.',
    'This is a public provenance statement only, not a login, transaction, permit, approval, delegation, or transfer authorization.',
    'This signature alone does not establish my legal identity, historical control, or original source-code authorship.'
  ].join('\n');
}

function prepare() {
  const p = {
    schema: 'mp-creator-control-v1',
    archiveManifestSha256: digest(),
    declaredSigningTime: new Date().toISOString(),
    nonce: crypto.randomBytes(32).toString('hex'),
    signature: null
  };
  p.message = messageFor(p);
  return p;
}

function validatePayload(p) {
  assert.equal(p.schema, 'mp-creator-control-v1', 'wrong proof schema');
  assert.equal(p.archiveManifestSha256, digest(), 'archive manifest differs');
  assert.match(p.nonce, /^[0-9a-f]{64}$/, 'invalid nonce');
  assert.match(p.declaredSigningTime, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.equal(new Date(p.declaredSigningTime).toISOString(), p.declaredSigningTime);
  assert.equal(p.message, messageFor(p), 'message text differs from scoped attestation');
}

function recoverSigner(p) {
  validatePayload(p);
  assert.equal(typeof p.signature, 'string', 'signature is still pending');
  assert.match(p.signature, /^0x[0-9a-fA-F]{130}$/, 'expected 65-byte EIP-191 signature');
  return getAddress(verifyMessage(p.message, p.signature));
}

function verify(p) {
  const recovered = recoverSigner(p);
  assert.equal(recovered, getAddress(manifest.creator), 'signature is NOT from MP creator address');
  return recovered;
}

if (require.main === module) {
  try {
    const [command, file] = process.argv.slice(2);
    if (command === 'prepare' && file) {
      const p = prepare();
      fs.writeFileSync(file, JSON.stringify(p, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
      console.log('UNSIGNED draft saved. Sign ONLY the decoded message value with your own wallet.');
      console.log(p.message);
    } else if (command === 'verify' && file) {
      const recovered = verify(JSON.parse(fs.readFileSync(file, 'utf8')));
      console.log('PASS: recovered MP creator address: ' + recovered);
      console.log('This is address-control evidence, NOT legal identity or historical authorship certification.');
      console.log('The declared signing time is self-reported, not an independent timestamp.');
    } else {
      throw new Error('Usage: node scripts/creator-proof.js prepare|verify <proof.json>');
    }
  } catch (e) {
    console.error('FAIL: ' + e.message);
    process.exitCode = 1;
  }
}
module.exports = { prepare, messageFor, validatePayload, recoverSigner, verify };
