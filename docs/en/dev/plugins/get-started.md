---
title: Set Up a Plugin Environment
createTime: 2026/08/14
---

# ::lucide:terminal-square:: Set Up a Plugin Environment

This page explains how to prepare a SecRandom plugin development environment and create a minimal plugin project.

## ::lucide:hammer:: Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later.
- An IDE that supports .NET, such as JetBrains Rider or Visual Studio.
- Basic knowledge of C# and Avalonia (plugin pages are built with Avalonia controls).

## ::lucide:package:: Reference the SDK

SecRandom plugins reference the host API through the NuGet package `SecRandom.PluginSdk`. Add the following to your plugin project:

```xml
<PackageReference Include="SecRandom.PluginSdk" Version="3.1.0">
  <ExcludeAssets>runtime;native</ExcludeAssets>
</PackageReference>
```

- `ExcludeAssets="runtime;native"` keeps the SDK package compile-time only; the runtime assemblies your plugin needs (such as `SecRandom.Core`) are supplied in-process by the host.
- Package versions follow the main application; use the version that matches your app (the latest published package is `3.1.0`, and plugin API `3.1.5` corresponds to `v3.1.5`). Only the major version of `apiVersion` is compared, and the current plugin API major is `3`.
- Plugins use the host-exposed [capabilities](/en/dev/plugins/capabilities) through the SDK, which are the Core contracts the SDK references.

::: note Template built with the main application
The `SecRandom.ExamplePlugin` inside the main application repository builds with the solution, making it handy for validating the SDK before a release exists. Plugins you distribute should reference the NuGet package as shown above.
:::

## ::lucide:folder-tree:: Get the Minimal Template

[SECTL/SecRandom-ExamplePlugins](https://github.com/SECTL/SecRandom-ExamplePlugins) is the standalone example plugin repository: it registers a single settings page that displays the plugin's own information. Use it as a starting point:

```bash
git clone https://github.com/SECTL/SecRandom-ExamplePlugins.git
cd SecRandom-ExamplePlugins
powershell -ExecutionPolicy Bypass -File scripts\build.ps1
```

The build produces `ExamplePlugin\srpx\SecRandom.ExamplePlugin.srpx`. The `SecRandom.ExamplePlugin` inside the main application repository is the same template kept in-tree, useful for reading alongside.

## ::lucide:bug:: Local Debugging

During development you don't need to repeatedly package and install:

- Use the startup argument `--epp <directory>` (or `--externalPluginPath <directory>`, repeatable) to add a development plugin directory: point it at the **parent directory that contains your plugin directories**, since the host only enumerates its subdirectories. Plugins there are loaded in place; the host never moves or deletes them. Restart the application after changing code.
- Alternatively, place a packaged `.srpx` in `data/cache/plugin-packages` and restart the desktop application to install it.

## ::lucide:arrow-right:: Next Steps

Read [Create a Plugin](/en/dev/plugins/create-project) to learn the plugin project structure, or jump straight to the [Plugin Entry Class](/en/dev/plugins/plugin-base) and [Capabilities](/en/dev/plugins/capabilities).
