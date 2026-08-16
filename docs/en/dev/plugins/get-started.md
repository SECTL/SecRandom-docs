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
<PackageReference Include="SecRandom.PluginSdk" Version="3.0.0">
  <ExcludeAssets>runtime;native</ExcludeAssets>
</PackageReference>
```

- `ExcludeAssets="runtime;native"` keeps the SDK package compile-time only; the runtime assemblies your plugin needs (such as `SecRandom.Core`) are supplied in-process by the host.
- Package versions follow the main application. Use a version matching the application major version (for example `3.0.0`). The current host API major version is `3`.
- Plugins use the host-exposed [capabilities](/en/dev/plugins/capabilities) through the SDK, which are the Core contracts the SDK references.

::: note Use the local SDK during development
The repository template `SecRandom.ExamplePlugin` uses a local project reference (`UseLocalPluginSdk=true`) by default so it builds with the solution even before the SDK is published. Released plugins use the NuGet `PackageReference` above.
:::

## ::lucide:folder-tree:: Get the Minimal Template

`SecRandom.ExamplePlugin` is the minimal plugin template maintained in the repository. It includes the entry class, manifest, an example settings page, and packaging configuration. You can use it as a starting point:

```bash
git clone https://github.com/SECTL/SecRandom.git
cd SecRandom/SecRandom.ExamplePlugin
dotnet build
```

The build produces `srpx/SecRandom.ExamplePlugin.srpx`.

::: note
A more convenient `dotnet new` plugin template package (`SecRandom.PluginTemplate`) is planned; it will replace manual cloning once released.
:::

## ::lucide:bug:: Local Debugging

During development you don't need to repeatedly package and install:

- Use the startup argument `--epp <directory>` (or `--externalPluginPath <directory>`, repeatable) to add a development plugin directory. Plugins there are loaded in place; the host never moves or deletes them. Restart the application after changing code.
- Alternatively, place a packaged `.srpx` in `data/cache/plugin-packages` and restart the desktop application to install it.

## ::lucide:arrow-right:: Next Steps

Read [Create a Plugin](/en/dev/plugins/create-project) to learn the plugin project structure, or jump straight to the [Plugin Entry Class](/en/dev/plugins/plugin-base) and [Capabilities](/en/dev/plugins/capabilities).
