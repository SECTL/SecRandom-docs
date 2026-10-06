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
<PackageReference Include="SecRandom.PluginSdk" Version="3.1.0">
  <ExcludeAssets>runtime;native</ExcludeAssets>
</PackageReference>
```

- `ExcludeAssets="runtime;native"` 让 SDK 包只提供编译期 API；插件运行时所需的 `SecRandom.Core` 等程序集由宿主在进程内提供。
- 包版本跟随主程序版本发布，请使用与应用一致的版本（当前为 `3.1.0`）。`apiVersion` 只比较主版本，插件 API 主版本当前为 `3`。
- 插件通过 SDK 使用宿主暴露的[能力面](/dev/plugins/capabilities)，即 SDK 所引用到的 Core 契约。

::: note 随主程序一起构建的模板
主程序仓库里的 `SecRandom.ExamplePlugin` 会随解决方案一起构建，方便在没有发布版本时验证 SDK；对外分发的插件请按上面的 `PackageReference` 引用 NuGet 包。
:::

## ::lucide:folder-tree:: 获取最小模板

[SECTL/SecRandom-ExamplePlugins](https://github.com/SECTL/SecRandom-ExamplePlugins) 是独立的示例插件仓库：只注册一个设置页，用来展示插件自身的信息。可以直接以它为起点：

```bash
git clone https://github.com/SECTL/SecRandom-ExamplePlugins.git
cd SecRandom-ExamplePlugins
powershell -ExecutionPolicy Bypass -File scripts\build.ps1
```

构建完成后会在 `ExamplePlugin\srpx\SecRandom.ExamplePlugin.srpx` 生成插件包。主程序仓库里的 `SecRandom.ExamplePlugin` 是同一模板的随仓版本，可对照阅读。

## ::lucide:bug:: 本地调试

开发插件时不需要反复打包安装：

- 使用启动参数 `--epp <目录>`（或 `--externalPluginPath <目录>`，可重复）追加开发插件目录：目录应指向**包含插件目录的父目录**，宿主只枚举它的子目录；其中的插件原位加载，宿主不会移动或删除，修改后重启应用即可生效。
- 也可以将打包好的 `.srpx` 放入 `data/cache/plugin-packages` 并重启桌面应用完成安装。

## ::lucide:arrow-right:: 下一步

阅读[开始编写插件](/dev/plugins/create-project)了解插件项目结构，或直接查看[插件入口类](/dev/plugins/plugin-base)与[能力面](/dev/plugins/capabilities)。
