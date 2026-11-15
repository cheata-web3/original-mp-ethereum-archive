# MP Provenance Record

## Contract identity

```text
Network: Ethereum Mainnet
Chain ID: 1
Contract: 0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74
Creator / deployer address: 0x102eEe422113140FBDc2544F495a947399AB100B
Creation transaction: 0x6ffb1d00e827ae77b1e1940ac52d0abb3acbc6445ae19c6e981ac1a4aebedfeb
Creation block: 5727601
Creation timestamp: 2018-06-03 22:59:16 UTC
```

## Observable contract values

These values were read from Ethereum Mainnet through JSON-RPC and saved in `archive/rpc-reads.json`.

```text
name: MP
symbol: MP
decimals: 8
totalSupply raw: 1000000000000000000
creator balance raw: 1000000000000000000
```

The raw total supply corresponds to `10,000,000,000 MP` when displayed with 8 decimals.

## Evidence files

| File | Meaning |
|---|---|
| `archive/creation-transaction.json` | Transaction data for the creation transaction |
| `archive/creation-receipt.json` | Receipt and created contract address |
| `archive/block.json` | Creation block data |
| `archive/creation-input.hex` | Creation transaction input, including deployment input |
| `archive/runtime-bytecode.hex` | Runtime bytecode returned by `eth_getCode` |
| `archive/rpc-reads.json` | Selected read-only contract calls |
| `archive/hashes.txt` | SHA-256 integrity manifest |
| `archive/abi.json` | Observed interface snapshot for reading and interaction |

## What this proves

The archive supports independent verification of:

- the contract address;
- the creation transaction and block;
- the creator address recorded by the creation transaction;
- the runtime bytecode captured from Ethereum Mainnet;
- the selected read-only values at the time of capture.

## What this does not prove

The archive alone does not prove:

- the legal identity of the person controlling the creator address;
- that the current publisher wrote the original Solidity source;
- that a reconstructed source file is the unique original source;
- any market value, exchange listing, investment return, or future behavior outside the observed contract behavior.

## Ownership statement

**Status: verified.** A creator-wallet EIP-191 signature over a narrowly scoped
public attestation is published in [provenance/creator-proof.json](provenance/creator-proof.json).
Verification recovers the creator address `0x102eEe422113140FBDc2544F495a947399AB100B`
(`node scripts/creator-proof.js verify provenance/creator-proof.json`, also enforced by CI).

Scope of this evidence: the signer controlled the creator address at signing time.
It does not establish legal identity, continuous historical control, or original
source-code authorship. The declared signing time inside the message is self-reported.

## Capture metadata

- Captured at: `2026-10-01T04:36:47Z` (see `archive/retrieved-at.txt`)
- RPC provider hostname: `ethereum.publicnode.com`
- Capture script version or commit: not recorded in the original capture metadata.
- Archive release: no release published as of the 2026-11-07 review.
