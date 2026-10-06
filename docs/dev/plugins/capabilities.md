---
title: 能力面
createTime: 2026/08/14
---

# ::lucide:layers:: 能力面

宿主通过 `SecRandom.Core.Abstraction.Services` 下的稳定契约向插件暴露能力。插件只依赖 SDK 即可使用这些契约，实现由宿主在 `BuildHost()` 中注册。

## ::lucide:table:: 契约总览

| 契约 | 命名空间 | 说明 |
|------|----------|------|
| `IDrawerView` | `SecRandom.Core.Abstraction.Services.Views` | 打开/关闭宿主抽屉（右侧 Drawer），查询开关状态 |
| `IMainView` | `SecRandom.Core.Abstraction.Services.Views` | 继承 `IDrawerView`，按页面 id 导航主页面 |
| `ISettingsView` | `SecRandom.Core.Abstraction.Services.Views` | 继承 `IDrawerView`，按页面 id 导航设置页，并支持进入只读预览 |
| `IAppNavigationService` | `SecRandom.Core.Abstraction.Services` | 打开主窗口 / 设置窗口 / 快速抽奖窗口 |
| `IAppLifecycleService` | `SecRandom.Core.Abstraction.Services` | `AppStarted` / `AppStopping` 事件 |
| `IFloatingWindowButtonRegistry` | `SecRandom.Core.Abstraction.Services` | 运行时注册浮窗按钮 |
| `IPluginDrawService` | `SecRandom.Core.Abstraction.Services` | 受控抽奖 facade（见下文） |
| `IPluginManager` | `SecRandom.PluginSdk` | 查询已加载插件与插件目录，禁用 / 卸载插件（见下文） |
| `IAppHost` | `SecRandom.Core.Abstraction` | 静态服务定位：`Host.Services`、`GetService<T>()` / `TryGetService<T>()` |
| 其余 Core 契约 | `SecRandom.Core.Abstraction` | 名单、历史、语音、UI 插槽、主题、叠加层、结果呈现等，见下方[完整契约清单](#完整契约清单) |

::: note 解析方式
在插件的 `Initialize` 中注册页面与服务即可，运行时可经构造函数注入，或用 `IAppHost.TryGetService<T>()` 解析上述契约（`GetService<T>()` 在服务缺失时会抛 `ArgumentException`）。
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

## ::lucide:gift:: Toast 与配置

- Toast：不需要新增服务级 API。插件页面使用现有 Core 提示辅助（如 `this.ShowWarningToast(...)`），控件事件会冒泡到 `AppToastAdorner`。
- 配置：插件经 DI 注入 `MainConfigHandler` 或继承 `ConfigHandlerBase<T>` 读写配置，私有文件写入 `PluginConfigFolder`（见[插件基础知识](/dev/plugins/basics)）。

## ::lucide:list:: 完整契约清单

`SecRandom.PluginSdk` 包依赖 `SecRandom.Core`，所以下列契约在编译期就能直接用，无需额外引用。

### 抽奖与历史（`SecRandom.Core.Abstraction.Services`）

| 契约 | 说明 |
|------|------|
| `IPluginDrawService` | 插件唯一的抽奖入口（见上文） |
| `PluginStudentDrawRequest` / `PluginStudentDrawResult` / `PluginLotteryDrawRequest` / `PluginLotteryDrawResult` | 抽奖请求与结果模型 |
| `IHistoryQueryService` | 读取历史记录，不切换当前名单 |
| `IHistoryExportService` + `HistoryExportKind` / `HistoryExportFormat` / `HistoryExportSort` / `HistoryExportFilter` / `HistoryExportRequest` / `HistoryExportResult` / `HistoryExportLabels` | 把点名/抽奖历史导出成 xlsx / csv |
| `IDrawCommitService` + `StudentDrawCommit` / `LotteryDrawCommit`、`IRollCallSession`、`ILotterySession`、`IDrawTemporaryRecordService` | 宿主抽奖提交与临时记录流水线，**插件不得直接调用** |

### 名单、课程与功能开关

| 契约 | 说明 |
|------|------|
| `IProfileService` | 当前名单/奖池与历史的读写；**禁止调用 `Record*History`** |
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

### UI 扩展点（`SecRandom.Core.Abstraction.Services.Views`）

| 契约 | 说明 |
|------|------|
| `IDrawerView` / `IMainView` / `ISettingsView` | 抽屉与页面导航（见上文） |
| `IUiContributionService` + `IUiContentContribution` / `UiSlotKind` / `UiSlotContext` / `HostUiSlots` | 往宿主命名插槽追加、前置、替换或隐藏内容 |
| `IUiStyleService` + `IUiStyleContribution` | 追加 Avalonia 样式与资源覆盖，实现整壳重着色 |
| `IOverlayHostService` + `OverlayOptions` / `OverlayClosedEventArgs` | 在宿主外壳上叠加自己的浮层，无需自建窗口 |
| `UiContentContributionBase` / `UiStyleContributionBase` | 只需要构造视觉时的便捷基类 |

### 结果呈现（`SecRandom.Core.Abstraction.Services.Presentation`）

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

### 插件 SDK（`SecRandom.PluginSdk`）

| 契约 | 说明 |
|------|------|
| `PluginBase` | 插件入口基类（见[插件入口类](/dev/plugins/plugin-base)） |
| `PluginInfo` / `PluginManifest` / `PluginDependency` / `PluginLoadStatus` / `PluginApiVersions` | 插件信息与清单模型 |
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
| `AddRollCallAlgorithm<T>(string id, string name)` / `AddLotteryAlgorithm<T>(string id, string name)` | 注册自定义点名 / 抽奖算法 |
| `services.AddSingleton<I…, T>()` | 注册贡献点：`IUiContentContribution`、`IUiStyleContribution`、`IDrawResultPresenter` 等 |

::: tip 成员签名在哪查
SDK NuGet 包只带程序集、不含 XML 说明，IDE 里只有签名。完整签名以客户端源码为准：`SecRandom.Core\Abstraction\`（契约）与 `SecRandom.PluginSdk\`（插件基类）。
:::
