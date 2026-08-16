---
title: 插件依赖
createTime: 2026/08/14
---

# ::lucide:link:: 插件依赖

本页介绍插件与宿主、插件与插件之间的依赖关系，以及外部包版本冲突的处理方式。

## ::lucide:server:: 宿主提供的依赖

以下程序集由宿主在进程内提供，插件**不需要**打包，也不应期望自己控制它们的版本：

- `SecRandom.Shared`、`SecRandom.Core`、`SecRandom.PluginSdk`
- Avalonia、FluentAvalonia 及其依赖
- `Microsoft.Extensions.*`（Host、DependencyInjection、Logging 等）
- 宿主已引用的其它运行时程序集

SRPX 打包目标会自动排除这些宿主提供程序集，因此插件包始终保持宿主无关。插件 SDK 通过 `PackageReference` + `ExcludeAssets="runtime;native"` 引用，只带来编译期 API。

## ::lucide:package-open:: 外部包依赖

插件自己的外部 NuGet 依赖默认 copy-local，会随 `.srpx` 包一起分发：

- 插件包根目录除 `manifest.yml`、入口程序集外，还包含所有外部程序集依赖。
- 打包目标会排除宿主提供的程序集、`runtimes/**` 与本地区域资源，其余文件都会进入包内。

## ::lucide:git-fork:: 插件间依赖

插件可以在 `manifest.yml` 中声明对其它插件的依赖，宿主会按依赖拓扑排序加载：

```yaml
dependencies:
  - id: some.other.plugin
    required: true
```

- 必需依赖缺失或加载失败时，当前插件标记为加载失败；可选依赖（`required: false`）缺失不影响加载。
- 依赖循环会被检测并拒绝加载。

## ::lucide:alert-triangle:: 外部依赖版本冲突

每个插件在**独立的加载上下文**（`PluginLoadContext`）中加载，插件之间不会因为同名程序集而互相覆盖。但插件之间要协作时，请注意以下规则：

- **宿主依赖**的版本由宿主决定，插件应针对宿主提供的 Core 契约版本开发，不要试图在包内携带不同版本的宿主程序集。
- **多个插件共享同一外部库**时，各自上下文里同名程序集的版本应保持一致；若共享代码（如通过插件间依赖协作）期望同一个静态状态或类型，版本不一致会导致各加载到不同副本，出现"类型不相等""事件收不到"等难以排查的问题。
- 如果需要与其它插件协作，优先使用插件间依赖（`dependencies`）与宿主 DI，而不是共享某个第三方库的静态状态。

::: tip 保持简单
插件尽量使用宿主提供的依赖（Core / Avalonia / Microsoft.Extensions），把对外部第三方库的依赖控制在必要范围内，能显著降低与其它插件冲突的概率。
:::
