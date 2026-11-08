const test = require('node:test');
const assert = require('node:assert/strict');
const { Wallet } = require('ethers');
const { prepare, validatePayload, recoverSigner, verify } = require('./creator-proof');

test('draft is well scoped, unsigned, and has a fresh nonce', () => {
  const a = prepare();
  validatePayload(a);
  assert.notEqual(a.nonce, prepare().nonce);
  assert.equal(a.signature, null);
  assert.throws(() => verify(a), /pending/);
});
test('EIP-191 recovers a throwaway test signer but rejects it as MP creator', async () => {
  const wallet = Wallet.createRandom();
  const p = prepare();
  p.signature = await wallet.signMessage(p.message);
  assert.equal(recoverSigner(p), wallet.address);
  assert.throws(() => verify(p), /NOT from MP creator/);
});
test('rejects edited message, archive digest, and malformed signature', async () => {
  const wallet = Wallet.createRandom();
  const p = prepare();
  p.signature = await wallet.signMessage(p.message);
  assert.throws(() => verify({ ...p, message: p.message + '\n' }), /message text/);
  assert.throws(() => verify({ ...p, archiveManifestSha256: '0'.repeat(64) }), /manifest differs/);
  assert.throws(() => verify({ ...p, signature: '0x1234' }), /65-byte/);
});
test('rejects invalid nonce, schema, and date', () => {
  const p = prepare();
  assert.throws(() => validatePayload({ ...p, nonce: 'placeholder' }));
  assert.throws(() => validatePayload({ ...p, schema: 'another-schema' }));
  assert.throws(() => validatePayload({ ...p, declaredSigningTime: 'tomorrow' }));
});
