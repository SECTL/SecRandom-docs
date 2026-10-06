---
title: Capabilities
createTime: 2026/08/14
---

# ::lucide:layers:: Capabilities

The host exposes capabilities to plugins through the stable contracts under `SecRandom.Core.Abstraction.Services`. Plugins only depend on the SDK to use them; implementations are registered by the host in `BuildHost()`.

## ::lucide:table:: Contract Overview

| Contract | Namespace | Description |
|----------|-----------|-------------|
| `IDrawerView` / `IMainView` / `ISettingsView` | `…Abstraction.Services.Views` | Open/close the host drawer, navigate main pages / settings pages by page id |
| `IAppNavigationService` | `…Abstraction.Services` | Open the main window / settings window / quick-draw window |
| `IAppLifecycleService` / `IFloatingWindowButtonRegistry` | `…Abstraction.Services` | `AppStarted` / `AppStopping` events; register floating-window buttons at runtime |
| `IPluginDrawService` | `…Abstraction.Services` | Controlled draw facade (see below) |
| `IListQueryService` | `…Abstraction.Services.Data` | Read-only queries of roster and prize-pool snapshots |
| `IPluginStorageFactory` / `IPluginStorage` | `…Abstraction.Services.Storage` | Read/write text / bytes / JSON in the plugin-private folder |
| `INotificationService` / `IBusyIndicator` | `…Abstraction.Services.Notifications` | Notifications, confirm dialogs, input prompts and the busy indicator |
| `IWindowService` / `IPopupService` | `…Abstraction.Services.Views` | Standalone windows / modal dialogs / cross-platform popups |
| `IUiScheduler` / `IAppShutdownParticipant` | `…Abstraction.Services.Threading` | UI thread scheduling and shutdown cleanup |
| `IPluginEventBus` | `…Abstraction.Services.Messaging` | Publish/subscribe between plugins, plus the host events `HostEvents` |
| `IThemeTokenService` / `ILocalizationService` | `…Services.Theming` / `…Services.Localization` | Read the host theme palette; register the plugin's own localized strings |
| `IUiContributionService` / `IUiStyleService` / `IOverlayHostService` | `…Abstraction.Services.Views` | Slot contributions, style overrides, overlays on the host shell |
| `IDrawPipelineService` / `IDrawAnimationContribution` | `…Services.Pipeline` / `…Services.Presentation` | Candidate filtering, result post-processing and reveal animations |
| `IResultPresentationService` / `IDrawResultPresenter` | `…Abstraction.Services.Presentation` | Take over the presentation of every draw round's result |
| `ICapabilityService` | `…Abstraction.Services.Capabilities` | Query host capability ids and the permissions a plugin declared |
| `IPluginDiagnosticsService` | `…Abstraction.Services.Diagnostics` | Report diagnostics and inspect loaded plugins |
| `IPluginManager` | `SecRandom.PluginSdk` | Query loaded plugins and the plugins directory, disable / uninstall plugins (see below) |
| `IAppHost` | `SecRandom.Core.Abstraction` | Static service locator: `Host.Services`, `GetService<T>()` / `TryGetService<T>()` |
| Other Core contracts | `SecRandom.Core.Abstraction` | History, speech, algorithms, configuration and more — see the [Full Contract List](#full-contract-list) below |

::: note Resolution
Register pages and services in the plugin's `Initialize`; at runtime resolve the contracts above through constructor injection, or with `IAppHost.TryGetService<T>()` (`GetService<T>()` throws `ArgumentException` when the service is missing).
Since host API 3.2 you can first check whether a capability exists with `ICapabilityService.Has("ui.contribution")` and degrade gracefully on older hosts.
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

## ::lucide:gift:: Notifications & Configuration

- Notifications: `INotificationService` provides notifications, confirm dialogs and input prompts (see "Extension Points added in 3.2" below); lightweight toasts inside plugin pages can still use the Core helpers directly (e.g. `this.ShowWarningToast(...)`).
- Configuration: inject `MainConfigHandler` through DI or subclass `ConfigHandlerBase<T>` to read/write config, and put plugin-private files in `PluginConfigFolder` (see [Plugin Basics](/en/dev/plugins/basics)).

## ::lucide:shield:: Permissions & Capabilities

Since host API 3.2, a plugin can declare in `manifest.yml` what it needs (`permissions`):

```yaml
permissions:
  - ui
  - storage
```

| Permission name | Meaning |
|-----------------|---------|
| `none` | Explicitly declare "nothing needed"; **omitting `permissions` = undeclared = everything allowed** |
| `ui` | Add things to the host UI (slots, styles, overlays) |
| `storage` | Use plugin-private storage |
| `network` | Network access |
| `clipboard.read` / `clipboard.write` | Read / write the clipboard |
| `file.picker` | Let the user pick files or folders |
| `settings` | Read/write the plugin's own settings page and state files (registering the settings page itself is unrestricted) |
| `draw` | Start draws through `IPluginDrawService` |
| `history` | Read history records |
| `overlay` | Show standalone windows or popups |

Names are case-insensitive and also ignore `_`, `-`, `.` (`clipboard.read`, `clipboard_read`, `clipboardRead` are equivalent); unknown names are dropped rather than rejecting the install. This is a **declarative policy, not a security boundary** (plugins run in the same process as the host, under FullTrust).

You can query before deciding at runtime:

```csharp
var capabilities = IAppHost.GetService<ICapabilityService>();
if (capabilities.Has(HostCapabilities.UiContribution)) { /* degrade gracefully when an older host lacks the capability */ }
var permissions = capabilities.GetPermissions("com.example.plugin");   // IsDeclared / Permissions / Allows(...)
```

## ::lucide:sparkles:: Extension Points added in 3.2

The contracts below are all new in host API 3.2 (purely additive, older plugins are unaffected; see [Plugin API Versions & Compatibility](/en/dev/plugins/api-versioning)):

- **Private storage**: `IPluginStorageFactory` / `IPluginStorage` — read/write text, bytes and JSON inside the plugin's own config folder; a path that escapes it (`..`, absolute paths) throws `UnauthorizedAccessException`.
- **Read-only list queries**: `IListQueryService` — fetch roster / prize-pool snapshots (`StudentSnapshot` / `PrizeSnapshot`) without switching the host's active roster; `Changed` fires on the UI thread.
- **Notifications and busy indicator**: `INotificationService` (notifications, `ConfirmAsync`, `PromptAsync`), `IBusyIndicator` (`Begin` returns an `IDisposable`).
- **Windows and popups**: `IWindowService` (standalone windows / modal dialogs), `IPopupService` (uses an overlay when available, otherwise falls back to a window).
- **UI thread**: `IUiScheduler` (`Post` / `InvokeAsync` / `DelayAsync`, optional `UiPriority`); `IAppShutdownParticipant` takes part in application shutdown cleanup.
- **Event bus**: `IPluginEventBus` publish/subscribe; host events live in `HostEvents` (`DrawCompleted` / `PluginLoaded` / `ProfileChanged` / `ThemeChanged` / `AppStarted` / `AppStopping`).
- **Theming and localization**: `IThemeTokenService` reads the host palette (`TryGetColor` / `GetResource`), `ILocalizationService` registers the plugin's own localized strings.
- **Draw pipeline**: `IDrawCandidateFilter` filters candidates before a draw (preview, proofs and history all cover the filtered candidates); `IDrawResultPostProcessor` adds a note, skips host history or presentation, or pins the round id after a result.
- **Reveal animations**: `IDrawAnimationContribution` offers custom reveal animations for users to choose from.
- **Diagnostics**: `IPluginDiagnosticsService` reports diagnostics and can query loaded plugins.

Full usage for every extension point (with runnable examples) is in the `README.md` inside the SDK package; the repository counterpart is `SecRandom.PluginSdk\README.md`.

## ::lucide:list:: Full Contract List

`SecRandom.PluginSdk` depends on `SecRandom.Core`, so every contract below is available at compile time with no extra reference.

### Draws & history (`…Abstraction.Services`)

| Contract | Description |
|----------|-------------|
| `IPluginDrawService` | The plugin's only draw entry point (see above) |
| `PluginStudentDrawRequest` / `PluginStudentDrawResult` / `PluginLotteryDrawRequest` / `PluginLotteryDrawResult` | Draw request and result models (results carry `ProofId` / `DrawRoundId`) |
| `IHistoryQueryService` + `HistoryQueryItem` | Read history records without switching the active roster |
| `IHistoryExportService` + `HistoryExportKind` / `HistoryExportFormat` / `HistoryExportSort` / `HistoryExportFilter` / `HistoryExportRequest` / `HistoryExportResult` / `HistoryExportLabels` | Export roll-call / lottery history to xlsx / csv |
| `IDrawCommitService` + `StudentDrawCommit` / `LotteryDrawCommit`, `IRollCallSession`, `ILotterySession`, `IDrawTemporaryRecordService` | Host-internal commit and temporary-record pipeline — **plugins must never call these directly** |

### Rosters, prize pools & feature switches

| Contract | Description |
|----------|-------------|
| `IListQueryService` + `StudentListSnapshot` / `PrizeListSnapshot` / `StudentSnapshot` / `PrizeSnapshot` / `ListChangedEventArgs` | Read-only roster and prize-pool snapshot queries; never switches the host's active roster |
| `IProfileService` | Current roster / prize-pool and history access; **calling `Record*History` is forbidden** |
| `IProfileCatalogManager` / `IProfileCatalogEditor` | Enumerate, add, delete, snapshot and import/export rosters and prize pools (mostly host-internal) |
| `IFeatureAvailabilityService` | Feature switches (`IsLotteryEnabled`), `Changed` event, `Refresh()` |

### Voice & custom algorithms

| Contract | Description |
|----------|-------------|
| `IVoiceAnnouncementService` | Voice announcements |
| `ISpeechProvider` + `VoiceOption` / `SpeechSynthesisRequest` / `SpeechAudio` | Speech synthesis (enumerate voices, produce audio) |
| `ISpeechAudioPlayer` | Play back synthesized audio |
| `IRollCallAlgorithm` + `IRollCallAlgorithmRegistry` | Custom roll-call algorithm: build the weighted candidate pool only, never pick winners or mutate state; register with `AddRollCallAlgorithm<T>` |
| `ILotteryAlgorithm` + `ILotteryAlgorithmRegistry` | Custom lottery algorithm; register with `AddLotteryAlgorithm<T>` |

### Navigation, lifecycle & floating window

| Contract | Description |
|----------|-------------|
| `IAppNavigationService` | Open the main window / settings window / quick-draw window |
| `IAppLifecycleService` | `AppStarted` / `AppStopping` events |
| `IFloatingWindowButtonRegistry` + `FloatingWindowButtonDescriptor` | Register / unregister floating-window buttons at runtime (not persisted) |

### Permissions & capabilities (`…Abstraction.Services.Capabilities`)

| Contract | Description |
|----------|-------------|
| `ICapabilityService` | `HostApiVersion`, `Capabilities`, `Has(id)`, `GetPermissions(pluginId)`, `IsAllowed(pluginId, permission)` |
| `HostCapabilities` | Capability id constants: `draw.presenter`, `overlay.host`, `ui.contribution`, `ui.style`, `plugin.storage`, `list.query`, `notification`, `busy.indicator`, `ui.scheduler`, `window.service`, `popup.service`, `draw.pipeline`, `theme.tokens`, `localization`, `event.bus`, `diagnostics` |
| `PluginPermissions` / `PluginPermissionSet` / `PluginPermissionNames` | Permission flag enum, the permissions actually in effect for a plugin, and conversion between permission names and flags |

### Storage & diagnostics

| Contract | Description |
|----------|-------------|
| `IPluginStorageFactory` / `IPluginStorage` | Read/write text / bytes / JSON in the plugin-private folder; paths that escape it throw `UnauthorizedAccessException` |
| `IPluginDiagnosticsService` + `PluginDiagnosticEntry` / `PluginRuntimeInfo` / `DiagnosticLevel` | Report diagnostics, query diagnostic entries and loaded-plugin information |

### Notifications, windows & UI thread

| Contract | Description |
|----------|-------------|
| `INotificationService` + `NotificationOptions` / `NotificationSeverity` | Notifications, confirm dialogs, input prompts |
| `IBusyIndicator` | Busy indicator: `Begin` returns an `IDisposable` and closes automatically when the last one is released |
| `IWindowService` + `WindowRequest` / `WindowClosedEventArgs` | Standalone windows and modal dialogs; reusing the same `Id` activates the existing window |
| `IPopupService` + `PopupOptions` / `PopupHandle` / `PopupClosedEventArgs` | Cross-platform popups: use a popup layer when available, otherwise fall back to a standalone window |
| `IUiScheduler` + `UiPriority` | UI thread scheduling: `IsOnUiThread`, `Post`, `InvokeAsync`, `DelayAsync` |
| `IAppShutdownParticipant` | Runs cleanup on application shutdown by `Priority` (total budget 5 seconds) |

### Events, theming & localization

| Contract | Description |
|----------|-------------|
| `IPluginEventBus` / `HostEvents` | Publish/subscribe between plugins; host events `DrawCompleted` / `PluginLoaded` / `ProfileChanged` / `ThemeChanged` / `AppStarted` / `AppStopping` |
| `IThemeTokenService` + `ThemeKind` | Read the host theme palette: `TryGetColor`, `GetColor`, `GetResource`, `Changed` |
| `ILocalizationService` | Register and query the plugin's own localized strings (`GetForPlugin`) |

### Draw pipeline & animation (`…Services.Pipeline` / `…Services.Presentation`)

| Contract | Description |
|----------|-------------|
| `IDrawCandidateFilter` + `DrawPipelineContext` / `DrawCandidateSet` | Filter candidates before a draw; preview, security proofs and history all cover the filtered candidates |
| `IDrawResultPostProcessor` + `DrawResultEdit` | Post-process a result: add a note (`Note`), skip host history / presentation, pin the round id |
| `IDrawPipelineService` | The pipeline service itself (the host schedules filters and post-processors) |
| `IDrawAnimationContribution` + `DrawAnimationOption` / `DrawAnimationSelection` / `DrawAnimationStyleMode` | Offer custom reveal animations for users to choose from |

### UI extension points (`…Abstraction.Services.Views`)

| Contract | Description |
|----------|-------------|
| `IDrawerView` / `IMainView` / `ISettingsView` | Drawer and page navigation (see above) |
| `IUiContributionService` + `IUiContentContribution` / `UiSlotKind` / `UiSlotContext` / `HostUiSlots` | Append, prepend, replace or hide content in named host slots |
| `IUiStyleService` + `IUiStyleContribution` | Add Avalonia styles and resource overrides to restyle the whole shell |
| `IOverlayHostService` + `OverlayOptions` / `OverlayClosedEventArgs` | Show your own overlay on top of the host shell without owning a window |
| `UiContentContributionBase` / `UiStyleContributionBase` | Convenience bases when you only need to build a visual |

### Result presentation (`…Abstraction.Services.Presentation`)

| Contract | Description |
|----------|-------------|
| `IResultPresentationService` | Host dispatch point for result presentation; you may also call it to replay or present your own result |
| `IDrawResultPresenter` | Custom presentation for every round's result (`Priority` / `CanPresent` / `PresentAsync`); register with `services.AddSingleton<IDrawResultPresenter, T>()` |
| `DrawPresentationRequest` / `DrawPresentationDecision` / `DrawPresentationChannel` / `DrawPresentationPhase` | Presentation request, decision, channel and phase |

### Configuration & host (`SecRandom.Core.Abstraction`, `…Abstraction.Controls`)

| Contract | Description |
|----------|-------------|
| `IAppHost` | Static service location: `Host.Services`, `GetService<T>()` / `TryGetService<T>()` |
| `ConfigServiceBase` | Config read/write base: `IsConfigExists` / `LoadConfig` / `SaveConfig` / `DeleteConfig` |
| `ConfigHandlerBase<T>` | Config handler base: `Data`, `Reload` / `Save` / `Delete`, `Saved` event |
| `AttachedSettingsControlBase` / `AttachedSettingsControlBase<T>` | Attached settings control base: `Target`, `Settings` |
| `AttachedSettingsControlInfo` / `AttachedSettingsUsage` / `AttachedSettingsTargets` | Attributes describing an attached settings control and its targets (`Student` / `Prize` / `StudentList` / `PrizeList`) |
| `PageInfo` / `PageLocation` | Page registration attribute and page location enum (`Top` / `Bottom`); see [Plugin Entry Class](/en/dev/plugins/plugin-base) |

### Plugin SDK (`SecRandom.PluginSdk`)

| Contract | Description |
|----------|-------------|
| `PluginBase` | Plugin entry base class (see [Plugin Entry Class](/en/dev/plugins/plugin-base)) |
| `PluginInfo` / `PluginManifest` / `PluginDependency` / `PluginLoadStatus` / `PluginApiVersions` | Plugin information and manifest models (since 3.2 the manifest also has `Permissions`) |
| `PluginPermissionNames` | Convert between permission names and flags: `All` / `TryParse` / `Parse` / `Normalize` / `Describe` |
| `IPluginManager` | Loaded plugins, plugins directory, disable / uninstall, stage a package for install |

## ::lucide:list-checks:: Registering Extensions

Pages, algorithms and contribution points are all registered in `Initialize` through extension methods (`SecRandom.Core.Extensions.Registry`):

| Extension method | Description |
|------------------|-------------|
| `AddSettingsPage<T>(string name)` | Register a settings page; `T` must carry `[PageInfo]` |
| `AddMainPage<T>(string name)` | Register a main page (`T : UserControl`); `T` must carry `[PageInfo]` |
| `AddSettingsPageSeparator(PageLocation, bool isHide)` / `AddMainPageSeparator(PageLocation)` | Insert page separators |
| `AddGroup(PageGroupInfo)` | Register a page group |
| `AddAttachedSettingsControl<T>(string name)` | Register an attached settings control (`AttachedSettingsControlBase`) |
| `RegisterAttachedSettingsControl<T>(string name)` / `UnregisterAttachedSettingsControl<T>()` | Attach / detach an attached settings control at runtime, returning whether it succeeded |
| `AddRollCallAlgorithm<T>(string id, string name)` / `AddLotteryAlgorithm<T>(string id, string name)` | Register custom roll-call / lottery algorithms |
| `services.AddSingleton<I…, T>()` | The 3.2 contribution points are registered through ordinary dependency injection: `IUiContentContribution`, `IUiStyleContribution`, `IDrawResultPresenter`, `IDrawCandidateFilter`, `IDrawResultPostProcessor`, `IAppShutdownParticipant`, `IDrawAnimationContribution` |

::: tip Where to find usage examples
The SDK NuGet package ships only the assemblies without XML documentation, so the IDE shows signatures only; runnable examples for every extension point are in the `README.md` inside the SDK package (repository file `SecRandom.PluginSdk\README.md`), and the authoritative signatures live in the client source: `SecRandom.Core\Abstraction\` (contracts) and `SecRandom.PluginSdk\` (plugin base classes).
:::
