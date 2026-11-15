# provenance/

Place a wallet-signature verification here only after it has been completed: the signed message text, the signature, the signing address, and the recovery steps. See the "Ownership statement" section in [PROVENANCE.md](../PROVENANCE.md).

Never commit private keys, seed phrases, or wallet passwords.

Current status: **verified**. Two independent records are published:
- [creator-proof.json](creator-proof.json) — the scoped JSON attestation; it recovers the MP creator address and is re-verified by CI on every push.
- [wallet-signature.md](wallet-signature.md) — the short signed message from 2026-11-08 (`signed-message.txt`, `signature.txt`), which recovers the same address locally.

The [Japanese guide](../docs/creator-proof.ja.md) explains the proof boundaries
and the prepare/verify commands. Drafts named `draft-*.json` are ignored by Git.
Only publish a verified `creator-proof.json` after explicit approval.
