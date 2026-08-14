---
title: Plugin Dependencies
createTime: 2026/08/14
---

# ::lucide:link:: Plugin Dependencies

This page covers dependencies between plugins and the host, plugin-to-plugin dependencies, and how to handle external package version conflicts.

## ::lucide:server:: Host-Provided Dependencies

The host supplies the following assemblies in-process. Plugins should **not** package them, and should not expect to control their versions:

- `SecRandom.Shared`, `SecRandom.Core`, `SecRandom.PluginSdk`
- Avalonia, FluentAvalonia and their dependencies
- `Microsoft.Extensions.*` (Host, DependencyInjection, Logging, etc.)
- Other runtime assemblies already referenced by the host

The SRPX packaging target automatically excludes these host-provided assemblies, keeping packages host-independent. The plugin SDK is referenced via `PackageReference` + `ExcludeAssets="runtime;native"` and only contributes compile-time API.

## ::lucide:package-open:: External Package Dependencies

The plugin's own external NuGet dependencies are copy-local by default and ship inside the `.srpx` package:

- Besides `manifest.yml` and the entrance assembly, the package root contains all external assembly dependencies.
- The packaging target excludes host-provided assemblies, `runtimes/**`, and localized satellite resources; everything else is included.

## ::lucide:git-fork:: Plugin-to-Plugin Dependencies

Plugins can declare dependencies on other plugins in `manifest.yml`; the host loads them in topological order:

```yaml
dependencies:
  - id: some.other.plugin
    required: true
```

- A missing or failed required dependency marks the plugin as failed; an optional dependency (`required: false`) that is missing does not block loading.
- Circular dependencies are detected and rejected.

## ::lucide:alert-triangle:: External Dependency Version Conflicts

Each plugin loads in its own isolated `PluginLoadContext`, so same-named assemblies do not overwrite each other between plugins. But when plugins need to cooperate, keep these rules in mind:

- **Host dependencies** are versioned by the host. Develop against the Core contract versions the host provides, and don't try to ship a different version of host assemblies inside your package.
- When **multiple plugins share the same external library**, keep the version of that library consistent across the contexts. If shared code expects the same static state or type (for example through plugin-to-plugin collaboration), version mismatches load different copies, producing confusing failures such as "types are not equal" or events never firing.
- Prefer plugin-to-plugin dependencies (`dependencies`) and the host DI over sharing a third-party library's static state.

::: tip Keep It Simple
Prefer host-provided dependencies (Core / Avalonia / Microsoft.Extensions) and limit external third-party libraries to what's necessary. This significantly lowers the chance of conflicts with other plugins.
:::
