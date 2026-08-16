---
title: Publishing
createTime: 2026/08/14
---

# ::lucide:rocket:: Publishing

You can package your plugin and distribute it through the plugin market or by private sharing.

## ::lucide:package:: Package the Plugin

Set `<CreateSrpx>true</CreateSrpx>` in your project file; every build produces `srpx/<ProjectName>.srpx`:

```bash
dotnet build -c Release
```

- The package is a ZIP whose root contains `manifest.yml`, the entrance assembly, and all external package dependencies; host-provided assemblies are excluded automatically by the packaging target.
- Manual install: place the `.srpx` in `data/cache/plugin-packages` and restart the desktop application. A package with the same id replaces the whole directory, which is how updates work.

## ::lucide:store:: List Your Plugin on the Market

The built-in market loads its index from [SECTL/SecRandom-PluginIndex](https://github.com/SECTL/SecRandom-PluginIndex). The index is rebuilt automatically by that repository's workflow on every push and nightly: it scans `plugins/<id>.yaml`, fetches the latest release's unique `.srpx` asset via the GitHub API, parses the SHA-256 block from the release note, aggregates `index.json`, signs it with an Ed25519 private key, and uploads it to the fixed release tag `generated`.

**Author submission flow:**

1. Package the plugin and compute the package checksum:

   ```bash
   dotnet build -c Release
   ./scripts/publish-plugin.ps1 -SrpxPath .\srpx\My.Plugin.srpx -RepoOwner MyGitHub -RepoName my-plugin-repo
   ```

2. Publish a `.srpx` release in your GitHub repository with a tag like `vX.Y.Z`, and embed the SHA-256 block in the release note:

   ```
   <!-- SECRANDOM_SHA256: <hex> -->
   ```

   The release must contain exactly one `.srpx` asset for the index generator to match.

3. Commit the generated `plugins/<id>.yaml` to `SECTL/SecRandom-PluginIndex` and open a PR. Once reviewed, your plugin enters the market; later updates are picked up automatically by the nightly build, with no further PRs needed.

The generated `plugins/<id>.yaml` looks roughly like this:

```yaml
id: secrandom.example
name: SecRandom 示例插件
description: 一个最小 SecRandom 插件示例
author: SECTL
version: 1.0.0
apiVersion: "3.0.0"
repoOwner: SECTL
repoName: SecRandom
projectUrl: https://github.com/SECTL/SecRandom
dependencies:
  - id: some.other.plugin
    required: true
```

**Market client behavior:**

- The client downloads mirror-first (`ghproxy.sectl.cn`) with a GitHub fallback, verifies the whole `index.json` signature with the embedded Ed25519 public key, and verifies each package SHA-256 before staging.
- Dependencies are installed in topological order (with cycle detection); missing or circular dependencies report an error.
- Compatibility is gated by the `apiVersion` major and `minimumHostVersion`; incompatible plugins are marked and cannot be installed.

## ::lucide:shield-alert:: Security Note

Market verification guarantees package integrity, but plugins run in the host process with the same privileges (see [Plugin Basics](/en/dev/plugins/basics)). Only install plugins you trust.
