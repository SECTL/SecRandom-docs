---
title: IPC & URL 协议常见问题
createTime: 2026/01/28 18:22:57
---
# IPC & URL 协议常见问题

> **SecRandom IPC & URL 协议常见问题解答**
>
> 本页面提供了SecRandom IPC和URL协议使用过程中的常见问题及解答。

## Q1: 传入未知的 action 参数会怎样？

如果传入的 `action` 参数值不是 `show`、`hide` 或 `toggle`，系统将忽略该参数并执行默认的 `toggle` 操作。

**示例**：
- `secrandom://window/main?action=invalid` - 将执行 toggle 操作（等同于 `secrandom://window/main`）

## Q2: 传入不存在的 page 参数会怎样？

如果传入的 `page` 参数值不在页面列表中，系统将忽略该参数，不执行页面切换，但仍会执行窗口显示动作。

**示例**：
- `secrandom://window/main?page=invalid_page` - 将执行默认的 toggle 操作，不切换页面
- `secrandom://window/settings?page=invalid_page` - 将执行默认的 toggle 操作，打开默认的基础设置页面

## Q3: visible 与 action 参数同时存在时如何处理？

`visible` 和 `action` 参数优先级相同，按参数出现的顺序解析，后出现的参数会覆盖先出现的参数。

**示例**：
- `secrandom://window/main?action=show&visible=0` - 最终执行 hide 操作（visible=0 覆盖了 action=show）
- `secrandom://window/main?visible=1&action=hide` - 最终执行 hide 操作（action=hide 覆盖了 visible=1）

## Q4: page 参数的多个别名同时存在时如何处理？

`page` / `page_name` / `name` / `value` 优先级相同，按参数出现的顺序解析，后出现的参数会覆盖先出现的参数。

**示例**：
- `secrandom://window/main?page=roll_call_page&name=lottery_page` - 最终切换到抽奖页面（name 覆盖了 page）
- `secrandom://window/settings?page=basicSettingsInterface&value=customSettingsInterface` - 最终打开自定义设置页面（value 覆盖了 page）

## Q5: preview 参数的值如何判断真假？

`preview` 参数支持多种真假值表示方式：

**真值（启用预览模式）**：`1`、`true`、`yes`、`on`
**假值（禁用预览模式）**：`0`、`false`、`no`、`off`、不传参数

**示例**：
- `secrandom://window/settings?page=basicSettingsInterface&preview=1` - 启用预览模式
- `secrandom://window/settings?page=basicSettingsInterface&preview=true` - 启用预览模式
- `secrandom://window/settings?page=basicSettingsInterface&preview=yes` - 启用预览模式
- `secrandom://window/settings?page=basicSettingsInterface&preview=on` - 启用预览模式
- `secrandom://window/settings?page=basicSettingsInterface&preview=0` - 禁用预览模式
- `secrandom://window/settings?page=basicSettingsInterface` - 禁用预览模式（默认）

## Q6: 浮窗是否支持 page 参数？

不支持。浮窗命令（`window/float`）仅支持动作参数（action/mode/op/do/visible），不支持 `page` 参数。

**错误示例**：
- `secrandom://window/float?page=roll_call_page` - page 参数将被忽略

## Q7: 如何在 IPC 协议中使用这些命令？

IPC 协议使用方式与 URL 协议相同，只需将协议头 `secrandom://` 替换为 IPC 路径即可。

**示例**：
- URL: `secrandom://window/main?action=show&page=roll_call_page`
- IPC: `window/main?action=show&page=roll_call_page`

完整的 IPC 使用示例请参考：
- [secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)
- [secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

## Q8: 数据获取命令是否会修改数据？

不会。所有 `data/*` 命令都是只读命令，不会修改任何设置或状态，仅用于查询数据。

## Q9: 点名和抽奖命令的参数别名有哪些？

点名和抽奖命令的参数别名遵循接口兼容策略，常见的别名包括：
- `count` / `value` - 设置人数
- `group` / `group_name` / `name` - 设置分组
- `gender` / `value` - 设置性别
- `class_name` / `list_name` / `name` - 设置名单
- `pool_name` / `pool` / `name` - 设置奖池
- `index` / `value` - 设置范围

具体支持的别名以接口兼容策略为准。
