---
title: 插件基础知识
createTime: 2026/08/14
---

# ::lucide:graduation-cap:: 插件基础知识

本页介绍插件的加载流程、apiVersion 规则、页面注册与本地化，以及插件读写配置的方式。

## ::lucide:loader-circle:: 加载流程

桌面应用启动时，宿主按以下顺序处理插件：

1. 处理卸载标记：带 `.uninstall` 标记的插件目录在本次启动被移除（配置目录保留，见[卸载与配置语义](#卸载与配置语义)）。
2. 处理待安装包：`data/cache/plugin-packages` 下的 `.srpx` 包解压到 `data/plugins/<id>`，同 id 包会整目录替换以支持更新。
3. 发现插件：扫描 `data/plugins` 下各目录中的 `manifest.yml`，同时并入 `--epp` 指定的外部开发目录。
4. 校验清单并解析加载顺序：按 `dependencies` 拓扑排序，环或缺失的必需依赖会标记为加载失败。
5. 加载：为每个插件创建独立的 `PluginLoadContext`，从入口程序集查找唯一的非抽象 `PluginBase` 实现并调用 `Initialize`。

::: note 插件目录
- 已安装插件：`data/plugins/<id>`
- 待安装包：`data/cache/plugin-packages`
- 插件私有配置：`data/config/plugins/<id>`
:::

## ::lucide:tag:: apiVersion 与版本

- `manifest.yml` 的 `apiVersion` 声明插件目标宿主 API，主版本必须不低于宿主 `PluginApiVersions.Current.Major`（当前为 `3`）。不满足时插件会被拒绝加载。
- `apiVersion` 跟随应用主版本递增；`version` 是插件自身版本，两者相互独立。
- 插件包版本（`version`）用于市场中的更新判断；宿主安装包时以 `id` 为准，同 id 即视为更新。

## ::lucide:layout-grid:: 页面注册与本地化

插件可以注册设置页与主页面：

- 页面 id 遵循 `plugin.<id>.*` 命名空间，并在应用注册表内唯一。
- 通过 Core 扩展注册：`services.AddSettingsPage<T>(title)` / `services.AddMainPage<T>(title)`，并为页面类标注 `[PageInfo("plugin.<id>.xxx", Icon)]`。
- 注册在插件入口 `Initialize` 中进行，发生在宿主 Host 构建之前。

**本地化：**

- 用户可见字符串按"每页一个文件夹"维护 `Resources.resx`、`Resources.en-US.resx`、`Resources.ja-JP.resx`，简体中文、英文、日文三语齐全。
- 资源设计器使用 `PublicResXFileCodeGenerator`；项目文件中只注册 `Resources.resx` 与 `Resources.Designer.cs`。
- 切换应用语言后宿主会请求重启，重启后插件资源按 `CultureInfo.CurrentUICulture` 自动加载对应语言。插件不应假定固定文化，也不要将页面文本并入宿主共享资源桶。

## ::lucide:settings:: 配置

插件经 DI 注入 `MainConfigHandler` 读写主配置，或继承 `ConfigHandlerBase<T>` 管理自己的配置：

```csharp
public override void Initialize(HostBuilderContext context, IServiceCollection services)
{
    services.AddSingleton<MyPluginConfigHandler>();
}
```

- 集合类配置修改不会自动保存，需在变更后调用 `Save()`。
- 不要直接修改主配置的持久化路径；插件私有文件统一写入 `PluginConfigFolder`（即 `data/config/plugins/<id>`）。

## ::lucide:trash-2:: 卸载与配置语义

- 卸载：设置页卸载操作写入 `.uninstall` 标记，下次启动移除插件目录；**`data/config/plugins/<id>` 配置目录保留**。
- 启用/禁用：设置页开关写入 `.disabled` 标记，重启生效。
- 崩溃自动禁用：全局异常若堆栈归属某插件加载上下文，该插件自动写入 `.disabled`，下次启动不再加载。

## ::lucide:shield-alert:: 安全边界

插件在宿主进程内运行，**不是沙箱**：插件代码拥有与宿主相同的进程权限与数据访问能力。市场校验通过 SHA-256 与 Ed25519 签名保证发布物完整性，但进程内插件仍应被视为可信任代码。不要向不受信任来源的插件授予数据或凭据访问权。
