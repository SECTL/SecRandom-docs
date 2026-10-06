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
| 既有 Core 契约 | `SecRandom.Core.Abstraction.Services` | `IProfileCatalogManager`、`IHistoryQueryService`、`IFeatureAvailabilityService`、`IVoiceAnnouncementService`、`ISpeechProvider`、`IViewEngine`、`IUiContributionService` / `IOverlayHostService` / `IResultPresentationService` 等 |

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
