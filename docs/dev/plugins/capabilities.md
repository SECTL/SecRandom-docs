---
title: 能力面
createTime: 2026/08/14
---

# ::lucide:layers:: 能力面

宿主通过 `SecRandom.Core.Abstraction.Services` 下的稳定契约向插件暴露能力。插件只依赖 SDK 即可使用这些契约，实现由宿主在 `BuildHost()` 中注册。

## ::lucide:table:: 契约总览

| 契约 | 命名空间 | 说明 |
|------|----------|------|
| `IDrawerView` / `IMainView` / `ISettingsView` | `…Abstraction.Services.Views` | 打开/关闭宿主抽屉，按页面 id 导航主页面 / 设置页 |
| `IAppNavigationService` | `…Abstraction.Services` | 打开主窗口 / 设置窗口 / 快速抽奖窗口 |
| `IAppLifecycleService` / `IFloatingWindowButtonRegistry` | `…Abstraction.Services` | `AppStarted` / `AppStopping` 事件；运行时注册浮窗按钮 |
| `IPluginDrawService` | `…Abstraction.Services` | 受控抽奖 facade（见下文） |
| `IListQueryService` | `…Abstraction.Services.Data` | 只读查询名单与奖池快照 |
| `IPluginStorageFactory` / `IPluginStorage` | `…Abstraction.Services.Storage` | 在插件私有目录里读写文本 / 字节 / JSON |
| `INotificationService` / `IBusyIndicator` | `…Abstraction.Services.Notifications` | 通知、确认框、输入框与忙碌指示 |
| `IWindowService` / `IPopupService` | `…Abstraction.Services.Views` | 独立窗口 / 模态对话框 / 跨平台弹层 |
| `IUiScheduler` / `IAppShutdownParticipant` | `…Abstraction.Services.Threading` | UI 线程调度与退出清理 |
| `IPluginEventBus` | `…Abstraction.Services.Messaging` | 插件之间发布订阅，以及宿主事件 `HostEvents` |
| `IThemeTokenService` / `ILocalizationService` | `…Services.Theming` / `…Services.Localization` | 读宿主主题色板；注册插件自己的多语言字符串 |
| `IUiContributionService` / `IUiStyleService` / `IOverlayHostService` | `…Abstraction.Services.Views` | 插槽贡献、样式覆盖、宿主外壳上的浮层 |
| `IDrawPipelineService` / `IDrawAnimationContribution` | `…Services.Pipeline` / `…Services.Presentation` | 候选过滤、结果后处理与揭晓动画 |
| `IResultPresentationService` / `IDrawResultPresenter` | `…Abstraction.Services.Presentation` | 接管每轮抽签结果的呈现 |
| `ICapabilityService` | `…Abstraction.Services.Capabilities` | 查询宿主能力 id 与插件声明的权限 |
| `IPluginDiagnosticsService` | `…Abstraction.Services.Diagnostics` | 上报诊断信息、查看已加载插件 |
| `IPluginManager` | `SecRandom.PluginSdk` | 查询已加载插件与插件目录，禁用 / 卸载插件（见下文） |
| `IAppHost` | `SecRandom.Core.Abstraction` | 静态服务定位：`Host.Services`、`GetService<T>()` / `TryGetService<T>()` |
| 其余 Core 契约 | `SecRandom.Core.Abstraction` | 历史、语音、算法、配置等，见下方[完整契约清单](#完整契约清单) |

::: note 解析方式
在插件的 `Initialize` 中注册页面与服务即可，运行时可经构造函数注入，或用 `IAppHost.TryGetService<T>()` 解析上述契约（`GetService<T>()` 在服务缺失时会抛 `ArgumentException`）。
宿主 API 3.2 起可以先用 `ICapabilityService.Has("ui.contribution")` 判断能力是否存在，在老宿主上优雅降级。
注意：`Initialize` 执行时宿主 Host 还没构建（`IAppHost.Host` 为 `null`），此时只做注册；用到这些契约的运行时逻辑请放到 `OnAppStarted()` 之后。
:::

## ::lucide:puzzle:: 插件信息

`IPluginManager` 暴露宿主当前管理的插件列表；插件可以从 `IPluginManager.Plugins` 中按 `Manifest.EntranceAssembly` 找到自己。

```csharp
public sealed class PluginInfo
{
    public required PluginManifest Manifest { get; init; }      // 清单：id、名称、版本、apiVersion…
    public required string PluginFolderPath { get; init; }      // 插件所在目录
    public required string PluginConfigFolder { get; init; }    // 插件私有配置目录
    public PluginLoadStatus LoadStatus { get; internal set; }   // NotLoaded / Loaded / Disabled / Error
    public Exception? Exception { get; internal set; }          // 加载失败时的异常
    public bool IsEnabled { get; internal set; }
}
```

插件入口实例上可以直接读取自己的 `Info` 与 `PluginConfigFolder`（见[插件入口类](/dev/plugins/plugin-base)）。

## ::lucide:panel-left:: 视图与导航

抽屉内容类型为 `object`（Avalonia 控件），宿主决定如何呈现；没有可见的主/设置窗口时抽屉操作是空操作（no-op）。

```csharp
public interface IDrawerView
{
    void OpenDrawer(object content);
    void CloseDrawer();
    bool IsDrawerOpen { get; }
}
```

`IMainView.NavigateToPage(string id)` 按注册的主页面 id（`main.xxx`）导航；`ISettingsView.NavigateToPage(string id)` 按设置页 id（`settings.xxx`）导航，`NavigateToPreviewPage(string id)` 进入只读预览（预览是安全验证的产物，不会修改配置）。导航到未注册或不存在的 id 是空操作。

```csharp
public interface IAppNavigationService
{
    void OpenMainWindow(string? pageId = null);
    void OpenSettingsWindow(string? pageId = null);   // 保留宿主的安全授权流程
    void OpenQuickDraw();
}
```

## ::lucide:wand-sparkles:: 浮窗按钮

插件可以运行时注册浮窗按钮（不持久化到配置），用户在浮窗设置的多选框中选择要显示的插件按钮；浮窗刷新时会自动清理已消失的注册项。

```csharp
public sealed record FloatingWindowButtonDescriptor(string Id, string Icon, string Label, Action Click);
```

```csharp
floatingButtons.Register(new FloatingWindowButtonDescriptor(
    "secrandom.example.openMain", "AppsFilled", "示例按钮",
    () => navigation.OpenMainWindow()));
```

- `Id` 在应用注册表内必须唯一；`Icon` 是 Core 图标目录中的 Fluent 图标名。

## ::lucide:shuffle:: 受控抽奖

插件**不能**直接调用 `IDrawCommitService`、`IRollCallSession` / `ILotterySession` 或历史写入接口提交抽奖，否则会绕过课程联动限制、安全授权、公平性证明与临时记录过滤。一律使用 `IPluginDrawService`：

```csharp
public interface IPluginDrawService
{
    Task<PluginStudentDrawResult> DrawStudentsAsync(
        PluginStudentDrawRequest request, CancellationToken cancellationToken = default);

    Task<PluginLotteryDrawResult> DrawLotteryAsync(
        PluginLotteryDrawRequest request, CancellationToken cancellationToken = default);
}
```

宿主内部先经过课程联动协调器与安全授权，再复用内置点名/抽奖服务的验证与事务提交流水线，因此插件抽奖与内置抽奖在公平性、可复现证明与课程联动上完全一致。结果携带 `ProofId` / `DrawRoundId`。

```csharp
var result = await drawService.DrawStudentsAsync(
    new PluginStudentDrawRequest("班级名", Group: "第1组", Count: 2));
```

请求参数说明：

- `PluginStudentDrawRequest(ListName, Group, Gender, Count, CourseName)`：选择点名名单；空的组/性别表示全部；数量由宿主按剩余候选人数限制。
- `PluginLotteryDrawRequest(PrizePoolName, StudentListName, Group, Gender, Count, CourseName)`：选择奖池，可选学生名单用于分配中奖人；数量由宿主按剩余奖品数限制。

## ::lucide:activity:: 生命周期服务

`IAppLifecycleService` 提供 `AppStarted` / `AppStopping` 事件，供非入口服务在需要时监听。插件入口请直接覆写 `PluginBase.OnAppStarted()` / `OnAppStopping()`（见[插件入口类](/dev/plugins/plugin-base)）。

## ::lucide:gift:: 通知与配置

- 通知：`INotificationService` 提供通知、确认框与输入框（见下方【3.2 新增扩展点】）；插件页面里的轻量提示仍可直接用 Core 辅助方法（如 `this.ShowWarningToast(...)`）。
- 配置：插件经 DI 注入 `MainConfigHandler` 或继承 `ConfigHandlerBase<T>` 读写配置，私有文件写入 `PluginConfigFolder`（见[插件基础知识](/dev/plugins/basics)）。

## ::lucide:shield:: 权限与能力

宿主 API 3.2 起，插件可以在 `manifest.yml` 里声明自己要用什么（`permissions`）：

```yaml
permissions:
  - ui
  - storage
```

| 权限名 | 含义 |
|--------|------|
| `none` | 显式声明“什么都不用”；**不写 `permissions` = 未声明 = 全部允许** |
| `ui` | 往宿主界面里加东西（插槽、样式、叠加层） |
| `storage` | 使用插件私有存储 |
| `network` | 联网 |
| `clipboard.read` / `clipboard.write` | 读 / 写剪贴板 |
| `file.picker` | 让用户挑文件或目录 |
| `settings` | 读写插件自己的设置页与状态文件（注册设置页本身不受限） |
| `draw` | 经 `IPluginDrawService` 发起抽签 |
| `history` | 读历史记录 |
| `overlay` | 显示独立的窗口或弹层 |

名字忽略大小写，也忽略 `_`、`-`、`.`（`clipboard.read`、`clipboard_read`、`clipboardRead` 等价）；不认识的名字会被丢掉，而不是拒绝安装。这是**声明式策略、不是安全边界**（插件与宿主同进程、FullTrust 运行）。

运行时可以先查询再决定：

```csharp
var capabilities = IAppHost.GetService<ICapabilityService>();
if (capabilities.Has(HostCapabilities.UiContribution)) { /* 老宿主没有该能力时走降级分支 */ }
var permissions = capabilities.GetPermissions("com.example.plugin");   // IsDeclared / Permissions / Allows(...)
```

## ::lucide:sparkles:: 3.2 新增扩展点

以下契约都是宿主 API 3.2 新增的（只是新增，老插件不受影响，见[插件 API 版本与兼容性](/dev/plugins/api-versioning)）：

- **私有存储**：`IPluginStorageFactory` / `IPluginStorage` —— 在插件自己的配置目录里读写文本、字节与 JSON，路径越界（`..`、绝对路径）会抛 `UnauthorizedAccessException`。
- **名单只读查询**：`IListQueryService` —— 取名单 / 奖池快照（`StudentSnapshot` / `PrizeSnapshot`），不会切换宿主当前名单；`Changed` 在 UI 线程触发。
- **通知与忙碌指示**：`INotificationService`（通知、`ConfirmAsync`、`PromptAsync`）、`IBusyIndicator`（`Begin` 返回 `IDisposable`）。
- **窗口与弹层**：`IWindowService`（独立窗口 / 模态对话框）、`IPopupService`（有浮层就用浮层，否则退回窗口）。
- **UI 线程**：`IUiScheduler`（`Post` / `InvokeAsync` / `DelayAsync`，可选 `UiPriority`）；`IAppShutdownParticipant` 参与应用退出清理。
- **事件总线**：`IPluginEventBus` 发布订阅，宿主事件见 `HostEvents`（`DrawCompleted` / `PluginLoaded` / `ProfileChanged` / `ThemeChanged` / `AppStarted` / `AppStopping`）。
- **主题与本地化**：`IThemeTokenService` 读宿主色板（`TryGetColor` / `GetResource`）、`ILocalizationService` 注册插件自己的多语言字符串。
- **抽签管线**：`IDrawCandidateFilter` 在抽签前过滤候选（预览、证明与历史都覆盖过滤后的候选）；`IDrawResultPostProcessor` 在出结果后加备注、跳过宿主历史或呈现、固定轮次 id。
- **揭晓动画**：`IDrawAnimationContribution` 提供自定义揭晓动画供用户选择。
- **诊断**：`IPluginDiagnosticsService` 上报诊断信息，并可查询已加载插件。

每个扩展点的完整用法（含可运行示例）见 SDK 包内的 `README.md`，仓库对应文件为 `SecRandom.PluginSdk\README.md`。

## ::lucide:list:: 完整契约清单

`SecRandom.PluginSdk` 包依赖 `SecRandom.Core`，所以下列契约在编译期就能直接用，无需额外引用。

### 抽奖与历史（`…Abstraction.Services`）

| 契约 | 说明 |
|------|------|
| `IPluginDrawService` | 插件唯一的抽奖入口（见上文） |
| `PluginStudentDrawRequest` / `PluginStudentDrawResult` / `PluginLotteryDrawRequest` / `PluginLotteryDrawResult` | 抽奖请求与结果模型（结果含 `ProofId` / `DrawRoundId`） |
| `IHistoryQueryService` + `HistoryQueryItem` | 读取历史记录，不切换当前名单 |
| `IHistoryExportService` + `HistoryExportKind` / `HistoryExportFormat` / `HistoryExportSort` / `HistoryExportFilter` / `HistoryExportRequest` / `HistoryExportResult` / `HistoryExportLabels` | 把点名 / 抽奖历史导出成 xlsx / csv |
| `IDrawCommitService` + `StudentDrawCommit` / `LotteryDrawCommit`、`IRollCallSession`、`ILotterySession`、`IDrawTemporaryRecordService` | 宿主内部提交与临时记录流水线，**插件不得直接调用** |

### 名单、奖池与功能开关

| 契约 | 说明 |
|------|------|
| `IListQueryService` + `StudentListSnapshot` / `PrizeListSnapshot` / `StudentSnapshot` / `PrizeSnapshot` / `ListChangedEventArgs` | 只读查询名单与奖池快照；不会切换宿主当前名单 |
| `IProfileService` | 当前名单 / 奖池与历史的读写；**禁止调用 `Record*History`** |
| `IProfileCatalogManager` / `IProfileCatalogEditor` | 名单与奖池目录的枚举、增删、快照与导入导出（宿主内部为主） |
| `IFeatureAvailabilityService` | 查询功能开关（`IsLotteryEnabled`）、`Changed` 事件、`Refresh()` |

### 语音与自定义算法

| 契约 | 说明 |
|------|------|
| `IVoiceAnnouncementService` | 语音播报 |
| `ISpeechProvider` + `VoiceOption` / `SpeechSynthesisRequest` / `SpeechAudio` | 提供语音合成（枚举音色、产出音频） |
| `ISpeechAudioPlayer` | 播放合成出的音频 |
| `IRollCallAlgorithm` + `IRollCallAlgorithmRegistry` | 自定义点名算法：只产生带权候选池，不得选人或改状态；用 `AddRollCallAlgorithm<T>` 注册 |
| `ILotteryAlgorithm` + `ILotteryAlgorithmRegistry` | 自定义抽奖算法；用 `AddLotteryAlgorithm<T>` 注册 |

### 导航、生命周期与浮窗

| 契约 | 说明 |
|------|------|
| `IAppNavigationService` | 打开主窗口 / 设置窗口 / 快速抽奖窗口 |
| `IAppLifecycleService` | `AppStarted` / `AppStopping` 事件 |
| `IFloatingWindowButtonRegistry` + `FloatingWindowButtonDescriptor` | 运行时注册 / 注销浮窗按钮（不持久化） |

### 权限与能力（`…Abstraction.Services.Capabilities`）

| 契约 | 说明 |
|------|------|
| `ICapabilityService` | `HostApiVersion`、`Capabilities`、`Has(id)`、`GetPermissions(pluginId)`、`IsAllowed(pluginId, permission)` |
| `HostCapabilities` | 能力 id 常量：`draw.presenter`、`overlay.host`、`ui.contribution`、`ui.style`、`plugin.storage`、`list.query`、`notification`、`busy.indicator`、`ui.scheduler`、`window.service`、`popup.service`、`draw.pipeline`、`theme.tokens`、`localization`、`event.bus`、`diagnostics` |
| `PluginPermissions` / `PluginPermissionSet` / `PluginPermissionNames` | 权限位枚举、某个插件实际生效的权限、权限名与权限位的互转 |

### 存储与诊断

| 契约 | 说明 |
|------|------|
| `IPluginStorageFactory` / `IPluginStorage` | 在插件私有目录里读写文本 / 字节 / JSON，越界路径抛 `UnauthorizedAccessException` |
| `IPluginDiagnosticsService` + `PluginDiagnosticEntry` / `PluginRuntimeInfo` / `DiagnosticLevel` | 上报诊断信息，查询诊断条目与已加载插件信息 |

### 通知、窗口与 UI 线程

| 契约 | 说明 |
|------|------|
| `INotificationService` + `NotificationOptions` / `NotificationSeverity` | 通知、确认框、输入框 |
| `IBusyIndicator` | 忙碌指示：`Begin` 返回 `IDisposable`，最后一个释放时自动关闭 |
| `IWindowService` + `WindowRequest` / `WindowClosedEventArgs` | 独立窗口与模态对话框；复用同一个 `Id` 会激活已有窗口 |
| `IPopupService` + `PopupOptions` / `PopupHandle` / `PopupClosedEventArgs` | 跨平台弹层：有浮层用浮层，否则退回独立窗口 |
| `IUiScheduler` + `UiPriority` | UI 线程调度：`IsOnUiThread`、`Post`、`InvokeAsync`、`DelayAsync` |
| `IAppShutdownParticipant` | 应用退出时按 `Priority` 执行清理（总预算 5 秒） |

### 事件、主题与本地化

| 契约 | 说明 |
|------|------|
| `IPluginEventBus` / `HostEvents` | 插件之间发布订阅；宿主事件 `DrawCompleted` / `PluginLoaded` / `ProfileChanged` / `ThemeChanged` / `AppStarted` / `AppStopping` |
| `IThemeTokenService` + `ThemeKind` | 读宿主主题色板：`TryGetColor`、`GetColor`、`GetResource`、`Changed` |
| `ILocalizationService` | 注册并查询插件自己的多语言字符串（`GetForPlugin`） |

### 抽签管线与动画（`…Services.Pipeline` / `…Services.Presentation`）

| 契约 | 说明 |
|------|------|
| `IDrawCandidateFilter` + `DrawPipelineContext` / `DrawCandidateSet` | 抽签前过滤候选；预览、安全证明与历史都覆盖过滤后的候选 |
| `IDrawResultPostProcessor` + `DrawResultEdit` | 出结果后处理：加备注（`Note`）、跳过宿主历史 / 呈现、固定轮次 id |
| `IDrawPipelineService` | 管线服务本体（宿主调度过滤器与后处理器） |
| `IDrawAnimationContribution` + `DrawAnimationOption` / `DrawAnimationSelection` / `DrawAnimationStyleMode` | 提供自定义揭晓动画供用户选择 |

### UI 扩展点（`…Abstraction.Services.Views`）

| 契约 | 说明 |
|------|------|
| `IDrawerView` / `IMainView` / `ISettingsView` | 抽屉与页面导航（见上文） |
| `IUiContributionService` + `IUiContentContribution` / `UiSlotKind` / `UiSlotContext` / `HostUiSlots` | 往宿主命名插槽追加、前置、替换或隐藏内容 |
| `IUiStyleService` + `IUiStyleContribution` | 追加 Avalonia 样式与资源覆盖，实现整壳重着色 |
| `IOverlayHostService` + `OverlayOptions` / `OverlayClosedEventArgs` | 在宿主外壳上叠加自己的浮层，无需自建窗口 |
| `UiContentContributionBase` / `UiStyleContributionBase` | 只需要构造视觉时的便捷基类 |

### 结果呈现（`…Abstraction.Services.Presentation`）

| 契约 | 说明 |
|------|------|
| `IResultPresentationService` | 宿主的结果呈现调度点，可自行调用以重放或呈现自己算出的结果 |
| `IDrawResultPresenter` | 自定义每轮结果的呈现（`Priority` / `CanPresent` / `PresentAsync`）；用 `services.AddSingleton<IDrawResultPresenter, T>()` 注册 |
| `DrawPresentationRequest` / `DrawPresentationDecision` / `DrawPresentationChannel` / `DrawPresentationPhase` | 呈现请求、决策与通道、阶段 |

### 配置与宿主（`SecRandom.Core.Abstraction`、`…Abstraction.Controls`）

| 契约 | 说明 |
|------|------|
| `IAppHost` | 静态服务定位：`Host.Services`、`GetService<T>()` / `TryGetService<T>()` |
| `ConfigServiceBase` | 配置读写基类：`IsConfigExists` / `LoadConfig` / `SaveConfig` / `DeleteConfig` |
| `ConfigHandlerBase<T>` | 配置处理基类：`Data`、`Reload` / `Save` / `Delete`、`Saved` 事件 |
| `AttachedSettingsControlBase` / `AttachedSettingsControlBase<T>` | 附加设置控件基类：`Target`、`Settings` |
| `AttachedSettingsControlInfo` / `AttachedSettingsUsage` / `AttachedSettingsTargets` | 附加设置控件的描述特性与适用对象（`Student` / `Prize` / `StudentList` / `PrizeList`） |
| `PageInfo` / `PageLocation` | 页面注册特性与页面位置枚举（`Top` / `Bottom`），见[插件入口类](/dev/plugins/plugin-base) |

### 插件 SDK（`SecRandom.PluginSdk`）

| 契约 | 说明 |
|------|------|
| `PluginBase` | 插件入口基类（见[插件入口类](/dev/plugins/plugin-base)） |
| `PluginInfo` / `PluginManifest` / `PluginDependency` / `PluginLoadStatus` / `PluginApiVersions` | 插件信息与清单模型（3.2 起清单多了 `Permissions`） |
| `PluginPermissionNames` | 权限名与权限位互转：`All` / `TryParse` / `Parse` / `Normalize` / `Describe` |
| `IPluginManager` | 已加载插件、插件目录，禁用 / 卸载插件，暂存安装包 |

## ::lucide:list-checks:: 注册扩展

页面、算法与贡献点都在 `Initialize` 中用扩展方法注册（`SecRandom.Core.Extensions.Registry`）：

| 扩展方法 | 说明 |
|----------|------|
| `AddSettingsPage<T>(string name)` | 注册设置页；`T` 必须带 `[PageInfo]` |
| `AddMainPage<T>(string name)` | 注册主页面（`T : UserControl`）；`T` 必须带 `[PageInfo]` |
| `AddSettingsPageSeparator(PageLocation, bool isHide)` / `AddMainPageSeparator(PageLocation)` | 插入页面分隔项 |
| `AddGroup(PageGroupInfo)` | 注册页面分组 |
| `AddAttachedSettingsControl<T>(string name)` | 注册附加设置控件（`AttachedSettingsControlBase`） |
| `RegisterAttachedSettingsControl<T>(string name)` / `UnregisterAttachedSettingsControl<T>()` | 运行时挂上 / 摘掉附加设置控件，返回是否成功 |
| `AddRollCallAlgorithm<T>(string id, string name)` / `AddLotteryAlgorithm<T>(string id, string name)` | 注册自定义点名 / 抽奖算法 |
| `services.AddSingleton<I…, T>()` | 3.2 的贡献点用普通依赖注入注册：`IUiContentContribution`、`IUiStyleContribution`、`IDrawResultPresenter`、`IDrawCandidateFilter`、`IDrawResultPostProcessor`、`IAppShutdownParticipant`、`IDrawAnimationContribution` |

::: tip 用法示例在哪查
SDK NuGet 包只带程序集、不含 XML 说明，IDE 里只有签名；每个扩展点的可运行示例写在 SDK 包内的 `README.md`（仓库对应文件 `SecRandom.PluginSdk\README.md`），完整签名以客户端源码为准：`SecRandom.Core\Abstraction\`（契约）与 `SecRandom.PluginSdk\`（插件基类）。
:::
