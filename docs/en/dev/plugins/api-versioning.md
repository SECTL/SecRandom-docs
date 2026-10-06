---
title: Plugin API Versions & Compatibility
createTime: 2026/08/14
---

# ::lucide:git-branch:: Plugin API Versions & Compatibility

This page explains how `apiVersion` is checked, and when a plugin must be recompiled.

## ::lucide:tag:: Two Version Numbers

| Field | Location | Meaning |
|-------|----------|---------|
| `apiVersion` | `manifest.yml` | The host plugin API version the plugin targets |
| `version` | `manifest.yml` | The plugin's own version, used by the market for updates |

The plugin API version is defined by the host's `PluginApiVersions.Current`, currently `3.2.0` (host plugin API 3.2), and follows the application major version.

## ::lucide:circle-check:: Loading Rules

The host compares the **major version only**: the major of `apiVersion` must not be below the host major, otherwise the plugin is rejected with `Plugin API version 2.0.0 is not supported; 3.0 or higher is required.`

- The same major is enough: `3.0.0`, `3.1.0` and `3.2.0` all load on a 3.x host.
- There is no upper bound: a plugin declaring `4.0.0` still loads on a 3.x host.
- Once the host reaches 4.x, plugins declaring `3.x` are rejected; publish a new version with `apiVersion: 4.x`.
- The plugin market adds one more check, `minimumHostVersion`: when the host is older, the plugin is marked incompatible and cannot be installed.

## ::lucide:refresh-cw:: When to Recompile

- **No change needed**: the host only adds contracts, optional parameters, or manifest fields (for example a new `virtual` lifecycle hook or a new service interface). Existing plugins keep working.
- **Change required**: the host bumps its major version, an existing contract changes signature, or an old field changes meaning. Update `apiVersion` and the SDK version, then recompile — otherwise the plugin fails at runtime with `MissingMethodException` / `TypeLoadException`.

The reason is that host assemblies inside the plugin package are never loaded: `SecRandom.PluginSdk`, `SecRandom.Core`, `SecRandom.Shared`, `Avalonia*`, `FluentAvalonia*`, and `Microsoft.Extensions.*` always come from the host, and same-named dlls in the package are ignored (see [Plugin Dependencies](/en/dev/plugins/dependency)).

## ::lucide:list-checks:: Upgrade Checklist

1. Align `apiVersion` in `manifest.yml` with the new host major.
2. Update the `SecRandom.PluginSdk` package version, `SecRandomPluginApiVersion`, and `SecRandomClientRoot` in the csproj.
3. Run `dotnet build -c Release` to package a new `.srpx`, then install it in the client once to verify.
