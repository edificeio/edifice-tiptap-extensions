# Rich Text Editor Content Converter

![npm](https://img.shields.io/npm/v/edifice-tiptap-extensions?style=flat-square)

## Prerequisites

- `pnpm: >= 7 | 8`
- `node: >= 16 | 18`

## Getting Started

```bash
pnpm install
```

### Build

```bash
turbo build
```

### Lint

```bash
turbo lint
```

### Prettier

```bash
turbo format
```

## Create a new extension

You can create a new extension by copying an existing one.

```bash
turbo gen workspace --copy --name @edifice-tiptap-extensions/extension-[name]
```

Follow the prompts:

- What type of workspace should be added? > Choose `package`
- Which workspace should "@edifice-tiptap-extensions/xxx" start from? > `Select` one extension
- Where should "@edifice-tiptap-extensions/extension-[name]" be added? > `Enter`
- Add workspace dependencies to "@edifice-tiptap-extensions/extension-abbr"? Choose `no`

It will copy the template from an existing extension to a new folder. You can now modify everything according to your needs.

### Push Force

`git push --force` is not recommended!

```
After a git history rewrite due to a git push --force, the git tags and notes referencing the commits that were rewritten are lost.
```

If it happens, read this troubleshooting section: [Troubleshooting](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting#release-not-found-release-branch-after-git-push-force)
