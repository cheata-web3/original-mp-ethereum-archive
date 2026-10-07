# Publication Checklist

## Evidence

- [ ] Contract address is exactly `0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74`.
- [ ] Chain ID is `1`.
- [ ] Creation transaction is exactly the recorded hash.
- [ ] Creation block and timestamp are independently checked.
- [ ] Runtime bytecode is not reformatted or edited.
- [ ] Creation input is not reformatted or edited.
- [ ] `sha256sum -c archive/hashes.txt` passes.

## Secrets and privacy

- [ ] No private key.
- [ ] No seed phrase or recovery phrase.
- [ ] No wallet password.
- [ ] No RPC API key in `rpc-url.txt` or committed files.
- [ ] No unnecessary personal address, email, or workplace information.
- [ ] Signed message is included only if intentionally public.

## Wording

- [ ] Use “historical Ethereum Mainnet MP contract”.
- [ ] Use “publicly observable on-chain facts”.
- [ ] Use “behavioral reconstruction” for reconstructed code.
- [ ] Do not say “original source” without independent proof.
- [ ] Do not say “Japan’s first” or “world’s first” without strong sources.
- [ ] Do not promise price, profit, listing, or investment value.
- [ ] Do not describe a separate Polygon contract as the same contract.

## Release

- [ ] README links work.
- [ ] Etherscan and Blockscout links work.
- [ ] Repository has a first release tag.
- [ ] Archive files are immutable after release; corrections use a new commit.
- [ ] Capture date and script commit are recorded.
