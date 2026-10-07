# GitHub Publish Commands

## 1. Review locally

```bash
cd original-mp-ethereum-archive
find . -maxdepth 3 -type f | sort
grep -RInE 'private key|seed phrase|mnemonic|api[_-]?key|password' . --exclude-dir=.git || true
```

## 2. Verify evidence

```bash
cd archive
sha256sum -c hashes.txt
cd ..
```

## 3. Create the repository

Create a private repository named `original-mp-ethereum-archive` first. Review the files on GitHub, then change visibility to public only after the secret scan and hash check pass.

## 4. Commit and push

```bash
git init
git add README.md PROVENANCE.md LICENSE-STATUS.md .gitattributes .gitignore archive docs provenance
git status --short
git commit -m "docs: archive original MP Ethereum contract evidence"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
git tag -a v1.0.0 -m "Initial historical evidence archive"
git push origin v1.0.0
```

Replace `<YOUR_REPOSITORY_URL>` with the repository URL. Do not put a token or password in the URL.

## 5. Add the public URL

After publishing, add the GitHub URL to the CheatA `/history` page and to the Etherscan Token Update request. If a correction is needed, create a new commit and explain the correction; do not silently rewrite the historical archive.
