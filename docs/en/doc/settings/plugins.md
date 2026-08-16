---
title: Plugins Settings
createTime: 2026/08/14
---

> ::lucide:puzzle:: **Plugin Management**
>
> Manage desktop plugins through the Installed and Market views. All install, enable, or uninstall operations take effect after restarting the application.

::: info Desktop Only
Plugins are a desktop feature; mobile builds do not load dynamic plugins. The **Plugins** entry under Settings is shown on desktop only.
:::

## ::lucide:box:: Installed

**Plugin List**: shows installed plugins with name, version, author, and load status (Loaded / Disabled / Failed / Discovered).

**Search**: filter the list by plugin name, id, or author.

**Detail Pane**: selecting a plugin shows its icon, metadata, status, and readme (README). Failed plugins show the error and let you open the plugin folder to inspect it.

### Enable / Disable

Toggle the enable switch of a plugin; the change takes effect after **restarting the application**.

### Import a Local Package

Click Import and choose a `.srpx` plugin package:

- The package is validated (manifest and entrance assembly) and staged into `data/cache/plugin-packages`.
- Restarting the application completes the install; a package with the same id is treated as an update and replaces the whole directory.

### Uninstall

Select a plugin and click Uninstall. After confirming:

- The plugin directory is removed on **next startup**.
- The plugin's config directory (`data/config/plugins/<id>`) is **preserved**, so settings can be restored if the plugin is reinstalled later.
- The uninstall takes effect after restarting the application.

## ::lucide:store:: Market

The Market tab loads installable plugins from the official index ([SECTL/SecRandom-PluginIndex](https://github.com/SECTL/SecRandom-PluginIndex)). Each entry shows name, author, version, and status:

- **Installable / Installed / Update Available**: click Install or Update, confirm the dependencies, and the install begins; restart the application to apply.
- **Incompatible**: the plugin's `apiVersion` major is below the current application, or the required host version is too high; it cannot be installed.

::: tip Security
The market index is verified with an Ed25519 signature, and every package's SHA-256 is checked before install; dependencies are resolved in topological order. Still, plugins run in the same process as the application, so only install plugins from trusted sources.
:::
