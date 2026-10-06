---
title: Capabilities
createTime: 2026/08/14
---

# ::lucide:layers:: Capabilities

The host exposes capabilities to plugins through the stable contracts under `SecRandom.Core.Abstraction.Services`. Plugins only depend on the SDK to use them; implementations are registered by the host in `BuildHost()`.

## ::lucide:table:: Contract Overview

| Contract | Namespace | Description |
|----------|-----------|-------------|
| `IDrawerView` | `SecRandom.Core.Abstraction.Services.Views` | Open/close the host shell's right-side drawer and query its state |
| `IMainView` | `SecRandom.Core.Abstraction.Services.Views` | Extends `IDrawerView`; navigate main pages by page id |
| `ISettingsView` | `SecRandom.Core.Abstraction.Services.Views` | Extends `IDrawerView`; navigate settings pages by page id and enter read-only preview |
| `IAppNavigationService` | `SecRandom.Core.Abstraction.Services` | Open the main window / settings window / quick-draw window |
| `IAppLifecycleService` | `SecRandom.Core.Abstraction.Services` | `AppStarted` / `AppStopping` events |
| `IFloatingWindowButtonRegistry` | `SecRandom.Core.Abstraction.Services` | Register floating-window buttons at runtime |
| `IPluginDrawService` | `SecRandom.Core.Abstraction.Services` | Controlled draw facade (see below) |
| `IPluginManager` | `SecRandom.PluginSdk` | Query loaded plugins and the plugins directory, disable / uninstall plugins (see below) |
| `IAppHost` | `SecRandom.Core.Abstraction` | Static service locator: `Host.Services`, `GetService<T>()` / `TryGetService<T>()` |
| Existing Core contracts | `SecRandom.Core.Abstraction.Services` | `IProfileCatalogManager`, `IHistoryQueryService`, `IFeatureAvailabilityService`, `IVoiceAnnouncementService`, `ISpeechProvider`, `IViewEngine`, `IUiContributionService` / `IOverlayHostService` / `IResultPresentationService`, etc. |

::: note Resolution
Register pages and services in the plugin's `Initialize`; at runtime resolve the contracts above through constructor injection, or with `IAppHost.TryGetService<T>()` (`GetService<T>()` throws `ArgumentException` when the service is missing).
Note that when `Initialize` runs the application Host is not built yet (`IAppHost.Host` is `null`), so registration only belongs there; put runtime logic that uses these contracts in or after `OnAppStarted()`.
:::

## ::lucide:puzzle:: Plugin Information

`IPluginManager` exposes the plugins the host currently manages; a plugin can find itself in `IPluginManager.Plugins` by matching `Manifest.EntranceAssembly`.

```csharp
public sealed class PluginInfo
{
    public required PluginManifest Manifest { get; init; }      // Manifest: id, name, version, apiVersion…
    public required string PluginFolderPath { get; init; }      // Plugin folder
    public required string PluginConfigFolder { get; init; }    // Plugin-private config folder
    public PluginLoadStatus LoadStatus { get; internal set; }   // NotLoaded / Loaded / Disabled / Error
    public Exception? Exception { get; internal set; }          // Exception when loading failed
    public bool IsEnabled { get; internal set; }
}
```

A plugin entry can read its own `Info` and `PluginConfigFolder` directly (see [Plugin Entry Class](/en/dev/plugins/plugin-base)).

## ::lucide:panel-left:: Views & Navigation

Drawer content is typed `object` (an Avalonia control) and the host decides how to present it; drawer operations are no-ops when no main/settings shell is visible.

```csharp
public interface IDrawerView
{
    void OpenDrawer(object content);
    void CloseDrawer();
    bool IsDrawerOpen { get; }
}
```

`IMainView.NavigateToPage(string id)` navigates by registered main page id (`main.xxx`); `ISettingsView.NavigateToPage(string id)` navigates by settings page id (`settings.xxx`), and `NavigateToPreviewPage(string id)` enters read-only preview (a security-verification outcome that never mutates configuration). Navigating to an unregistered or unavailable id is a no-op.

```csharp
public interface IAppNavigationService
{
    void OpenMainWindow(string? pageId = null);
    void OpenSettingsWindow(string? pageId = null);   // keeps the host's security authorization flow
    void OpenQuickDraw();
}
```

## ::lucide:wand-sparkles:: Floating-Window Buttons

Plugins can register floating-window buttons at runtime (never persisted to configuration); users choose which plugin buttons to show in the floating-window settings. The floating window prunes registrations that disappear on refresh.

```csharp
public sealed record FloatingWindowButtonDescriptor(string Id, string Icon, string Label, Action Click);
```

```csharp
floatingButtons.Register(new FloatingWindowButtonDescriptor(
    "secrandom.example.openMain", "AppsFilled", "示例按钮",
    () => navigation.OpenMainWindow()));
```

- `Id` must be unique at the application registry level; `Icon` is a Fluent icon name from the Core icon catalog.

## ::lucide:shuffle:: Controlled Draws

Plugins **must not** call `IDrawCommitService`, `IRollCallSession` / `ILotterySession`, or history write APIs directly; doing so bypasses course-linkage restrictions, security authorization, fairness proofs, and temporary-record filtering. Always use `IPluginDrawService`:

```csharp
public interface IPluginDrawService
{
    Task<PluginStudentDrawResult> DrawStudentsAsync(
        PluginStudentDrawRequest request, CancellationToken cancellationToken = default);

    Task<PluginLotteryDrawResult> DrawLotteryAsync(
        PluginLotteryDrawRequest request, CancellationToken cancellationToken = default);
}
```

Internally the host goes through the course-linkage coordinator and security authorization, then reuses the built-in roll-call/lottery service verification and transactional commit pipeline, so plugin draws are identical to built-in draws in fairness, reproducible proofs, and course linkage. Results carry `ProofId` / `DrawRoundId`.

```csharp
var result = await drawService.DrawStudentsAsync(
    new PluginStudentDrawRequest("班级名", Group: "第1组", Count: 2));
```

Request parameters:

- `PluginStudentDrawRequest(ListName, Group, Gender, Count, CourseName)`: selects the student list; empty group/gender means "all"; count is clamped by the host to the eligible remaining candidates.
- `PluginLotteryDrawRequest(PrizePoolName, StudentListName, Group, Gender, Count, CourseName)`: selects the prize pool, optionally with a student list to assign winners; count is clamped by the host to the remaining prizes.

## ::lucide:activity:: Lifecycle Service

`IAppLifecycleService` exposes `AppStarted` / `AppStopping` events for non-entry services that need them. Plugin entries should override `PluginBase.OnAppStarted()` / `OnAppStopping()` instead (see [Plugin Entry Class](/en/dev/plugins/plugin-base)).

## ::lucide:gift:: Toast & Configuration

- Toast: no service-level API is needed. Plugin pages use the existing Core toast helpers (e.g. `this.ShowWarningToast(...)`); control events bubble to the `AppToastAdorner`.
- Configuration: inject `MainConfigHandler` or subclass `ConfigHandlerBase<T>` for config, and put plugin-private files in `PluginConfigFolder` (see [Plugin Basics](/en/dev/plugins/basics)).
