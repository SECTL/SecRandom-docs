---
title: Plugin Basics
createTime: 2026/08/14
---

# ::lucide:graduation-cap:: Plugin Basics

This page covers the plugin loading flow, apiVersion rules, page registration and localization, and how plugins read and write configuration.

## ::lucide:loader-circle:: Loading Flow

On desktop startup, the host processes plugins in the following order:

1. Process uninstall markers: plugin folders carrying a `.uninstall` marker are removed on this startup (the config directory is preserved, see [Uninstall & Config Semantics](#uninstall-config-semantics)).
2. Process pending packages: `.srpx` packages in `data/cache/plugin-packages` are extracted to `data/plugins/<id>`; a package with the same id replaces the whole directory for updates.
3. Discover plugins: scan each `manifest.yml` under `data/plugins`, merging in the external development directories given by `--epp`.
4. Validate manifests and resolve the load order: topologically sort by `dependencies`; cycles and missing required dependencies mark the plugin as failed.
5. Load: create a dedicated `PluginLoadContext` per plugin, find the single non-abstract `PluginBase` implementation in the entrance assembly, and call `Initialize`.

::: note Plugin Directories
- Installed plugins: `data/plugins/<id>`
- Pending packages: `data/cache/plugin-packages`
- Plugin-private config: `data/config/plugins/<id>`
:::

## ::lucide:tag:: apiVersion & Versions

- The `apiVersion` in `manifest.yml` declares the host API the plugin targets; its major must be at least the host's `PluginApiVersions.Current.Major` (currently `3`). Plugins that don't meet this are rejected.
- `apiVersion` follows the application major version; `version` is the plugin's own version, independent of `apiVersion`.
- The plugin `version` drives update detection in the market; installation is keyed by `id`, so a package with the same id is treated as an update.

## ::lucide:layout-grid:: Page Registration & Localization

Plugins can register settings pages and main pages:

- Page ids follow the `plugin.<id>.*` namespace and must be unique at the application registry level.
- Register with the Core extensions: `services.AddSettingsPage<T>(title)` / `services.AddMainPage<T>(title)`, and annotate the page class with `[PageInfo("plugin.<id>.xxx", Icon)]`.
- Registration happens in the plugin entry's `Initialize`, before the host Host is built.

**Localization:**

- User-visible strings are maintained per page folder as `Resources.resx`, `Resources.en-US.resx`, and `Resources.ja-JP.resx`, with Simplified Chinese, English, and Japanese all present.
- Use the `PublicResXFileCodeGenerator` resource designer; register only `Resources.resx` and `Resources.Designer.cs` in the project file.
- Switching the application language requests a restart; after restart the plugin resources load the matching language from `CultureInfo.CurrentUICulture`. Plugins should not assume a fixed culture, nor merge page text into the host's shared resource bucket.

## ::lucide:settings:: Configuration

Plugins inject `MainConfigHandler` through DI to read/write the main config, or subclass `ConfigHandlerBase<T>` to manage their own config:

```csharp
public override void Initialize(HostBuilderContext context, IServiceCollection services)
{
    services.AddSingleton<MyPluginConfigHandler>();
}
```

- Collection config changes are not auto-saved; call `Save()` after mutating them.
- Do not modify the main config's persistence paths directly; plugin-private files belong in `PluginConfigFolder` (that is, `data/config/plugins/<id>`).

## ::lucide:trash-2:: Uninstall & Config Semantics

- Uninstall: the settings page writes a `.uninstall` marker; the plugin directory is removed on next startup, and the **`data/config/plugins/<id>` config directory is preserved**.
- Enable/disable: the settings switch writes a `.disabled` marker, applied on next startup.
- Crash auto-disable: when a global exception's stack belongs to a plugin load context, that plugin is automatically marked `.disabled` and skipped on next startup.

## ::lucide:shield-alert:: Security Boundary

Plugins run inside the host process and are **not sandboxed**: plugin code has the same process privileges and data access as the host. Market verification (SHA-256 and Ed25519 signatures) guarantees package integrity, but in-process plugins should still be treated as trusted code. Do not grant data or credential access to plugins from untrusted sources.
