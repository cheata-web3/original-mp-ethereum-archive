# provenance/

The [wallet-signature record](wallet-signature.md) includes the signed message, signature, signing address, and recovery steps. See also the "Ownership statement" section in [PROVENANCE.md](../PROVENANCE.md).

Never commit private keys, seed phrases, or wallet passwords.

The separate `creator-proof.json` attestation is not published.
The [Japanese guide](../docs/creator-proof.ja.md) explains the proof boundaries
and the prepare/verify commands. Drafts named `draft-*.json` are ignored by Git.
Only publish a verified `creator-proof.json` after explicit approval.
