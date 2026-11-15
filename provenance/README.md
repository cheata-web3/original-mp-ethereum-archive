# provenance/

Place a wallet-signature verification here only after it has been completed: the signed message text, the signature, the signing address, and the recovery steps. See the "Ownership statement" section in [PROVENANCE.md](../PROVENANCE.md).

Never commit private keys, seed phrases, or wallet passwords.

Current status: **verified**. [creator-proof.json](creator-proof.json) holds a published EIP-191 signature over the scoped attestation; it recovers the MP creator address and is re-verified by CI on every push.
The [Japanese guide](../docs/creator-proof.ja.md) explains the proof boundaries
and the prepare/verify commands. Drafts named `draft-*.json` are ignored by Git.
Only publish a verified `creator-proof.json` after explicit approval.
