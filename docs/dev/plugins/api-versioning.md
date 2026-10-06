---
title: 插件 API 版本与兼容性
createTime: 2026/08/14
---

# ::lucide:git-branch:: 插件 API 版本与兼容性

本页说明 `apiVersion` 的判定规则，以及什么情况下插件需要重新编译。

## ::lucide:tag:: 两个版本号

| 字段 | 位置 | 说明 |
|------|------|------|
| `apiVersion` | `manifest.yml` | 插件针对的宿主插件 API 版本 |
| `version` | `manifest.yml` | 插件自身版本，市场用它判断更新 |

插件 API 版本由宿主的 `PluginApiVersions.Current` 定义，当前为 `3.2.0`（宿主插件 API 3.2），跟随应用主版本递增。

## ::lucide:circle-check:: 加载规则

宿主只比较**主版本号**：`apiVersion` 的主版本不能低于宿主的主版本，否则插件被拒绝加载，日志提示 `Plugin API version 2.0.0 is not supported; 3.0 or higher is required.`。

- 主版本相同即可：`3.0.0`、`3.1.0`、`3.2.0` 都能装进 3.x 宿主。
- 没有上界：声明 `4.0.0` 的插件也能被 3.x 宿主加载。
- 宿主升到 4.x 后，声明 `3.x` 的插件会被拒绝，需要发布 `apiVersion: 4.x` 的新版本。
- 插件市场还多一条 `minimumHostVersion`：宿主版本低于它时，插件标记为不兼容、不允许安装。

## ::lucide:refresh-cw:: 什么时候要重新编译

- **不用改**：宿主只是新增契约、新增可选参数或新增清单字段（例如新增 `virtual` 生命周期钩子、新增服务接口），老插件不受影响。
- **必须改**：宿主升大版本、已有契约签名变化，或旧字段语义改变。此时要更新 `apiVersion` 与 SDK 版本并重新编译，否则插件运行时会以 `MissingMethodException` / `TypeLoadException` 失败。

原因是插件包里的宿主程序集不会被加载：`SecRandom.PluginSdk`、`SecRandom.Core`、`SecRandom.Shared`、`Avalonia*`、`FluentAvalonia*`、`Microsoft.Extensions.*` 一律使用宿主自带的版本，包内同名 dll 会被忽略（见[插件依赖](/dev/plugins/dependency)）。

## ::lucide:list-checks:: 升级检查清单

1. 把 `manifest.yml` 的 `apiVersion` 对齐新宿主的主版本。
2. 更新 csproj 的 `SecRandom.PluginSdk` 包版本、`SecRandomPluginApiVersion` 与 `SecRandomClientRoot`。
3. 重新 `dotnet build -c Release` 打包 `.srpx`，再安装到客户端验证一次。
