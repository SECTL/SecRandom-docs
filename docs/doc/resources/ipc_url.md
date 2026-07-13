---
title: IPC & URL 协议
createTime: 2025/11/29 13:02:57
---

# SecRandom IPC & URL 协议

SecRandom 提供系统 URL 激活和当前用户本地 IPC 两种自动化入口。两者使用相同的命令路由、参数校验和安全授权。

## 使用前提

- 在基础设置中启用 `secrandom://` URL 协议注册后，系统才会将 URL 激活交给 SecRandom；该开关不影响已运行应用的本地 IPC 查询和控制。
- URL 激活是触发式调用，不返回数据。
- IPC 仅在 SecRandom 已运行时可用，使用当前用户的本地命名管道，不开放网络端口。
- 所有受保护的窗口、托盘、抽取和外部配置操作仍经过应用内安全验证；IPC 或 URL 不会绕过它。
- 旧版单向文本命令 `ShowMainWindow`、`Restart` 和 `Url:<uri>` 保留用于重复实例激活。新的自动化客户端应使用本页 JSON 请求/响应帧。

## URL 格式

```text
secrandom://<route>?<query>
```

- 路由和枚举参数不区分大小写。
- `action`、`mode`、`op`、`do`、`visible` 是同组别名；最后出现的有效参数生效。
- `page`、`page_name`、`name`、`value` 同样按最后出现者生效。
- 名单、奖池、分组名称保留原文并按当前可用选项匹配。
- 请求最大 8 KiB，最多 32 个查询参数，单个值最大 1024 字符。无效百分号编码、控制字符、用户信息、端口或 URL 片段会被拒绝。

窗口动作：`show`、`hide`、`toggle`；`visible=1` 等同 `show`，`visible=0` 等同 `hide`。未提供动作参数时为 `toggle`，但 `window/main` 提供页面时默认 `show`。

## IPC 帧

当前用户命名管道名为 `SecRandom_IPC_SecRandom_3F2A1B0E`。每个连接发送一行 UTF-8 JSON 请求并读取一行 JSON 响应：

```json
{
  "version": 1,
  "type": "url",
  "payload": {
    "url": "data/roll_call_list?name=%E4%B8%80%E7%8F%AD"
  }
}
```

`version` 为 `1`。为兼容早期 `type: "url"` 客户端，缺失该字段也会按 v1 处理；新客户端应始终发送它。

成功操作：

```json
{
  "success": true,
  "type": "url",
  "result": {
    "status": "success",
    "message": "点名名单获取成功",
    "data": []
  }
}
```

业务失败仍会返回协议有效的响应，`result.status` 为 `error`，并在 `result.code` 给出机器可读错误码。传输、帧格式或服务不可用错误使用顶层 `success: false` 和 `error`。

常见错误码：`invalid_request`、`invalid_command`、`invalid_parameter`、`missing_parameter`、`authorization_denied`、`not_found`、`invalid_state`、`protocol_disabled`、`pipe_unavailable`、`timeout`。

Windows PowerShell 示例：

```powershell
$pipe = [System.IO.Pipes.NamedPipeClientStream]::new('.', 'SecRandom_IPC_SecRandom_3F2A1B0E', [System.IO.Pipes.PipeDirection]::InOut)
$pipe.Connect(3000)
$writer = [System.IO.StreamWriter]::new($pipe)
$reader = [System.IO.StreamReader]::new($pipe)
$request = @{ version = 1; type = 'url'; payload = @{ url = 'data/roll_call_list?name=一班' } } | ConvertTo-Json -Compress
$writer.WriteLine($request); $writer.Flush()
$reader.ReadLine()
```

## 命令总览

| 命令组 | 命令 |
|---|---|
| 窗口 | `window/main`、`window/settings`、`window/float` |
| 托盘 | `tray/toggle`、`tray/settings`、`tray/float`、`tray/restart`、`tray/exit` |
| 点名 | `roll_call/quick_draw`、`roll_call/start`、`roll_call/stop`、`roll_call/reset`、`roll_call/set_count`、`roll_call/set_group`、`roll_call/set_gender`、`roll_call/set_list` |
| 抽奖 | `lottery/start`、`lottery/stop`、`lottery/reset`、`lottery/set_count`、`lottery/set_pool`、`lottery/set_list`、`lottery/set_group`、`lottery/set_gender` |
| 只读数据 | `data/roll_call_list`、`data/lottery_list`、`data/roll_call_history`、`data/lottery_history` |

`window/timer` 已移除，调用会返回 `invalid_command`。旧的 `lottery/set_range` 也已移除；请使用 `lottery/set_group`。

## 窗口与托盘

### `window/main`

- `page` 别名：`roll_call_page` / `roll`、`lottery_page` / `lottery`、`history_page` / `history`。
- 示例：`secrandom://window/main?action=show&page=roll`。

### `window/settings`

- 默认目标为基础设置；旧 `secrandom://settings` 及 `settings/basic`、`settings/list`、`settings/extraction`、`settings/floating`、`settings/notification`、`settings/safety`、`settings/custom`、`settings/voice`、`settings/history`、`settings/more`、`settings/update`、`settings/about` 仍受支持，并默认执行 `show`。
- 页面标识：

| 外部标识 | 当前页面 |
|---|---|
| `basicSettingsInterface` | `settings.general.basic` |
| `listManagementInterface` | `settings.listManagement.rollCallList` |
| `extractionSettingsInterface` | `settings.picking.default` |
| `floatingWindowManagementInterface` | `settings.personalized.floatingWindow` |
| `notificationSettingsInterface` | `settings.notification.legacy` |
| `safetySettingsInterface` | `settings.general.security` |
| `customSettingsInterface`、`moreSettingsInterface` | `settings.more` |
| `voiceSettingsInterface` | `settings.notification.voiceMusic` |
| `historyInterface` | `settings.history.management` |
| `updateInterface` | `settings.update` |
| `aboutInterface` | `settings.about` |

当“打开设置”受到安全保护且“允许只读预览设置”已启用时，验证窗口提供“预览”选项。预览会打开指定页面，但冻结页面内容，保留导航可用；它不会执行受保护动作或写入配置。`preview` 查询参数不会绕过安全验证。

### `window/float`

仅支持窗口动作，不支持页面参数。示例：`secrandom://window/float?visible=0`。

### `tray/*`

- `tray/toggle` 切换主窗口。
- `tray/settings` 显示设置窗口。
- `tray/float` 切换浮窗。
- `tray/restart` 重启应用。
- `tray/exit` 退出应用。

## 点名与抽奖

### 点名

- `roll_call/start` 启动点名并立即返回 `{ "state": "running" }`；手动停止动画由 `roll_call/stop` 停止滚动后提交本轮结果，与页面中的“停止”按钮一致。
- `roll_call/quick_draw` 等待单次闪抽完成，成功时返回 `{ id, name, gender }`。
- `roll_call/reset` 清除当前临时记录和显示结果，不清除持久化历史。
- `roll_call/set_count?count=3` 设置人数。`value` 是别名；人数必须在当前可抽范围内。
- `roll_call/set_group?group=第一组` 设置分组；`group_name`、`name` 是别名，`all` 选择全部。
- `roll_call/set_gender?gender=...` 设置性别；`value` 是别名。`all` 选择全部，`male` / `female` 是男女快捷别名；也可直接传入当前名单中已有的任意自定义性别值，例如 `non-binary` 或 `未填写`。
- `roll_call/set_list?class_name=一班` 设置名单；`class`、`className`、`list_name`、`name`、`value` 是别名，也可使用 `list_index` / `index` 指定当前选项索引。

### 抽奖

- `lottery/start`、`lottery/stop`、`lottery/reset` 与点名具有相同的运行/停止滚动/临时记录语义。
- `lottery/set_count?count=3`、`lottery/set_pool?pool_name=奖池`、`lottery/set_list?class_name=一班` 分别设置抽取人数、奖池和学生分配名单。人数接受 `draw_count` 别名；奖池可用 `poolName` / `value` 或 `pool_index` / `index`，学生名单可用 `class` / `className` / `value` 或 `list_index` / `index`。
- `lottery/set_group?group=第一组` 取代旧 `lottery/set_range`。它只在已经通过 `lottery/set_list` 选择学生分配名单时有效，否则返回 `invalid_state`。
- `lottery/set_gender?gender=...` 仅对学生分配筛选有效。它支持 `all`、`male`、`female` 快捷别名，以及已在所选学生名单中定义的任意自定义性别值。

外部配置命令遵循安全设置中的“联动操作”保护；抽取开始与重置分别遵循各自的抽取保护开关。

## 只读数据查询

`data/*` 仅供 IPC 使用。系统 URL 调用不会读取或返回数据。IPC 查询直接读取独立的 JSON 快照，不会切换当前名单/奖池、创建缺失文件、规范化 `RecordId` 或修改临时记录。

| 命令 | 必填名称参数 | 返回 data |
|---|---|---|
| `data/roll_call_list` | `class_name` / `class` / `name` / `list_name` | `{ id, name, gender }[]` |
| `data/lottery_list` | `pool_name` / `pool` / `name` | `{ id, name, gender }[]` |
| `data/roll_call_history` | `class_name` / `class` / `name` / `list_name` | `{ time, students }[]` |
| `data/lottery_history` | `pool_name` / `pool` / `name` | `{ time, winners }[]` |

历史响应优先按持久化 `draw_round_id` 聚合同一轮多人结果；旧记录在无该字段时按时间和抽取元数据保守归并。内部 `RecordId` 不会暴露给 IPC。

## 安全与故障排除

- `authorization_denied` 表示用户取消验证、验证失败，或安全策略拒绝操作。
- `not_found` 表示名单、奖池或历史快照不存在或无法安全读取。
- `invalid_state` 表示当前没有可抽记录、抽取正在运行，或抽奖未选择学生分配名单。
- `pipe_unavailable` 表示应用未运行、尚未完成启动或不属于当前用户。
- URL 协议无法打开时，检查基础设置中的 URL 协议开关和操作系统关联；IPC 无法连接时，先启动 SecRandom。
