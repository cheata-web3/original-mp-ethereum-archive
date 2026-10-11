# Etherscan Source Verification Evidence / Etherscan ソースコード認証の証拠

## 結論（日本語）

Ethereum メインネットの MP コントラクト `0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74` は、Etherscan で **「Source Code Verified（Similar Match）」** と表示されています。

このリポジトリでは、Etherscan の表示だけに頼らず、次の3点を誰でも再現できる形で確認しました。

1. **コンパイル結果が一致する:** Etherscan に公開されているソース `HumanStandardToken.sol` を、公式の solc `v0.3.5+commit.5f97274a`（最適化オン・200 runs）でコンパイルすると、オンチェーンの runtime bytecode（1,754 バイト）と **1バイトも違わず一致** します。
2. **デプロイ時のデータも一致する:** 作成トランザクションの input は「コンパイルした creation bytecode ＋ コンストラクタ引数」と完全に一致します。引数を復元すると `MP` / `MP` / `8` decimals / `1000000000000000000`（= 10,000,000,000 MP）です。
3. **複数のノードで同じ結果になる:** 4つの独立した公開 RPC で `eth_getCode` を取得し、すべて同じ bytecode でした。

### 「Similar Match」の意味

Similar Match は、Etherscan が「このコントラクトの bytecode は、すでに認証済みの別のコントラクト `0xf77089f2F00fca83501705b711Cbb10a0De77628` と同じ」と判定して、そのソースを表示している状態です。MP コントラクトのために個別に認証手続き（Exact Match）をしたものではありません。

ただし、上の 1〜3 のとおり、このソースと設定から MP の bytecode とデプロイデータがそのまま再現できることを独自に確認しています。Etherscan で Exact Match にしたい場合は、[`compiler-settings.json`](../verification/etherscan-source-match/compiler-settings.json) と [`constructor-args.hex`](../verification/etherscan-source-match/constructor-args.hex) を使って Etherscan の「Verify and Publish」から申請できます。

### Holders が 0 と表示される理由

`HumanStandardToken` のコンストラクタは、作成者に全量を割り当てるときに `Transfer` イベントを出しません。Etherscan はイベントから保有者を数えるため、Holders は 0 と表示されます。RPC で読み取った作成者アドレス `0x102eEe422113140FBDc2544F495a947399AB100B` の残高は `1000000000000000000`（全量）です（[`archive/rpc-reads.json`](../archive/rpc-reads.json)）。

### この証拠で言えること・言えないこと

| 言えること | 言えないこと |
|---|---|
| 公開ソースと設定から、オンチェーンの MP bytecode とデプロイデータが完全に再現できる | このソースを書いたのが公開者本人であること（`HumanStandardToken` は 2016 年頃から広く使われている公開テンプレートです） |
| コントラクトの動作は公開ソースのとおりである | 作成者アドレスを今誰が管理しているか（ウォレット署名で別途証明が必要） |
| 名前・シンボル・桁数・総供給量 | トークンの価値、上場、安全性。Etherscan も「認証は安全性を意味しない」と明記しています。セキュリティ監査も未提出です |

## Summary (English)

Etherscan shows the MP contract as **Source Code Verified (Similar Match)** against `0xf77089f2F00fca83501705b711Cbb10a0De77628`. We independently confirmed that compiling the published `HumanStandardToken.sol` with official solc `v0.3.5+commit.5f97274a` (optimizer on, 200 runs) reproduces the on-chain runtime bytecode byte-for-byte, and that the creation input equals the compiled creation bytecode plus ABI-encoded constructor arguments (`MP`, `MP`, `8`, `1000000000000000000`). Runtime code was identical across four independent public RPC endpoints.

A Similar Match is not a contract-specific (Exact Match) submission, and source verification does not establish authorship, current control of the creator address, safety, or value.

## Reproduce / 再現方法

```bash
curl -sSLo soljson-v0.3.5.js https://binaries.soliditylang.org/bin/soljson-v0.3.5+commit.5f97274a.js
node scripts/verify-source-match.js soljson-v0.3.5.js
```

Expected output:

```text
Compiler sha256: PASS
Runtime bytecode == on-chain runtime: PASS (1754 bytes)
Creation input == compiled creation bytecode + constructor args: PASS
Constructor args (MP, MP, 8 decimals, 1000000000000000000 raw): PASS
ALL CHECKS PASSED
```

The same check runs in GitHub Actions on every push.

## Files

| File | Content |
|---|---|
| [`HumanStandardToken.sol`](../verification/etherscan-source-match/HumanStandardToken.sol) | Source as published on Etherscan (retrieved 2026-10-11) |
| [`compiler-settings.json`](../verification/etherscan-source-match/compiler-settings.json) | Compiler build, checksum and optimizer settings |
| [`compiled-runtime.hex`](../verification/etherscan-source-match/compiled-runtime.hex) | Runtime bytecode produced by the compiler |
| [`compiled-creation.hex`](../verification/etherscan-source-match/compiled-creation.hex) | Creation bytecode produced by the compiler |
| [`constructor-args.hex`](../verification/etherscan-source-match/constructor-args.hex) | ABI-encoded constructor arguments taken from the creation input |
| [`decoded-constructor-args.json`](../verification/etherscan-source-match/decoded-constructor-args.json) | Decoded constructor arguments |
| [`etherscan-snapshot.json`](../verification/etherscan-source-match/etherscan-snapshot.json) | What the Etherscan page showed at retrieval time |
| [`independent-rpc-checks.json`](../verification/etherscan-source-match/independent-rpc-checks.json) | `eth_getCode` results from independent RPC endpoints |
| [`hashes.txt`](../verification/etherscan-source-match/hashes.txt) | SHA-256 manifest for this folder |

## Links

- [Etherscan: MP contract code](https://etherscan.io/address/0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74#code)
- [Etherscan: similar-match contract](https://etherscan.io/address/0xf77089f2F00fca83501705b711Cbb10a0De77628#code)
- [Solidity compiler build list](https://binaries.soliditylang.org/bin/list.json)
