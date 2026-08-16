---
title: 插件入口类
createTime: 2026/08/14
---

# ::lucide:plug:: 插件入口类

插件入口是程序集中唯一继承 `PluginBase` 的非抽象类，由清单文件 `entranceAssembly` 指向的程序集提供。

## ::lucide:code:: PluginBase

```csharp
public abstract class PluginBase : IAsyncDisposable
{
    // 插件信息与私有配置目录，由宿主注入
    public PluginInfo Info { get; }
    public string PluginConfigFolder { get; }

    // 在宿主 Host 构建前注册插件服务与 Core 扩展（抽象方法，必须实现）
    public abstract void Initialize(HostBuilderContext context, IServiceCollection services);

    // 宿主完成启动后调用，可在此初始化需要 Host 与 UI 就绪的运行时状态
    public virtual void OnAppStarted();

    // 宿主关闭前调用，先于 DisposeAsync；可在此停止后台任务或刷新状态
    public virtual void OnAppStopping();

    // 宿主停机时释放插件，可覆盖以清理定时器、IPC 或文件
    public virtual ValueTask DisposeAsync();
}
```

## ::lucide:code-2:: Initialize

`Initialize` 在宿主 Host 构建之前执行，是插件唯一的注册入口。此时可以：

- 注册插件服务：`services.AddSingleton<T>()` 等；
- 注册页面：`services.AddSettingsPage<T>()` / `services.AddMainPage<T>()`；
- 注册 Core 扩展，例如附加设置控件 `services.AddAttachedSettingsControl<T>()`。

```csharp
public sealed class Plugin : PluginBase
{
    public override void Initialize(HostBuilderContext context, IServiceCollection services)
    {
        services.AddSettingsPage<ExampleSettingsPage>("ExamplePlugin");
        services.AddSingleton<MyService>();
    }
}
```

::: note 尽早注册浮窗按钮
浮窗按钮等能力应在 `Initialize` 中完成注册（宿主 Host 构建前）。运行时只需把实例注册进 DI，宿主会负责装配。
:::

## ::lucide:activity:: 应用生命周期

在 `PluginBase` 上覆写 `OnAppStarted()` / `OnAppStopping()` 即可获得应用生命周期，宿主会把 `AppStarted` / `AppStopping` 事件转发到每个插件入口，**无需再注册单独的 hosted service**。

```csharp
public sealed class Plugin : PluginBase
{
    public override void OnAppStarted()
    {
        // 宿主已完成启动，Host 与 UI 已就绪。
    }

    public override void OnAppStopping()
    {
        // 宿主即将关闭，先于 DisposeAsync。
    }

    public override async ValueTask DisposeAsync()
    {
        await _timer?.DisposeAsync();
    }
}
```

- 插件注册的 `IHostedService` 会随宿主 `StopAsync` 停止。
- 只有非入口服务需要监听应用事件时，才注入 `IAppLifecycleService`（见[能力面](/dev/plugins/capabilities)）。

## ::lucide:git-branch:: 注册的服务

入口实例本身也会注册进 DI（同时注册 `PluginBase` 与其具体类型），插件注册的页面与服务随后在应用运行时从同一 Host 解析。
