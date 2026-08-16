---
title: 开始编写插件
createTime: 2026/08/14
---

# ::lucide:hammer:: 开始编写插件

本页介绍如何创建、配置并打包一个 SecRandom 插件项目。开始之前，请先按[配置插件开发环境](/dev/get-started)设置好开发环境。

## ::lucide:folder-tree:: 认识插件结构

以仓库模板 `SecRandom.ExamplePlugin` 为例，一个插件项目通常包含以下文件：

```plaintext
SecRandom.ExamplePlugin
 ├─ SecRandom.ExamplePlugin.csproj   // 项目文件：引用 SDK、开启 CreateSrpx
 ├─ manifest.yml                     // 插件清单文件
 ├─ Plugin.cs                        // 插件入口类（继承 PluginBase）
 ├─ README.md                        // 插件自述文件（设置页中渲染）
 ├─ icon.png                         // 插件图标
 ├─ Views/
 │   └─ SettingsPages/
 │       └─ ExampleSettingsPage.axaml(.cs)  // 示例设置页
 └─ srpx/
     └─ SecRandom.ExamplePlugin.srpx // 构建产物（CreateSrpx=true 时生成）
```

插件项目需要：

- 以 `PackageReference` 引用 `SecRandom.PluginSdk`，并设置 `ExcludeAssets="runtime;native"`（见[配置插件开发环境](/dev/get-started)）。
- 设置 `<CreateSrpx>true</CreateSrpx>`，构建时自动生成 `.srpx` 包。
- 在 `<EnableDynamicLoading>true</EnableDynamicLoading>` 下构建，以支持独立加载上下文。

```xml
<PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <EnableDynamicLoading>true</EnableDynamicLoading>
    <CreateSrpx>true</CreateSrpx>
</PropertyGroup>
```

## ::lucide:file-text:: 插件清单文件

清单文件 `manifest.yml` 包含插件的基本信息。使用模板创建的项目已经配置完毕，只需按需微调。

清单文件具有以下属性：

| 属性名 | 类型 | 必填？ | 说明 |
|--------|------|--------|------|
| `id` | `string` | **是** | 插件唯一 id，必须是合法文件名且不能包含路径分隔符 |
| `entranceAssembly` | `string` | **是** | 插件入口程序集，加载时从该程序集查找 `PluginBase` 实现 |
| `apiVersion` | `string` | **是** | 插件面向的宿主 API 版本，主版本必须不低于宿主 `PluginApiVersions.Current.Major` |
| `name` | `string` | 否 | 插件显示名称 |
| `description` | `string` | 否 | 插件描述 |
| `version` | `string` | 否 | 插件自身版本，如 `1.0.0` |
| `author` | `string` | 否 | 插件作者 |
| `url` | `string` | 否 | 插件主页 Url |
| `icon` | `string` | 否 | 插件图标文件名，默认为 `icon.png` |
| `readme` | `string` | 否 | 插件自述文件文件名，默认为 `README.md` |
| `dependencies` | `array` | 否 | 插件间依赖（见[插件依赖](/dev/plugins/dependency)） |
| `supportedPlatforms` | `array` | 否 | 插件支持的操作系统平台 |

以下是一个清单文件的示例：

```yaml
id: secrandom.example
name: SecRandom 示例插件
description: 一个最小 SecRandom 插件示例
entranceAssembly: SecRandom.ExamplePlugin.dll
apiVersion: 3.0.0
version: 1.0.0
author: SECTL
```

## ::lucide:arrow-right:: 继续深入

您可以继续阅读[插件入口类](/dev/plugins/plugin-base)了解入口与生命周期，阅读[能力面](/dev/plugins/capabilities)查看宿主暴露的稳定契约，或参考 GitHub 上的 [SecRandom.ExamplePlugin](https://github.com/SECTL/SecRandom/tree/main/SecRandom.ExamplePlugin)。
