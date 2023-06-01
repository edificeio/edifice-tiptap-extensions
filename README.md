# Rich Text Editor Content Converter

![npm](https://img.shields.io/npm/v/rte-content-converter?style=flat-square)

## Prerequisites

- `pnpm: >= 7 | 8`
- `node: >= 16 | 18`

## Getting Started

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Prettier

```bash
pnpm format
```

## Semantic Release

### Node 16 | 18

The package is released to the npm registry via `semantic-release`. When installing or building locally, you will receive a warning message if you are using node 16:

```js
Unsupported engine: wanted: {"node":">=18"} (current: {"node":"v16.20.0","pnpm":"8.5.0"})
```

Node 18 is required by `semantic-release` and the Github Action workflow, so that's fine. You can ignore the warning. 👌🏻

### Push Force

`git push --force` is not recommended!

```
After a git history rewrite due to a git push --force, the git tags and notes referencing the commits that were rewritten are lost.
```

If it happens, read this troubleshooting section: [Troubleshooting](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting#release-not-found-release-branch-after-git-push-force)
