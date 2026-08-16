---
title: Create a Plugin
createTime: 2026/08/14
---

# ::lucide:hammer:: Create a Plugin

This page explains how to create, configure, and package a SecRandom plugin project. Before starting, set up your environment following [Set Up a Plugin Environment](/en/dev/get-started).

## ::lucide:folder-tree:: Plugin Structure

Using the repository template `SecRandom.ExamplePlugin` as an example, a plugin project usually contains:

```plaintext
SecRandom.ExamplePlugin
 ├─ SecRandom.ExamplePlugin.csproj   // Project file: SDK reference, CreateSrpx enabled
 ├─ manifest.yml                     // Plugin manifest
 ├─ Plugin.cs                        // Plugin entry class (inherits PluginBase)
 ├─ README.md                        // Plugin readme (rendered in the settings page)
 ├─ icon.png                         // Plugin icon
 ├─ Views/
 │   └─ SettingsPages/
 │       └─ ExampleSettingsPage.axaml(.cs)  // Example settings page
 └─ srpx/
     └─ SecRandom.ExamplePlugin.srpx // Build output (when CreateSrpx=true)
```

The plugin project needs to:

- Reference `SecRandom.PluginSdk` with `PackageReference` and `ExcludeAssets="runtime;native"` (see [Set Up a Plugin Environment](/en/dev/get-started)).
- Set `<CreateSrpx>true</CreateSrpx>` so the `.srpx` package is produced on every build.
- Build with `<EnableDynamicLoading>true</EnableDynamicLoading>` to support the isolated load context.

```xml
<PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <EnableDynamicLoading>true</EnableDynamicLoading>
    <CreateSrpx>true</CreateSrpx>
</PropertyGroup>
```

## ::lucide:file-text:: The Manifest File

The manifest file `manifest.yml` holds the plugin's basic information. Projects created from the template come pre-configured; just adjust as needed.

The manifest has the following properties:

| Property | Type | Required? | Description |
|----------|------|-----------|-------------|
| `id` | `string` | **Yes** | Unique plugin id; must be a valid file name without path separators |
| `entranceAssembly` | `string` | **Yes** | Plugin entrance assembly; the `PluginBase` implementation is looked up in this assembly |
| `apiVersion` | `string` | **Yes** | Host API version the plugin targets; its major must be at least the host's `PluginApiVersions.Current.Major` |
| `name` | `string` | No | Plugin display name |
| `description` | `string` | No | Plugin description |
| `version` | `string` | No | Plugin's own version, e.g. `1.0.0` |
| `author` | `string` | No | Plugin author |
| `url` | `string` | No | Plugin homepage Url |
| `icon` | `string` | No | Plugin icon file name, defaults to `icon.png` |
| `readme` | `string` | No | Plugin readme file name, defaults to `README.md` |
| `dependencies` | `array` | No | Plugin-to-plugin dependencies (see [Plugin Dependencies](/en/dev/plugins/dependency)) |
| `supportedPlatforms` | `array` | No | Operating systems the plugin supports |

Here is an example manifest:

```yaml
id: secrandom.example
name: SecRandom 示例插件
description: 一个最小 SecRandom 插件示例
entranceAssembly: SecRandom.ExamplePlugin.dll
apiVersion: 3.0.0
version: 1.0.0
author: SECTL
```

## ::lucide:arrow-right:: Continue

Read the [Plugin Entry Class](/en/dev/plugins/plugin-base) for entry and lifecycle details, see [Capabilities](/en/dev/plugins/capabilities) for the stable contracts the host exposes, or check the [SecRandom.ExamplePlugin](https://github.com/SECTL/SecRandom/tree/main/SecRandom.ExamplePlugin) on GitHub.
