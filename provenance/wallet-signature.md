# Wallet signature (creator address)

Signing address: `0x102eEe422113140FBDc2544F495a947399AB100B` (creator of the MP contract `0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74`)

Signed on: 2026-11-08 (EIP-191 `personal_sign`)

Etherscan reference: https://etherscan.io/verifySig/341534 (not independently fetched; the signature was recovered locally, see below)

Files:
- `signed-message.txt` — exact message (UTF-8, no trailing newline)
- `signature.txt` — signature

## Recover the signer

```bash
pip install eth-account
python3 - <<'PY'
from eth_account import Account
from eth_account.messages import encode_defunct
msg = open("signed-message.txt", encoding="utf-8").read()
sig = open("signature.txt").read().strip()
print(Account.recover_message(encode_defunct(text=msg), signature=sig))
PY
```

Expected: `0x102eEe422113140FBDc2544F495a947399AB100B`

## What this shows

Whoever held the key for the creator address on 2026-11-08 signed this message. It does not establish legal identity, authorship of the original source, or token value.
