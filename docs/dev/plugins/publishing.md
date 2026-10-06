---
title: 发布插件
createTime: 2026/08/14
---

# ::lucide:rocket:: 发布插件

您可以将插件打包，通过插件市场或私下分享等方式分发。

## ::lucide:package:: 打包插件

在项目文件中设置 `<CreateSrpx>true</CreateSrpx>`，每次构建会在 `srpx/<ProjectName>.srpx` 生成插件包：

```bash
dotnet build -c Release
```

- 包是 ZIP，根目录包含 `manifest.yml`、入口程序集以及所有外部包依赖；宿主提供程序集会被打包目标自动排除。
- 手动安装：将 `.srpx` 放入 `data/cache/plugin-packages` 并重启桌面应用；同 id 包会整目录替换，用于更新。

## ::lucide:store:: 上架插件市场

应用内置的插件市场从 [SECTL/SecRandom-PluginIndex](https://github.com/SECTL/SecRandom-PluginIndex) 加载。索引由该仓库的 workflow 在每次 push 与 nightly 自动重建：扫描 `plugins/<id>.yaml`，通过 GitHub API 取各插件作者最新 release 的唯一 `.srpx` 资产，从 release note 解析 SHA-256 块，聚合 `index.json` 后用 Ed25519 私钥签名，上传到固定 release tag `generated`。

**插件作者投稿流程：**

1. 打包插件，再用**客户端源码仓库** [SECTL/SecRandom](https://github.com/SECTL/SecRandom) 里的 `scripts/publish-plugin.ps1` 生成投稿元数据：

   ```powershell
   dotnet build -c Release     # 生成 srpx\My.Plugin.srpx
   .\scripts\publish-plugin.ps1 -SrpxPath .\srpx\My.Plugin.srpx -RepoOwner MyGitHub -RepoName my-plugin-repo
   ```

   脚本读取包内 `manifest.yml`，在 `.srpx` 同目录写出 `plugins/<id>.yaml`（另可加 `-ProjectUrl` / `-ReadmeUrl` / `-IconUrl`），并打印 SHA-256 块。

2. 在您的 GitHub 仓库发布 `.srpx` release：tag 用 `v<manifest 中的 version>`，**恰好包含一个** `.srpx` 资产，release note 中内嵌 SHA-256 块：

   ```
   <!-- SECRANDOM_SHA256: <hex> -->
   ```

   release 需恰好包含一个 `.srpx` 资产，索引生成器才会匹配到它。

3. Fork [SECTL/SecRandom-PluginIndex](https://github.com/SECTL/SecRandom-PluginIndex)，把 `plugins/<id>.yaml` 放进该仓库的 `plugins/` 目录并打开 PR；合并后 workflow 会重建并签名 `index.json`，之后版本更新由 nightly 自动收录，无需再次 PR。

生成的 `plugins/<id>.yaml` 大致如下：

```yaml
id: com.example.plugin
name: SecRandom 示例插件
description: 演示 SecRandom 插件 API 的最小示例插件
author: SECTL
version: 1.0.0
apiVersion: "3.1.0"
repoOwner: SECTL
repoName: SecRandom-ExamplePlugins
projectUrl: https://github.com/SECTL/SecRandom-ExamplePlugins
dependencies:
  - id: some.other.plugin
    required: true
```

**市场客户端行为：**

- 客户端镜像优先（`ghproxy.sectl.cn`）→ GitHub 直连兜底下载 `index.json` + `index.json.sig`，用内嵌 Ed25519 公钥验证整个索引签名；每个包安装前校验 SHA-256。
- 依赖按 `dependencies` 拓扑排序安装（含环检测），依赖缺失或循环时报错。
- 兼容性由 `apiVersion` 主版本与 `minimumHostVersion` 判断，不兼容的插件会标记并禁用安装。

## ::lucide:shield-alert:: 安全提示

市场校验保证发布物完整性，但插件在宿主进程内运行、与宿主同等权限（见[插件基础知识](/dev/plugins/basics)）。只安装您信任来源的插件。
