# Reconstruction Status

## Current status

`archive/` contains on-chain evidence and an observed interface snapshot.

**Update 2026-10-11:** A bytecode-matched source has been confirmed. The `HumanStandardToken.sol` source published on Etherscan (Similar Match), compiled with solc `v0.3.5+commit.5f97274a` and optimizer 200 runs, reproduces the runtime bytecode and creation input exactly. See [etherscan-verification.md](etherscan-verification.md). Steps 1–5 of "Future verification work" are complete for this source.

## Terminology

Use the following terms accurately:

- **On-chain evidence**: data directly captured from Ethereum or a reproducible RPC call.
- **Observed ABI**: an interface representation used to call known functions.
- **Behavioral reconstruction**: code written to reproduce observed behavior.
- **Bytecode-matched reconstruction**: candidate source and compiler settings that produce matching bytecode.
- **Original source**: the actual source files used by the original deployer; this requires provenance beyond a similar behavior or partial bytecode match.

## Current evidence

- Runtime bytecode: captured in `archive/runtime-bytecode.hex`.
- Creation input: captured in `archive/creation-input.hex`.
- Read values: captured in `archive/rpc-reads.json`.
- Interface: stored as an observed ABI snapshot in `archive/abi.json`.

## Do not claim yet

```text
The publisher is definitively the historical author.
The token has guaranteed value.
A Polygon contract is the same contract as the Ethereum contract.
```

## Future verification work

1. Obtain the exact creation input and runtime bytecode from independent RPC endpoints.
2. Compare bytecode byte-for-byte.
3. Investigate compiler version, optimizer settings, metadata hash, and constructor arguments.
4. Reproduce runtime bytecode from a candidate source.
5. Record every compiler setting and comparison result.
6. Label any result as a reconstruction unless original provenance is independently established.
