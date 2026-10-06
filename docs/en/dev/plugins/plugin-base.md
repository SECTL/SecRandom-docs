---
title: Plugin Entry Class
createTime: 2026/08/14
---

# ::lucide:plug:: Plugin Entry Class

The plugin entry is the single non-abstract class derived from `PluginBase` in the assembly named by the manifest's `entranceAssembly`.

## ::lucide:code:: PluginBase

```csharp
public abstract class PluginBase : IAsyncDisposable
{
    // Plugin info and private config directory, injected by the host
    public PluginInfo Info { get; }
    public string PluginConfigFolder { get; }

    // Registers plugin services and Core extensions before the Host is built (abstract, must be implemented)
    public abstract void Initialize(HostBuilderContext context, IServiceCollection services);

    // Called after the host finished startup; initialize runtime state that needs Host and UI ready
    public virtual void OnAppStarted();

    // Called before the host shuts down, before DisposeAsync; stop background work or flush state here
    public virtual void OnAppStopping();

    // Releases plugin resources on host shutdown; override to clean up timers, IPC, or files
    public virtual ValueTask DisposeAsync();
}
```

## ::lucide:code-2:: Initialize

`Initialize` runs before the host Host is built and is the plugin's only registration entry point. Here you can:

- Register plugin services: `services.AddSingleton<T>()`, etc.;
- Register pages: `services.AddSettingsPage<T>()` / `services.AddMainPage<T>()`;
- Register Core extensions, e.g. attached settings controls `services.AddAttachedSettingsControl<T>()`.

```csharp
public sealed class Plugin : PluginBase
{
    public override void Initialize(HostBuilderContext context, IServiceCollection services)
    {
        services.AddSettingsPage<ExampleSettingsPage>("SecRandom Example Plugin");
        services.AddSingleton<MyService>();
    }
}
```

::: note Floating-window buttons are registered at runtime
Floating-window buttons are added through a runtime registry: resolve `IFloatingWindowButtonRegistry` (e.g. `IAppHost.TryGetService<IFloatingWindowButtonRegistry>()`) and call `Register(...)`. The Host does not exist yet while `Initialize` runs, so do this in or after `OnAppStarted()`; registrations are never persisted and the floating window prunes entries that disappear on refresh. See [Capabilities](/en/dev/plugins/capabilities).
:::

## ::lucide:activity:: Application Lifecycle

Override `OnAppStarted()` / `OnAppStopping()` on `PluginBase` to receive application lifecycle events; the host forwards `AppStarted` / `AppStopping` to every plugin entry. **No separate hosted service is needed.**

```csharp
public sealed class Plugin : PluginBase
{
    public override void OnAppStarted()
    {
        // The host finished startup; Host and UI are ready.
    }

    public override void OnAppStopping()
    {
        // The host is shutting down; runs before DisposeAsync.
    }

    public override async ValueTask DisposeAsync()
    {
        await _timer?.DisposeAsync();
    }
}
```

- Plugin-registered `IHostedService`s stop with the host's `StopAsync`.
- Only inject `IAppLifecycleService` when a non-entry service needs to listen for application events (see [Capabilities](/en/dev/plugins/capabilities)).

## ::lucide:git-branch:: Registered Services

The entry instance is itself registered in DI (as both `PluginBase` and its concrete type). The pages and services a plugin registers are then resolved from the same Host at runtime.
