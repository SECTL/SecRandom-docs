---
title: 配置插件开发环境
createTime: 2026/08/14
---

# ::lucide:terminal-square:: 配置插件开发环境

本页介绍如何准备 SecRandom 插件开发环境并创建一个最小插件项目。

## ::lucide:hammer:: 前置要求

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本。
- 推荐使用 JetBrains Rider、Visual Studio 或其它支持 .NET 的 IDE。
- 熟悉 C# 与 Avalonia 基础（插件页面基于 Avalonia 控件）。

## ::lucide:package:: 引用 SDK

SecRandom 插件通过 NuGet 包 `SecRandom.PluginSdk` 引用宿主提供的 API。在插件项目文件中添加：

```xml
<PackageReference Include="SecRandom.PluginSdk" Version="3.0.0">
  <ExcludeAssets>runtime;native</ExcludeAssets>
</PackageReference>
```

- `ExcludeAssets="runtime;native"` 让 SDK 包只提供编译期 API；插件运行时所需的 `SecRandom.Core` 等程序集由宿主在进程内提供。
- 包版本跟随主程序版本发布，请使用与应用主版本一致的版本（如 `3.0.0`）。当前宿主 API 主版本为 `3`。
- 插件通过 SDK 使用宿主暴露的[能力面](/dev/plugins/capabilities)，即 SDK 所引用到的 Core 契约。

::: note 使用本地 SDK 进行开发
仓库模板 `SecRandom.ExamplePlugin` 默认使用本地项目引用（`UseLocalPluginSdk=true`），以便在没有发布版本时也能随解决方案构建。发布版插件则使用上面的 NuGet `PackageReference`。
:::

## ::lucide:folder-tree:: 获取最小模板

`SecRandom.ExamplePlugin` 是仓库内维护的最小插件模板，包含入口类、清单文件、示例设置页与打包配置。您可以将其作为起点：

```bash
git clone https://github.com/SECTL/SecRandom.git
cd SecRandom/SecRandom.ExamplePlugin
dotnet build
```

构建完成后会在 `srpx/SecRandom.ExamplePlugin.srpx` 生成插件包。

::: note
更便捷的 `dotnet new` 插件模板包（`SecRandom.PluginTemplate`）计划中，待发布后会替代手动克隆。
:::

## ::lucide:bug:: 本地调试

开发插件时不需要反复打包安装：

- 使用启动参数 `--epp <目录>`（或 `--externalPluginPath <目录>`，可重复）追加开发插件目录。目录内的插件原位加载，宿主不会移动或删除，修改后重启应用即可生效。
- 也可以将打包好的 `.srpx` 放入 `data/cache/plugin-packages` 并重启桌面应用完成安装。

## ::lucide:arrow-right:: 下一步

阅读[开始编写插件](/dev/plugins/create-project)了解插件项目结构，或直接查看[插件入口类](/dev/plugins/plugin-base)与[能力面](/dev/plugins/capabilities)。
