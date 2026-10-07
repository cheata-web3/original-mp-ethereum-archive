# Provenance record — Original MP (Ethereum Mainnet)

All values below were retrieved via public Ethereum JSON-RPC (`https://eth.drpc.org`) and can be re-checked on any Ethereum Mainnet node or on Etherscan.

| Item | Value | Source file |
|---|---|---|
| Chain ID | `1` | `archive/rpc-reads.json` |
| Contract | `0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74` | `archive/creation-receipt.json` (`contractAddress`) |
| Creation transaction | `0x6ffb1d00e827ae77b1e1940ac52d0abb3acbc6445ae19c6e981ac1a4aebedfeb` | `archive/creation-transaction.json` |
| Creation block | `5,727,601` (`0x576571`) | `archive/creation-transaction.json` |
| Block hash | `0xd60d72a58067d1b4a5761987a6a3761edb9dcf9ea4dbbbfdb736bc96cace8c9b` | `archive/creation-transaction.json` |
| Block timestamp | `1528066756` = `2018-06-03 22:59:16 UTC` | `archive/ethereum-mainnet.json` |
| Creator (tx `from`) | `0x102eEe422113140FBDc2544F495a947399AB100B` | `archive/creation-transaction.json` |
| Receipt status | `0x1` (success) | `archive/creation-receipt.json` |
| `name()` / `symbol()` | `MP` / `MP` | `archive/rpc-reads.json` |
| `decimals()` | `8` | `archive/rpc-reads.json` |
| `totalSupply()` | `1000000000000000000` raw = `10,000,000,000 MP` | `archive/rpc-reads.json` |
| `version()` | `H0.1` | `archive/rpc-reads.json` |

`version() = "H0.1"` and the function selectors in the runtime bytecode (including `approveAndCall`, `0xcae9ca51`) are consistent with the widely used ConsenSys "HumanStandardToken" template. This is an observation, not proof of the original source text.

## How the archive was produced

1. `eth_getTransactionByHash` and `eth_getTransactionReceipt` for the creation tx.
2. `eth_getBlockByNumber` for the creation block timestamp.
3. `eth_getCode` at `latest` for runtime bytecode.
4. `eth_call` of `name()`, `symbol()`, `decimals()`, `totalSupply()`, `version()` at the block recorded in `rpc-reads.json` (`blockTag`).
5. `sha256sum` of each file → `archive/hashes.txt`.

Re-run with `python3 scripts/collect.py` (optionally `RPC_URL=...`). Note that re-running at a newer block changes `blockTag` in `rpc-reads.json`, so the hash of that file will change; all other files are immutable on-chain data.
