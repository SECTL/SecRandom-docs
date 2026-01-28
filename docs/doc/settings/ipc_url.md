---
title: IPC & URL 协议
createTime: 2025/11/29 13:02:57
---
# SecRandom IPC & URL 协议完整列表

> **SecRandom IPC & URL 协议参考**
>
> 本页面提供了SecRandom软件支持的完整IPC和URL协议列表，通过这些协议可以快速访问软件的各个功能模块和执行特定操作。

## 概述

SecRandom 支持两种协议方式：
- **URL 协议**：通过 `secrandom://` 协议调用，适用于外部应用和浏览器
- **IPC 协议**：进程间通信，适用于编程集成和自动化脚本

**重要提示：**
- **返回值说明**：所有的返回值（包括执行结果和数据查询）**仅在 IPC 调用时可用**。
- **URL 协议限制**：通过系统 URL 协议（如浏览器或快捷方式）调用时，仅能触发动作，**无法获取任何返回值**。

SecRandom 采用统一的窗口管理入口，所有窗口操作均通过以下三个命令实现：
- `window/main` - 主窗口控制
- `window/settings` - 设置窗口控制
- `window/float` - 浮窗控制

## 全量命令总览表

| 命令组 | 命令 | 用途 | 是否只读 | 是否影响界面 |
|--------|------|------|----------|--------------|
| **窗口控制** | `window/main` | 主窗口控制 | 否 | 是 |
| | `window/settings` | 设置窗口控制 | 否 | 是 |
| | `window/float` | 浮窗控制 | 否 | 是 |
| **托盘功能** | `tray/toggle` | 切换显示 | 否 | 是 |
| | `tray/settings` | 打开设置 | 否 | 是 |
| | `tray/float` | 浮窗控制 | 否 | 是 |
| | `tray/restart` | 重启程序 | 否 | 是 |
| | `tray/exit` | 退出程序 | 否 | 是 |
| **点名控制** | `roll_call/quick_draw` | 快速点名 | 否 | 是 |
| | `roll_call/start` | 开始点名 | 否 | 是 |
| | `roll_call/stop` | 停止点名 | 否 | 是 |
| | `roll_call/reset` | 重置点名 | 否 | 是 |
| | `roll_call/set_count` | 设置点名人数 | 否 | 是 |
| | `roll_call/set_group` | 设置分组 | 否 | 是 |
| | `roll_call/set_gender` | 设置性别 | 否 | 是 |
| | `roll_call/set_list` | 设置名单 | 否 | 是 |
| **抽奖控制** | `lottery/start` | 开始抽奖 | 否 | 是 |
| | `lottery/stop` | 停止抽奖 | 否 | 是 |
| | `lottery/reset` | 重置抽奖 | 否 | 是 |
| | `lottery/set_count` | 设置抽奖人数 | 否 | 是 |
| | `lottery/set_pool` | 设置奖池 | 否 | 是 |
| | `lottery/set_range` | 设置范围 | 否 | 是 |
| | `lottery/set_gender` | 设置性别 | 否 | 是 |
| | `lottery/set_list` | 设置名单 | 否 | 是 |
| **数据获取** | `data/roll_call_list` | 获取点名名单 | 是 | 否 |
| | `data/lottery_list` | 获取抽奖名单 | 是 | 否 |
| | `data/roll_call_history` | 获取点名历史 | 是 | 否 |
| | `data/lottery_history` | 获取抽奖历史 | 是 | 否 |

## 通用参数

所有窗口命令均支持以下通用参数，用于控制窗口的显示行为：

### 动作参数

| 参数名 | 类型 | 可选值 | 说明 |
|--------|------|--------|------|
| `action` | string | `show` / `hide` / `toggle` | 控制窗口显示状态 |
| `mode` | string | `show` / `hide` / `toggle` | action 的别名，优先级相同 |
| `op` | string | `show` / `hide` / `toggle` | action 的别名，优先级相同 |
| `do` | string | `show` / `hide` / `toggle` | action 的别名，优先级相同 |
| `visible` | number | `1` / `0` | `1` 等价于 `show`，`0` 等价于 `hide` |

### 参数解析规则

1. **优先级**：`action` / `mode` / `op` / `do` / `visible` 优先级相同，按参数出现的顺序解析，后出现的参数会覆盖先出现的参数
2. **默认值**：不传任何动作参数时，默认执行 `toggle` 操作（当前显示则隐藏，否则显示）
3. **动作说明**：
   - `show` - 强制显示窗口
   - `hide` - 强制隐藏窗口
   - `toggle` - 切换窗口显示状态

### 参数使用示例

- `secrandom://window/main?action=show` - 显示主窗口
- `secrandom://window/main?visible=1` - 显示主窗口（使用 visible 参数）
- `secrandom://window/main?mode=hide` - 隐藏主窗口（使用 mode 别名）
- `secrandom://window/main` - 切换主窗口显示状态（默认 toggle）

## window/main

主窗口控制命令，用于控制主窗口的显示状态和切换页面。

### 参数表

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `action` | string | `show` / `hide` / `toggle` | 控制窗口显示状态 | `toggle` |
| `page` | string | 见下方页面列表 | 切换主窗口页面 | 不切换页面 |
| `page_name` | string | 同 `page` | page 的别名 | 同 `page` |
| `name` | string | 同 `page` | page 的别名 | 同 `page` |
| `value` | string | 同 `page` | page 的别名 | 同 `page` |

### 行为说明

1. **不传任何参数**：执行 toggle 操作，切换主窗口显示状态
2. **仅传动作参数**：执行指定动作（show/hide/toggle），不切换页面
3. **传 page 参数**：在执行动作的同时切换到指定页面
4. **page 参数别名**：`page` / `page_name` / `name` / `value` 优先级相同，后出现的参数会覆盖先出现的参数
5. **页面别名支持**：支持简写别名（如 `roll` → `roll_call_page`），详见页面列表

### 使用示例

- `secrandom://window/main` - 切换主窗口显示状态
- `secrandom://window/main?action=show` - 显示主窗口
- `secrandom://window/main?action=hide` - 隐藏主窗口
- `secrandom://window/main?action=toggle` - 切换主窗口显示状态
- `secrandom://window/main?page=roll_call_page` - 切换到点名页面
- `secrandom://window/main?page=lottery_page` - 切换到抽奖页面
- `secrandom://window/main?page=history_page` - 切换到历史记录页面
- `secrandom://window/main?action=show&page=roll_call_page` - 显示主窗口并切换到点名页面
- `secrandom://window/main?action=show&page=lottery` - 显示主窗口并切换到抽奖页面（使用别名）
- `secrandom://window/main?visible=1&page=history` - 显示主窗口并切换到历史记录页面（使用 visible 和别名）

## window/settings

设置窗口控制命令，用于控制设置窗口的显示状态和打开特定设置页面。

### 参数表

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `action` | string | `show` / `hide` / `toggle` | 控制窗口显示状态 | `toggle` |
| `page` | string | 见下方页面列表 | 打开指定设置页面 | `basicSettingsInterface` |
| `page_name` | string | 同 `page` | page 的别名 | 同 `page` |
| `name` | string | 同 `page` | page 的别名 | 同 `page` |
| `value` | string | 同 `page` | page 的别名 | 同 `page` |
| `preview` | boolean | `1` / `0` / `true` / `false` / `yes` / `no` / `on` / `off` | 是否以预览模式打开 | `false` |

### 行为说明

1. **不传任何参数**：执行 toggle 操作，打开设置窗口并显示基础设置页面
2. **仅传动作参数**：执行指定动作（show/hide/toggle），不切换页面
3. **传 page 参数**：在执行动作的同时打开指定设置页面
4. **preview 参数**：设置为真值（`1`/`true`/`yes`/`on`）时，以预览模式打开设置页面
5. **page 参数别名**：`page` / `page_name` / `name` / `value` 优先级相同，后出现的参数会覆盖先出现的参数

### 使用示例

- `secrandom://window/settings` - 切换设置窗口显示状态（默认打开基础设置）
- `secrandom://window/settings?action=show` - 显示设置窗口
- `secrandom://window/settings?action=hide` - 隐藏设置窗口
- `secrandom://window/settings?page=basicSettingsInterface` - 打开基础设置页面
- `secrandom://window/settings?page=listManagementInterface` - 打开列表管理页面
- `secrandom://window/settings?page=extractionSettingsInterface` - 打开抽取设置页面
- `secrandom://window/settings?page=basicSettingsInterface&preview=1` - 以预览模式打开基础设置
- `secrandom://window/settings?action=show&page=floatingWindowManagementInterface&preview=true` - 显示设置窗口并以预览模式打开浮窗管理
- `secrandom://window/settings?action=show&page=notificationSettingsInterface&preview=yes` - 显示设置窗口并以预览模式打开通知设置
- `secrandom://window/settings?action=show&page=safetySettingsInterface&preview=on` - 显示设置窗口并以预览模式打开安全设置
- `secrandom://window/settings?action=show&page=customSettingsInterface` - 显示设置窗口并打开自定义设置
- `secrandom://window/settings?action=show&page=voiceSettingsInterface&preview=1` - 显示设置窗口并以预览模式打开语音设置
- `secrandom://window/settings?action=show&page=historyInterface` - 显示设置窗口并打开历史记录设置
- `secrandom://window/settings?action=show&page=moreSettingsInterface&preview=true` - 显示设置窗口并以预览模式打开更多设置

## window/float

浮窗控制命令，用于控制浮窗的显示状态。

### 参数表

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `action` | string | `show` / `hide` / `toggle` | 控制浮窗显示状态 | `toggle` |
| `mode` | string | `show` / `hide` / `toggle` | action 的别名 | 同 `action` |
| `op` | string | `show` / `hide` / `toggle` | action 的别名 | 同 `action` |
| `do` | string | `show` / `hide` / `toggle` | action 的别名 | 同 `action` |
| `visible` | number | `1` / `0` | `1` 等价于 `show`，`0` 等价于 `hide` | - |

### 行为说明

1. **不传任何参数**：执行 toggle 操作，切换浮窗显示状态
2. **传动作参数**：执行指定动作（show/hide/toggle）
3. **浮窗不支持页面切换**：浮窗命令不支持 `page` 参数

### 使用示例

- `secrandom://window/float` - 切换浮窗显示状态
- `secrandom://window/float?action=show` - 显示浮窗
- `secrandom://window/float?action=hide` - 隐藏浮窗
- `secrandom://window/float?action=toggle` - 切换浮窗显示状态
- `secrandom://window/float?mode=show` - 显示浮窗（使用 mode 别名）
- `secrandom://window/float?op=hide` - 隐藏浮窗（使用 op 别名）
- `secrandom://window/float?visible=1` - 显示浮窗（使用 visible 参数）
- `secrandom://window/float?visible=0` - 隐藏浮窗（使用 visible 参数）

## tray/* 托盘功能命令

托盘功能命令用于控制托盘菜单的各项功能。

### 命令列表

| 命令 | 说明 |
|------|------|
| `tray/toggle` | 切换主界面显示状态 |
| `tray/settings` | 通过托盘打开设置 |
| `tray/float` | 切换浮窗显示状态 |
| `tray/restart` | 重启 SecRandom 程序 |
| `tray/exit` | 退出 SecRandom 程序 |

### 参数说明

#### tray/toggle

切换主界面显示状态命令。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "主界面显示状态已切换"
}
```

**使用示例**：
- `secrandom://tray/toggle` - 切换主界面显示状态

#### tray/settings

通过托盘打开设置命令。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "设置窗口已打开"
}
```

**使用示例**：
- `secrandom://tray/settings` - 通过托盘打开设置

#### tray/float

切换浮窗显示状态命令。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "浮窗显示状态已切换"
}
```

**使用示例**：
- `secrandom://tray/float` - 切换浮窗显示状态

#### tray/restart

重启 SecRandom 程序命令。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "程序正在重启"
}
```

**使用示例**：
- `secrandom://tray/restart` - 重启 SecRandom 程序

#### tray/exit

退出 SecRandom 程序命令。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "程序正在退出"
}
```

**使用示例**：
- `secrandom://tray/exit` - 退出 SecRandom 程序

## roll_call/* 点名控制命令

点名控制命令用于控制点名功能的启动、停止、重置以及设置点名参数。

### 命令列表

| 命令 | 说明 |
|------|------|
| `roll_call/quick_draw` | 快速点名（随机抽取一人） |
| `roll_call/start` | 开始点名 |
| `roll_call/stop` | 停止点名 |
| `roll_call/reset` | 重置点名状态 |
| `roll_call/set_count` | 设置点名人数 |
| `roll_call/set_group` | 设置分组 |
| `roll_call/set_gender` | 设置性别筛选 |
| `roll_call/set_list` | 设置点名名单 |

### 参数说明

#### roll_call/quick_draw

快速点名命令，无需参数，立即随机抽取一人。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名成功",
  "data": {
    "name": "张三",
    "id": "001"
  }
}
```

**使用示例**：
- `secrandom://roll_call/quick_draw` - 快速点名

#### roll_call/start

开始点名命令，启动点名流程。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名已开始"
}
```

**使用示例**：
- `secrandom://roll_call/start` - 开始点名

#### roll_call/stop

停止点名命令，停止当前正在进行的点名流程。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名已停止"
}
```

**使用示例**：
- `secrandom://roll_call/stop` - 停止点名

#### roll_call/reset

重置点名命令，重置点名状态和结果。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名已重置"
}
```

**使用示例**：
- `secrandom://roll_call/reset` - 重置点名

#### roll_call/set_count

设置点名人数命令，指定每次点名抽取的人数。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `count` | number | 正整数 | 点名人数 | 1 |
| `value` | number | 正整数 | count 的别名 | 同 `count` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名人数已设置为 3",
  "data": {
    "count": 3
  }
}
```

**使用示例**：
- `secrandom://roll_call/set_count?count=3` - 设置点名人数为 3
- `secrandom://roll_call/set_count?value=5` - 设置点名人数为 5（使用别名）

#### roll_call/set_group

设置分组命令，指定点名使用的分组。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `group` | string | 分组名称 | 分组名称 | 默认分组 |
| `group_name` | string | 分组名称 | group 的别名 | 同 `group` |
| `name` | string | 分组名称 | group 的别名 | 同 `group` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "分组已设置为 一班",
  "data": {
    "group": "一班"
  }
}
```

**使用示例**：
- `secrandom://roll_call/set_group?group=一班` - 设置分组为"一班"
- `secrandom://roll_call/set_group?group_name=二班` - 设置分组为"二班"（使用别名）

#### roll_call/set_gender

设置性别筛选命令，指定点名时的性别筛选条件。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `gender` | string | `all` / `male` / `female` | 性别筛选 | `all` |
| `value` | string | `all` / `male` / `female` | gender 的别名 | 同 `gender` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "性别筛选已设置为 male",
  "data": {
    "gender": "male"
  }
}
```

**使用示例**：
- `secrandom://roll_call/set_gender?gender=male` - 设置性别筛选为男性
- `secrandom://roll_call/set_gender?value=female` - 设置性别筛选为女性（使用别名）
- `secrandom://roll_call/set_gender?gender=all` - 设置性别筛选为全部

#### roll_call/set_list

设置点名名单命令，指定点名使用的名单。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `class_name` | string | 班级名称 | 班级名称 | 默认班级 |
| `list_name` | string | 名单名称 | class_name 的别名 | 同 `class_name` |
| `name` | string | 名单名称 | class_name 的别名 | 同 `class_name` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "点名名单已设置为 三年级一班",
  "data": {
    "list_name": "三年级一班"
  }
}
```

**使用示例**：
- `secrandom://roll_call/set_list?class_name=三年级一班` - 设置点名名单为"三年级一班"
- `secrandom://roll_call/set_list?list_name=三年级二班` - 设置点名名单为"三年级二班"（使用别名）

## lottery/* 抽奖控制命令

抽奖控制命令用于控制抽奖功能的启动、停止、重置以及设置抽奖参数。

### 命令列表

| 命令 | 说明 |
|------|------|
| `lottery/start` | 开始抽奖 |
| `lottery/stop` | 停止抽奖 |
| `lottery/reset` | 重置抽奖状态 |
| `lottery/set_count` | 设置抽奖人数 |
| `lottery/set_pool` | 设置奖池 |
| `lottery/set_range` | 设置抽奖范围 |
| `lottery/set_gender` | 设置性别筛选 |
| `lottery/set_list` | 设置抽奖名单 |

### 参数说明

#### lottery/start

开始抽奖命令，启动抽奖流程。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖已开始"
}
```

**使用示例**：
- `secrandom://lottery/start` - 开始抽奖

#### lottery/stop

停止抽奖命令，停止当前正在进行的抽奖流程。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖已停止"
}
```

**使用示例**：
- `secrandom://lottery/stop` - 停止抽奖

#### lottery/reset

重置抽奖命令，重置抽奖状态和结果。

**参数表**：无参数

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖已重置"
}
```

**使用示例**：
- `secrandom://lottery/reset` - 重置抽奖

#### lottery/set_count

设置抽奖人数命令，指定每次抽奖抽取的人数。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `count` | number | 正整数 | 抽奖人数 | 1 |
| `value` | number | 正整数 | count 的别名 | 同 `count` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖人数已设置为 3",
  "data": {
    "count": 3
  }
}
```

**使用示例**：
- `secrandom://lottery/set_count?count=3` - 设置抽奖人数为 3
- `secrandom://lottery/set_count?value=5` - 设置抽奖人数为 5（使用别名）

#### lottery/set_pool

设置奖池命令，指定抽奖使用的奖池。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `pool_name` | string | 奖池名称 | 奖池名称 | 默认奖池 |
| `pool` | string | 奖池名称 | pool_name 的别名 | 同 `pool_name` |
| `name` | string | 奖池名称 | pool_name 的别名 | 同 `pool_name` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "奖池已设置为 特等奖池",
  "data": {
    "pool_name": "特等奖池"
  }
}
```

**使用示例**：
- `secrandom://lottery/set_pool?pool_name=特等奖池` - 设置奖池为"特等奖池"
- `secrandom://lottery/set_pool?pool=一等奖池` - 设置奖池为"一等奖池"（使用别名）

#### lottery/set_range

设置抽奖范围命令，指定抽奖的索引范围。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `index` | number | 非负整数 | 范围索引 | 0 |
| `value` | number | 非负整数 | index 的别名 | 同 `index` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖范围已设置为索引 0",
  "data": {
    "index": 0
  }
}
```

**使用示例**：
- `secrandom://lottery/set_range?index=0` - 设置抽奖范围为索引 0
- `secrandom://lottery/set_range?value=1` - 设置抽奖范围为索引 1（使用别名）

#### lottery/set_gender

设置性别筛选命令，指定抽奖时的性别筛选条件。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `gender` | string | `all` / `male` / `female` | 性别筛选 | `all` |
| `value` | string | `all` / `male` / `female` | gender 的别名 | 同 `gender` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "性别筛选已设置为 male",
  "data": {
    "gender": "male"
  }
}
```

**使用示例**：
- `secrandom://lottery/set_gender?gender=male` - 设置性别筛选为男性
- `secrandom://lottery/set_gender?value=female` - 设置性别筛选为女性（使用别名）
- `secrandom://lottery/set_gender?gender=all` - 设置性别筛选为全部

#### lottery/set_list

设置抽奖名单命令，指定抽奖使用的名单。

**参数表**：

| 参数名 | 类型 | 可选值 | 说明 | 默认值 |
|--------|------|--------|------|--------|
| `class_name` | string | 班级名称 | 班级名称 | 默认班级 |
| `list_name` | string | 名单名称 | class_name 的别名 | 同 `class_name` |
| `name` | string | 名单名称 | class_name 的别名 | 同 `class_name` |

**返回值说明**：
```json
{
  "status": "success",
  "message": "抽奖名单已设置为 三年级一班",
  "data": {
    "list_name": "三年级一班"
  }
}
```

**使用示例**：
- `secrandom://lottery/set_list?class_name=三年级一班` - 设置抽奖名单为"三年级一班"
- `secrandom://lottery/set_list?list_name=三年级二班` - 设置抽奖名单为"三年级二班"（使用别名）

## data/* 数据获取命令（只读）

数据获取命令用于获取点名名单、抽奖名单、点名历史记录和抽奖历史记录。这些命令**不会修改任何设置或状态**，仅用于数据查询。

### 核心原则

**重要：只有 IPC 调用才会有返回结果（JSON 响应）**

- 只有 IPC 调用才会有返回结果（JSON 响应）
- 通过系统 URL 协议唤起（`secrandom://...`）只能触发动作，调用方无法同步读取任何返回数据
- 因此：所有 `data/*` 读取类命令，只能作为 IPC 请求来使用（否则没有意义）

### 如何通过 IPC 获取返回结果

要通过 IPC 获取 `data/*` 命令的返回结果，请发送请求并读取响应。

**Python 示例代码**：

```python
from app.common.IPC_URL import URLIPCHandler

ipc = URLIPCHandler("SecRandom", "secrandom")

resp = ipc.send_ipc_message_by_name({
    "type": "url",
    "payload": {
        "url": "data/roll_call_list?class_name=高一1班"  # 注意：这里使用IPC命令格式，不需要 secrandom:// 前缀
    }
})

# 顶层是 IPC 包裹
# resp -> {"success": True/False, "type": "url", "result": {...}} 或 {"success": False, "error": "..."}
print(resp)
```

**返回值结构说明**：

- **顶层字段**：`success`（是否成功）、`type`（类型）、`result`（业务结果）或 `error`（错误信息）
- **真正业务数据**：在 `resp["result"]` 中，这是 URL 命令处理器返回的字典

### 命令列表

| 命令 | 说明 |
|------|------|
| `data/roll_call_list` | 获取点名名单 |
| `data/lottery_list` | 获取抽奖名单 |
| `data/roll_call_history` | 获取点名历史 |
| `data/lottery_history` | 获取抽奖历史 |

### 参数说明

#### data/roll_call_list（获取点名名单）

**IPC 命令**：
- `data/roll_call_list?class_name=xxx`

**参数（query）**：

| 参数名 | 类型 | 必填 | 说明 | 兼容别名 |
|--------|------|------|------|----------|
| `class_name` | string | 是 | 班级名称 | `class` / `name` / `className` |

**成功返回（业务层 result）字段**：
```json
{
  "status": "success",
  "message": "点名名单获取成功",
  "class_name": "高一1班",
  "data": [
    {
      "id": "001",
      "name": "张三",
      "gender": "male"
    },
    {
      "id": "002",
      "name": "李四",
      "gender": "female"
    }
  ]
}
```

**缺参返回（业务层 result）**：
```json
{
  "status": "error",
  "message": "缺少参数: class_name"
}
```

#### data/lottery_list（获取抽奖名单）

**IPC 命令**：
- `data/lottery_list?pool_name=xxx`

**参数（query）**：

| 参数名 | 类型 | 必填 | 说明 | 兼容别名 |
|--------|------|------|------|----------|
| `pool_name` | string | 是 | 奖池名称 | `pool` / `name` / `poolName` |

**成功返回（业务层 result）字段**：
```json
{
  "status": "success",
  "message": "抽奖名单获取成功",
  "pool_name": "特等奖池",
  "data": [
    {
      "id": "001",
      "name": "张三",
      "gender": "male"
    },
    {
      "id": "002",
      "name": "李四",
      "gender": "female"
    }
  ]
}
```

**缺参返回（业务层 result）**：
```json
{
  "status": "error",
  "message": "缺少参数: pool_name"
}
```

#### data/roll_call_history（获取点名历史）

**IPC 命令**：
- `data/roll_call_history?class_name=xxx`

**参数（query）**：

| 参数名 | 类型 | 必填 | 说明 | 兼容别名 |
|--------|------|------|------|----------|
| `class_name` | string | 是 | 班级名称 | `class` / `name` / `className` |

**成功返回（业务层 result）字段**：
```json
{
  "status": "success",
  "message": "点名历史获取成功",
  "class_name": "高一1班",
  "data": [
    {
      "time": "2025-11-29 13:00:00",
      "students": [
        {
          "id": "001",
          "name": "张三"
        }
      ]
    }
  ]
}
```

**缺参返回（业务层 result）**：
```json
{
  "status": "error",
  "message": "缺少参数: class_name"
}
```

#### data/lottery_history（获取抽奖历史）

**IPC 命令**：
- `data/lottery_history?pool_name=xxx`

**参数（query）**：

| 参数名 | 类型 | 必填 | 说明 | 兼容别名 |
|--------|------|------|------|----------|
| `pool_name` | string | 是 | 奖池名称 | `pool` / `name` / `poolName` |

**成功返回（业务层 result）字段**：
```json
{
  "status": "success",
  "message": "抽奖历史获取成功",
  "pool_name": "特等奖池",
  "data": [
    {
      "time": "2025-11-29 13:00:00",
      "winners": [
        {
          "id": "001",
          "name": "张三",
          "prize": "特等奖"
        }
      ]
    }
  ]
}
```

**缺参返回（业务层 result）**：
```json
{
  "status": "error",
  "message": "缺少参数: pool_name"
}
```

## 页面列表

### 主窗口可切换页面列表

主窗口支持切换到以下页面，通过 `window/main?page=...` 参数指定：

| 页面标识 | 页面名称 | 说明 | 简写别名 |
|----------|----------|------|----------|
| `roll_call_page` | 点名页面 | 主窗口的点名功能页面 | `roll` |
| `lottery_page` | 抽奖页面 | 主窗口的抽奖功能页面 | `lottery` |
| `history_page` | 历史记录页面 | 主窗口的历史记录页面 | `history` |
| `settingsInterface` | 设置占位页 | 主窗口侧边栏"设置"占位页 | 无 |

**说明**：
- `main_window` 仅表示"显示主窗口"，不是一个可切换的子页面
- 使用简写别名可以简化调用，如 `page=roll` 等价于 `page=roll_call_page`
- 切换页面时会自动执行窗口显示动作（默认为 show）

### 设置窗口可打开页面列表

设置窗口支持打开以下页面，通过 `window/settings?page=...` 参数指定：

| 页面标识 | 页面名称 | 说明 |
|----------|----------|------|
| `basicSettingsInterface` | 基础设置 | SecRandom 的基础功能设置 |
| `listManagementInterface` | 列表管理 | 名单列表的管理和编辑 |
| `extractionSettingsInterface` | 抽取设置 | 点名和抽取的相关设置 |
| `floatingWindowManagementInterface` | 浮窗管理 | 浮窗的显示和行为设置 |
| `notificationSettingsInterface` | 通知设置 | 通知提示的相关设置 |
| `safetySettingsInterface` | 安全设置 | 安全和隐私相关设置 |
| `customSettingsInterface` | 自定义设置 | 用户自定义功能设置 |
| `voiceSettingsInterface` | 语音设置 | 语音播报相关设置 |
| `historyInterface` | 历史记录设置 | 历史记录管理和设置 |
| `moreSettingsInterface` | 更多设置 | 其他扩展设置 |
| `updateInterface` | 更新 | 软件更新相关页面 |
| `aboutInterface` | 关于 | 软件信息和版本说明 |

**说明**：
- 不传 `page` 参数时，默认打开 `basicSettingsInterface`（基础设置）
- 设置窗口页面不支持简写别名，必须使用完整的页面标识
- 配合 `preview=1` 参数可以以预览模式打开设置页面

## 迁移指南

旧版本（2.2.6以下版本）的 URL/IPC 协议入口已移除，请使用新的统一入口进行替换。

### 已移除的旧入口

以下旧入口已不再支持：
- `main/roll` → 已移除
- `main/lottery` → 已移除
- `main/` → 已移除
- `settings/basic` → 已移除
- `settings/list` → 已移除
- `settings/extraction` → 已移除
- `settings/floating` → 已移除
- `settings/notification` → 已移除
- `settings/safety` → 已移除
- `settings/custom` → 已移除
- `settings/voice` → 已移除
- `settings/history` → 已移除
- `settings/more` → 已移除
- `settings/update` → 已移除
- `settings/about` → 已移除
- `settings/` → 已移除

### 等价替换示例

| 旧入口 | 新入口（等价替换） |
|--------|-------------------|
| `secrandom://main/roll` | `secrandom://window/main?page=roll_call_page` |
| `secrandom://main/lottery` | `secrandom://window/main?page=lottery_page` |
| `secrandom://main/` | `secrandom://window/main` |
| `secrandom://settings/basic` | `secrandom://window/settings?page=basicSettingsInterface` |
| `secrandom://settings/list` | `secrandom://window/settings?page=listManagementInterface` |
| `secrandom://settings/extraction` | `secrandom://window/settings?page=extractionSettingsInterface` |
| `secrandom://settings/floating` | `secrandom://window/settings?page=floatingWindowManagementInterface` |
| `secrandom://settings/notification` | `secrandom://window/settings?page=notificationSettingsInterface` |
| `secrandom://settings/safety` | `secrandom://window/settings?page=safetySettingsInterface` |
| `secrandom://settings/custom` | `secrandom://window/settings?page=customSettingsInterface` |
| `secrandom://settings/voice` | `secrandom://window/settings?page=voiceSettingsInterface` |
| `secrandom://settings/history` | `secrandom://window/settings?page=historyInterface` |
| `secrandom://settings/more` | `secrandom://window/settings?page=moreSettingsInterface` |
| `secrandom://settings/update` | `secrandom://window/settings?page=updateInterface` |
| `secrandom://settings/about` | `secrandom://window/settings?page=aboutInterface` |
| `secrandom://settings/` | `secrandom://window/settings` |

## 常见问题

关于 IPC & URL 协议的常见问题解答，请查看：[IPC & URL 协议常见问题](../../faq/ipc-url-faq.md)

## 速查表

最常用的命令快速参考：

| 功能 | 命令 |
|------|------|
| 打开主窗口并切换到点名页面 | `secrandom://window/main?action=show&page=roll_call_page` |
| 打开设置窗口并显示基础设置 | `secrandom://window/settings?action=show&page=basicSettingsInterface` |
| 切换浮窗显示状态 | `secrandom://window/float` |
| 快速点名 | `secrandom://roll_call/quick_draw` |
| 开始点名 | `secrandom://roll_call/start` |
| 设置点名人数 | `secrandom://roll_call/set_count?count=3` |
| 开始抽奖 | `secrandom://lottery/start` |
| 设置抽奖人数 | `secrandom://lottery/set_count?count=5` |
| 重启程序 | `secrandom://tray/restart` |

## 使用示例

### URL 协议使用

**快捷方式创建**
1. 右键桌面 → 新建 → 快捷方式
2. 输入URL协议（如 `secrandom://window/main?action=show&page=roll_call_page`）
3. 命名快捷方式并完成创建

**批处理脚本**
```batch
@echo off
echo 正在启动SecRandom主界面...
start secrandom://window/main?action=show&page=roll_call_page
```

**浏览器调用**
```html
<a href="secrandom://window/main?action=show&page=roll_call_page">打开SecRandom点名页面</a>
```

### IPC 协议使用

**Python 示例**
完整的 Python 使用示例请参考：[secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)

**JavaScript 示例**
完整的 JavaScript 使用示例请参考：[secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

### 注意事项

1. **协议注册**：确保SecRandom已正确注册URL协议
2. **安全考虑**：只使用官方文档中列出的协议
3. **参数验证**：使用参数时确保参数值正确
4. **错误处理**：建议在使用协议时添加错误处理机制
5. **IPC通信**：IPC协议需要程序在运行状态才能使用
6. **数据只读**：`data/*` 命令不会修改任何数据，仅用于查询

### 故障排除

**协议无法打开**
- 检查SecRandom是否正确安装
- 重新安装软件以修复协议注册
- 检查系统安全软件是否阻止了协议调用
- 如以上因素均排除，则向开发者反馈bug

**IPC通信失败**
- 确认SecRandom程序正在运行
- 检查IPC服务是否正常启动
- 查看软件日志获取详细错误信息

**命令执行失败**
- 检查命令格式是否正确
- 确认参数值是否在允许范围内
- 查看返回的错误信息以定位问题

<style>
.config-card {
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.config-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px var(--vp-c-shadow-1);
}

.highlight {
  background: var(--vp-c-blue-soft);
  border-left: 4px solid var(--vp-c-blue-1);
}

.warning {
  background: var(--vp-c-yellow-soft);
  border-left: 4px solid var(--vp-c-yellow-1);
}

.theme {
  background: var(--vp-c-purple-soft);
  border-left: 4px solid var(--vp-c-purple-1);
}

.tip-box {
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin: 2rem 0;
  background: var(--vp-c-tip-soft);
  border-left: 4px solid var(--vp-c-tip-1);
}
</style>
