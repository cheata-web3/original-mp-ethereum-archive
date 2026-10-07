# Original MP — Ethereum Mainnet Archive

> This repository documents the historical MP contract on Ethereum Mainnet. It is an evidence archive, not a new token deployment.

## Quick facts

| Item | Value |
|---|---|
| Network | Ethereum Mainnet |
| Chain ID | `1` |
| Contract | [`0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74`](https://etherscan.io/address/0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74) |
| Creation transaction | [`0x6ffb1d00e827ae77b1e1940ac52d0abb3acbc6445ae19c6e981ac1a4aebedfeb`](https://etherscan.io/tx/0x6ffb1d00e827ae77b1e1940ac52d0abb3acbc6445ae19c6e981ac1a4aebedfeb) |
| Creation block | `5,727,601` |
| Creation timestamp | `2018-06-03 22:59:16 UTC` |
| Name | `MP` |
| Symbol | `MP` |
| Decimals | `8` |
| Total supply | `10,000,000,000 MP` |
| Creator address | `0x102eEe422113140FBDc2544F495a947399AB100B` |

## Purpose

This repository preserves publicly observable facts about the original MP contract, including RPC responses, transaction data, runtime bytecode, and integrity hashes.

The original contract remains on Ethereum Mainnet. This repository does not modify it and does not deploy a replacement contract.

## Evidence

- [Provenance record](PROVENANCE.md)
- [RPC and archive manifest](archive/ethereum-mainnet.json)
- [Creation transaction](archive/creation-transaction.json)
- [Creation receipt](archive/creation-receipt.json)
- [Creation block](archive/block.json)
- [Creation input](archive/creation-input.hex)
- [Runtime bytecode](archive/runtime-bytecode.hex)
- [RPC reads](archive/rpc-reads.json)
- [Observed ABI snapshot](archive/abi.json) (not proof of original source)
- [SHA-256 manifest](archive/hashes.txt)
- [Reconstruction status](docs/reconstruction-status.md)
- [License status](LICENSE-STATUS.md)
- [History](docs/history.md)
- [Publication checklist](docs/publication-checklist.md)

## Independent verification

```bash
python3 - <<'PY'
import json
from pathlib import Path
x = json.loads(Path('archive/rpc-reads.json').read_text())
assert x['name'] == 'MP'
assert x['symbol'] == 'MP'
assert x['decimals'] == 8
print('RPC facts: PASS')
PY

cd archive
sha256sum -c hashes.txt
```

## Repository contents

`Cheata-Web3-Browser-fixed.zip` is a CheatA application source bundle and is not part of the on-chain evidence archive.

## Relation to CheatA

CheatA may directly read and interact with this original contract on Ethereum Mainnet. A Polygon deployment, if any, is a separate contract and is not the original MP contract.

## Disclaimer

This repository is technical and historical documentation. It is not investment advice, a price prediction, an offer, or a guarantee of value.

## License and source status

The original source-code authorship and license status have not been established by this archive. Do not treat `abi.json`, reconstructed Solidity-like code, or bytecode analysis as proof of the original source text.
