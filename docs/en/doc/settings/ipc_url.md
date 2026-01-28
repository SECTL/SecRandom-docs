---
title: IPC & URL Protocol
createTime: 2025/11/29 13:02:57
---
# SecRandom IPC & URL Protocol Complete List

> **SecRandom IPC & URL Protocol Reference**
>
> This page provides a complete list of IPC and URL protocols supported by SecRandom software. Through these protocols, you can quickly access various functional modules of the software and perform specific operations.

## Overview

SecRandom supports two protocol types:
- **URL Protocol**: Invoked through `secrandom://` protocol, suitable for external applications and browsers
- **IPC Protocol**: Inter-process communication, suitable for programming integration and automation scripts

**Important Notes:**
- **Return Value Description**: All return values (including execution results and data queries) are **only available during IPC calls**.
- **URL Protocol Limitation**: When invoked through system URL protocol (such as browser or shortcut), it can only trigger actions, **and cannot retrieve any return values**.

SecRandom adopts a unified window management entry. All window operations are implemented through the following three commands:
- `window/main` - Main window control
- `window/settings` - Settings window control
- `window/float` - Floating window control

## Complete Command Overview Table

| Command Group | Command | Purpose | Read-Only | Affects Interface |
|---------------|---------|---------|-----------|-------------------|
| **Window Control** | `window/main` | Main window control | No | Yes |
| | `window/settings` | Settings window control | No | Yes |
| | `window/float` | Floating window control | No | Yes |
| **Tray Functions** | `tray/toggle` | Toggle display | No | Yes |
| | `tray/settings` | Open settings | No | Yes |
| | `tray/float` | Floating window control | No | Yes |
| | `tray/restart` | Restart program | No | Yes |
| | `tray/exit` | Exit program | No | Yes |
| **Roll Call Control** | `roll_call/quick_draw` | Quick roll call | No | Yes |
| | `roll_call/start` | Start roll call | No | Yes |
| | `roll_call/stop` | Stop roll call | No | Yes |
| | `roll_call/reset` | Reset roll call | No | Yes |
| | `roll_call/set_count` | Set roll call count | No | Yes |
| | `roll_call/set_group` | Set group | No | Yes |
| | `roll_call/set_gender` | Set gender filter | No | Yes |
| | `roll_call/set_list` | Set roll call list | No | Yes |
| **Lottery Control** | `lottery/start` | Start lottery | No | Yes |
| | `lottery/stop` | Stop lottery | No | Yes |
| | `lottery/reset` | Reset lottery | No | Yes |
| | `lottery/set_count` | Set lottery count | No | Yes |
| | `lottery/set_pool` | Set prize pool | No | Yes |
| | `lottery/set_range` | Set range | No | Yes |
| | `lottery/set_gender` | Set gender filter | No | Yes |
| | `lottery/set_list` | Set lottery list | No | Yes |
| **Data Retrieval** | `data/roll_call_list` | Get roll call list | Yes | No |
| | `data/lottery_list` | Get lottery list | Yes | No |
| | `data/roll_call_history` | Get roll call history | Yes | No |
| | `data/lottery_history` | Get lottery history | Yes | No |

## Common Parameters

All window commands support the following common parameters for controlling window display behavior:

### Action Parameters

| Parameter Name | Type | Optional Values | Description |
|----------------|------|-----------------|-------------|
| `action` | string | `show` / `hide` / `toggle` | Control window display state |
| `mode` | string | `show` / `hide` / `toggle` | Alias for action, same priority |
| `op` | string | `show` / `hide` / `toggle` | Alias for action, same priority |
| `do` | string | `show` / `hide` / `toggle` | Alias for action, same priority |
| `visible` | number | `1` / `0` | `1` is equivalent to `show`, `0` is equivalent to `hide` |

### Parameter Parsing Rules

1. **Priority**: `action` / `mode` / `op` / `do` / `visible` have the same priority. Parameters are parsed in the order they appear, and later parameters will override earlier ones
2. **Default Value**: When no action parameters are passed, the default `toggle` operation is executed (hide if currently displayed, otherwise show)
3. **Action Description**:
   - `show` - Force window to show
   - `hide` - Force window to hide
   - `toggle` - Toggle window display state

### Parameter Usage Examples

- `secrandom://window/main?action=show` - Show main window
- `secrandom://window/main?visible=1` - Show main window (using visible parameter)
- `secrandom://window/main?mode=hide` - Hide main window (using mode alias)
- `secrandom://window/main` - Toggle main window display state (default toggle)

## window/main

Main window control command, used to control the display state of the main window and switch pages.

### Parameter Table

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `action` | string | `show` / `hide` / `toggle` | Control window display state | `toggle` |
| `page` | string | See page list below | Switch main window page | Do not switch page |
| `page_name` | string | Same as `page` | Alias for page | Same as `page` |
| `name` | string | Same as `page` | Alias for page | Same as `page` |
| `value` | string | Same as `page` | Alias for page | Same as `page` |

### Behavior Description

1. **No parameters passed**: Execute toggle operation, toggle main window display state
2. **Only action parameters passed**: Execute specified action (show/hide/toggle), do not switch page
3. **Page parameter passed**: Switch to specified page while executing the action
4. **Page parameter aliases**: `page` / `page_name` / `name` / `value` have the same priority, later parameters will override earlier ones
5. **Page alias support**: Supports short aliases (e.g., `roll` → `roll_call_page`), see page list for details

### Usage Examples

- `secrandom://window/main` - Toggle main window display state
- `secrandom://window/main?action=show` - Show main window
- `secrandom://window/main?action=hide` - Hide main window
- `secrandom://window/main?action=toggle` - Toggle main window display state
- `secrandom://window/main?page=roll_call_page` - Switch to roll call page
- `secrandom://window/main?page=lottery_page` - Switch to lottery page
- `secrandom://window/main?page=history_page` - Switch to history page
- `secrandom://window/main?action=show&page=roll_call_page` - Show main window and switch to roll call page
- `secrandom://window/main?action=show&page=lottery` - Show main window and switch to lottery page (using alias)
- `secrandom://window/main?visible=1&page=history` - Show main window and switch to history page (using visible and alias)

## window/settings

Settings window control command, used to control the display state of the settings window and open specific settings pages.

### Parameter Table

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `action` | string | `show` / `hide` / `toggle` | Control window display state | `toggle` |
| `page` | string | See page list below | Open specified settings page | `basicSettingsInterface` |
| `page_name` | string | Same as `page` | Alias for page | Same as `page` |
| `name` | string | Same as `page` | Alias for page | Same as `page` |
| `value` | string | Same as `page` | Alias for page | Same as `page` |
| `preview` | boolean | `1` / `0` / `true` / `false` / `yes` / `no` / `on` / `off` | Whether to open in preview mode | `false` |

### Behavior Description

1. **No parameters passed**: Execute toggle operation, open settings window and display basic settings page
2. **Only action parameters passed**: Execute specified action (show/hide/toggle), do not switch page
3. **Page parameter passed**: Open specified settings page while executing the action
4. **Preview parameter**: When set to true value (`1`/`true`/`yes`/`on`), open settings page in preview mode
5. **Page parameter aliases**: `page` / `page_name` / `name` / `value` have the same priority, later parameters will override earlier ones

### Usage Examples

- `secrandom://window/settings` - Toggle settings window display state (default open basic settings)
- `secrandom://window/settings?action=show` - Show settings window
- `secrandom://window/settings?action=hide` - Hide settings window
- `secrandom://window/settings?page=basicSettingsInterface` - Open basic settings page
- `secrandom://window/settings?page=listManagementInterface` - Open list management page
- `secrandom://window/settings?page=extractionSettingsInterface` - Open extraction settings page
- `secrandom://window/settings?page=basicSettingsInterface&preview=1` - Open basic settings in preview mode
- `secrandom://window/settings?action=show&page=floatingWindowManagementInterface&preview=true` - Show settings window and open floating window management in preview mode
- `secrandom://window/settings?action=show&page=notificationSettingsInterface&preview=yes` - Show settings window and open notification settings in preview mode
- `secrandom://window/settings?action=show&page=safetySettingsInterface&preview=on` - Show settings window and open security settings in preview mode
- `secrandom://window/settings?action=show&page=customSettingsInterface` - Show settings window and open custom settings
- `secrandom://window/settings?action=show&page=voiceSettingsInterface&preview=1` - Show settings window and open voice settings in preview mode
- `secrandom://window/settings?action=show&page=historyInterface` - Show settings window and open history settings
- `secrandom://window/settings?action=show&page=moreSettingsInterface&preview=true` - Show settings window and open more settings in preview mode

## window/float

Floating window control command, used to control the display state of the floating window.

### Parameter Table

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `action` | string | `show` / `hide` / `toggle` | Control floating window display state | `toggle` |
| `mode` | string | `show` / `hide` / `toggle` | Alias for action | Same as `action` |
| `op` | string | `show` / `hide` / `toggle` | Alias for action | Same as `action` |
| `do` | string | `show` / `hide` / `toggle` | Alias for action | Same as `action` |
| `visible` | number | `1` / `0` | `1` is equivalent to `show`, `0` is equivalent to `hide` | - |

### Behavior Description

1. **No parameters passed**: Execute toggle operation, toggle floating window display state
2. **Action parameters passed**: Execute specified action (show/hide/toggle)
3. **Floating window does not support page switching**: Floating window commands do not support `page` parameter

### Usage Examples

- `secrandom://window/float` - Toggle floating window display state
- `secrandom://window/float?action=show` - Show floating window
- `secrandom://window/float?action=hide` - Hide floating window
- `secrandom://window/float?action=toggle` - Toggle floating window display state
- `secrandom://window/float?mode=show` - Show floating window (using mode alias)
- `secrandom://window/float?op=hide` - Hide floating window (using op alias)
- `secrandom://window/float?visible=1` - Show floating window (using visible parameter)
- `secrandom://window/float?visible=0` - Hide floating window (using visible parameter)

## tray/* Tray Function Commands

Tray function commands are used to control various functions of the tray menu.

### Command List

| Command | Description |
|---------|-------------|
| `tray/toggle` | Toggle main interface display state |
| `tray/settings` | Open settings through tray |
| `tray/float` | Toggle floating window display state |
| `tray/restart` | Restart SecRandom program |
| `tray/exit` | Exit SecRandom program |

### Parameter Description

#### tray/toggle

Toggle main interface display state command.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Main interface display state toggled"
}
```

**Usage Examples**:
- `secrandom://tray/toggle` - Toggle main interface display state

#### tray/settings

Open settings through tray command.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Settings window opened"
}
```

**Usage Examples**:
- `secrandom://tray/settings` - Open settings through tray

#### tray/float

Toggle floating window display state command.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Floating window display state toggled"
}
```

**Usage Examples**:
- `secrandom://tray/float` - Toggle floating window display state

#### tray/restart

Restart SecRandom program command.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Program is restarting"
}
```

**Usage Examples**:
- `secrandom://tray/restart` - Restart SecRandom program

#### tray/exit

Exit SecRandom program command.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Program is exiting"
}
```

**Usage Examples**:
- `secrandom://tray/exit` - Exit SecRandom program

## roll_call/* Roll Call Control Commands

Roll call control commands are used to control the start, stop, reset of roll call functions and set roll call parameters.

### Command List

| Command | Description |
|---------|-------------|
| `roll_call/quick_draw` | Quick roll call (randomly select one person) |
| `roll_call/start` | Start roll call |
| `roll_call/stop` | Stop roll call |
| `roll_call/reset` | Reset roll call state |
| `roll_call/set_count` | Set roll call count |
| `roll_call/set_group` | Set group |
| `roll_call/set_gender` | Set gender filter |
| `roll_call/set_list` | Set roll call list |

### Parameter Description

#### roll_call/quick_draw

Quick roll call command, no parameters required, immediately randomly select one person.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call successful",
  "data": {
    "name": "Zhang San",
    "id": "001"
  }
}
```

**Usage Examples**:
- `secrandom://roll_call/quick_draw` - Quick roll call

#### roll_call/start

Start roll call command, start the roll call process.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call started"
}
```

**Usage Examples**:
- `secrandom://roll_call/start` - Start roll call

#### roll_call/stop

Stop roll call command, stop the currently running roll call process.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call stopped"
}
```

**Usage Examples**:
- `secrandom://roll_call/stop` - Stop roll call

#### roll_call/reset

Reset roll call command, reset roll call state and results.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call reset"
}
```

**Usage Examples**:
- `secrandom://roll_call/reset` - Reset roll call

#### roll_call/set_count

Set roll call count command, specify the number of people to select in each roll call.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `count` | number | Positive integer | Roll call count | 1 |
| `value` | number | Positive integer | Alias for count | Same as `count` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call count set to 3",
  "data": {
    "count": 3
  }
}
```

**Usage Examples**:
- `secrandom://roll_call/set_count?count=3` - Set roll call count to 3
- `secrandom://roll_call/set_count?value=5` - Set roll call count to 5 (using alias)

#### roll_call/set_group

Set group command, specify the group to use for roll call.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `group` | string | Group name | Group name | Default group |
| `group_name` | string | Group name | Alias for group | Same as `group` |
| `name` | string | Group name | Alias for group | Same as `group` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Group set to Class 1",
  "data": {
    "group": "Class 1"
  }
}
```

**Usage Examples**:
- `secrandom://roll_call/set_group?group=Class 1` - Set group to "Class 1"
- `secrandom://roll_call/set_group?group_name=Class 2` - Set group to "Class 2" (using alias)

#### roll_call/set_gender

Set gender filter command, specify the gender filter condition for roll call.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `gender` | string | `all` / `male` / `female` | Gender filter | `all` |
| `value` | string | `all` / `male` / `female` | Alias for gender | Same as `gender` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Gender filter set to male",
  "data": {
    "gender": "male"
  }
}
```

**Usage Examples**:
- `secrandom://roll_call/set_gender?gender=male` - Set gender filter to male
- `secrandom://roll_call/set_gender?value=female` - Set gender filter to female (using alias)
- `secrandom://roll_call/set_gender?gender=all` - Set gender filter to all

#### roll_call/set_list

Set roll call list command, specify the list to use for roll call.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `class_name` | string | Class name | Class name | Default class |
| `list_name` | string | List name | Alias for class_name | Same as `class_name` |
| `name` | string | List name | Alias for class_name | Same as `class_name` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call list set to Grade 3 Class 1",
  "data": {
    "list_name": "Grade 3 Class 1"
  }
}
```

**Usage Examples**:
- `secrandom://roll_call/set_list?class_name=Grade 3 Class 1` - Set roll call list to "Grade 3 Class 1"
- `secrandom://roll_call/set_list?list_name=Grade 3 Class 2` - Set roll call list to "Grade 3 Class 2" (using alias)

## lottery/* Lottery Control Commands

Lottery control commands are used to control the start, stop, reset of lottery functions and set lottery parameters.

### Command List

| Command | Description |
|---------|-------------|
| `lottery/start` | Start lottery |
| `lottery/stop` | Stop lottery |
| `lottery/reset` | Reset lottery state |
| `lottery/set_count` | Set lottery count |
| `lottery/set_pool` | Set prize pool |
| `lottery/set_range` | Set lottery range |
| `lottery/set_gender` | Set gender filter |
| `lottery/set_list` | Set lottery list |

### Parameter Description

#### lottery/start

Start lottery command, start the lottery process.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery started"
}
```

**Usage Examples**:
- `secrandom://lottery/start` - Start lottery

#### lottery/stop

Stop lottery command, stop the currently running lottery process.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery stopped"
}
```

**Usage Examples**:
- `secrandom://lottery/stop` - Stop lottery

#### lottery/reset

Reset lottery command, reset lottery state and results.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery reset"
}
```

**Usage Examples**:
- `secrandom://lottery/reset` - Reset lottery

#### lottery/set_count

Set lottery count command, specify the number of people to select in each lottery.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `count` | number | Positive integer | Lottery count | 1 |
| `value` | number | Positive integer | Alias for count | Same as `count` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery count set to 3",
  "data": {
    "count": 3
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_count?count=3` - Set lottery count to 3
- `secrandom://lottery/set_count?value=5` - Set lottery count to 5 (using alias)

#### lottery/set_pool

Set prize pool command, specify the prize pool to use for lottery.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `pool_name` | string | Prize pool name | Prize pool name | Default prize pool |
| `pool` | string | Prize pool name | Alias for pool_name | Same as `pool_name` |
| `name` | string | Prize pool name | Alias for pool_name | Same as `pool_name` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Prize pool set to Special Prize Pool",
  "data": {
    "pool_name": "Special Prize Pool"
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_pool?pool_name=Special Prize Pool` - Set prize pool to "Special Prize Pool"
- `secrandom://lottery/set_pool?pool=First Prize Pool` - Set prize pool to "First Prize Pool" (using alias)

#### lottery/set_range

Set lottery range command, specify the index range for lottery.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `index` | number | Non-negative integer | Range index | 0 |
| `value` | number | Non-negative integer | Alias for index | Same as `index` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery range set to index 0",
  "data": {
    "index": 0
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_range?index=0` - Set lottery range to index 0
- `secrandom://lottery/set_range?value=1` - Set lottery range to index 1 (using alias)

#### lottery/set_gender

Set gender filter command, specify the gender filter condition for lottery.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `gender` | string | `all` / `male` / `female` | Gender filter | `all` |
| `value` | string | `all` / `male` / `female` | Alias for gender | Same as `gender` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Gender filter set to male",
  "data": {
    "gender": "male"
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_gender?gender=male` - Set gender filter to male
- `secrandom://lottery/set_gender?value=female` - Set gender filter to female (using alias)
- `secrandom://lottery/set_gender?gender=all` - Set gender filter to all

#### lottery/set_list

Set lottery list command, specify the list to use for lottery.

**Parameter Table**:

| Parameter Name | Type | Optional Values | Description | Default Value |
|----------------|------|-----------------|-------------|---------------|
| `class_name` | string | Class name | Class name | Default class |
| `list_name` | string | List name | Alias for class_name | Same as `class_name` |
| `name` | string | List name | Alias for class_name | Same as `class_name` |

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery list set to Grade 3 Class 1",
  "data": {
    "list_name": "Grade 3 Class 1"
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_list?class_name=Grade 3 Class 1` - Set lottery list to "Grade 3 Class 1"
- `secrandom://lottery/set_list?list_name=Grade 3 Class 2` - Set lottery list to "Grade 3 Class 2" (using alias)

## data/* Data Retrieval Commands (Read-Only)

Data retrieval commands are used to get roll call lists, lottery lists, roll call history records, and lottery history records. These commands **will not modify any settings or state**, and are only used for data queries.

### Core Principles

**Important: Only IPC calls will have return results (JSON response)**

- Only IPC calls will have return results (JSON response)
- Invoking through system URL protocol (`secrandom://...`) can only trigger actions, the caller cannot synchronously read any return data
- Therefore: All `data/*` read commands can only be used as IPC requests (otherwise meaningless)

### How to Get Return Results Through IPC

To get return results from `data/*` commands through IPC, send a request and read the response.

**Python Example Code**:

```python
from app.common.IPC_URL import URLIPCHandler

ipc = URLIPCHandler("SecRandom", "secrandom")

resp = ipc.send_ipc_message_by_name({
    "type": "url",
    "payload": {
        "url": "data/roll_call_list?class_name=Grade 1 Class 1"  # Note: Use IPC command format here, no secrandom:// prefix needed
    }
})

# Top level is IPC wrapper
# resp -> {"success": True/False, "type": "url", "result": {...}} or {"success": False, "error": "..."}
print(resp)
```

**Return Value Structure Description**:

- **Top level fields**: `success` (whether successful), `type` (type), `result` (business result) or `error` (error message)
- **Actual business data**: In `resp["result"]`, this is the dictionary returned by the URL command handler

### Command List

| Command | Description |
|---------|-------------|
| `data/roll_call_list` | Get roll call list |
| `data/lottery_list` | Get lottery list |
| `data/roll_call_history` | Get roll call history |
| `data/lottery_history` | Get lottery history |

### Parameter Description

#### data/roll_call_list (Get Roll Call List)

**IPC Command**:
- `data/roll_call_list?class_name=xxx`

**Parameters (query)**:

| Parameter Name | Type | Required | Description | Compatible Aliases |
|----------------|------|----------|-------------|-------------------|
| `class_name` | string | Yes | Class name | `class` / `name` / `className` |

**Success Return (Business Layer result) Fields**:
```json
{
  "status": "success",
  "message": "Roll call list retrieved successfully",
  "class_name": "Grade 1 Class 1",
  "data": [
    {
      "id": "001",
      "name": "Zhang San",
      "gender": "male"
    },
    {
      "id": "002",
      "name": "Li Si",
      "gender": "female"
    }
  ]
}
```

**Missing Parameter Return (Business Layer result)**:
```json
{
  "status": "error",
  "message": "Missing parameter: class_name"
}
```

#### data/lottery_list (Get Lottery List)

**IPC Command**:
- `data/lottery_list?pool_name=xxx`

**Parameters (query)**:

| Parameter Name | Type | Required | Description | Compatible Aliases |
|----------------|------|----------|-------------|-------------------|
| `pool_name` | string | Yes | Prize pool name | `pool` / `name` / `poolName` |

**Success Return (Business Layer result) Fields**:
```json
{
  "status": "success",
  "message": "Lottery list retrieved successfully",
  "pool_name": "Special Prize Pool",
  "data": [
    {
      "id": "001",
      "name": "Zhang San",
      "gender": "male"
    },
    {
      "id": "002",
      "name": "Li Si",
      "gender": "female"
    }
  ]
}
```

**Missing Parameter Return (Business Layer result)**:
```json
{
  "status": "error",
  "message": "Missing parameter: pool_name"
}
```

#### data/roll_call_history (Get Roll Call History)

**IPC Command**:
- `data/roll_call_history?class_name=xxx`

**Parameters (query)**:

| Parameter Name | Type | Required | Description | Compatible Aliases |
|----------------|------|----------|-------------|-------------------|
| `class_name` | string | Yes | Class name | `class` / `name` / `className` |

**Success Return (Business Layer result) Fields**:
```json
{
  "status": "success",
  "message": "Roll call history retrieved successfully",
  "class_name": "Grade 1 Class 1",
  "data": [
    {
      "time": "2025-11-29 13:00:00",
      "students": [
        {
          "id": "001",
          "name": "Zhang San"
        }
      ]
    }
  ]
}
```

**Missing Parameter Return (Business Layer result)**:
```json
{
  "status": "error",
  "message": "Missing parameter: class_name"
}
```

#### data/lottery_history (Get Lottery History)

**IPC Command**:
- `data/lottery_history?pool_name=xxx`

**Parameters (query)**:

| Parameter Name | Type | Required | Description | Compatible Aliases |
|----------------|------|----------|-------------|-------------------|
| `pool_name` | string | Yes | Prize pool name | `pool` / `name` / `poolName` |

**Success Return (Business Layer result) Fields**:
```json
{
  "status": "success",
  "message": "Lottery history retrieved successfully",
  "pool_name": "Special Prize Pool",
  "data": [
    {
      "time": "2025-11-29 13:00:00",
      "winners": [
        {
          "id": "001",
          "name": "Zhang San",
          "prize": "Special Prize"
        }
      ]
    }
  ]
}
```

**Missing Parameter Return (Business Layer result)**:
```json
{
  "status": "error",
  "message": "Missing parameter: pool_name"
}
```

## Page List

### Main Window Switchable Page List

The main window supports switching to the following pages, specified through the `window/main?page=...` parameter:

| Page Identifier | Page Name | Description | Short Alias |
|-----------------|-----------|-------------|-------------|
| `roll_call_page` | Roll Call Page | Roll call function page of the main window | `roll` |
| `lottery_page` | Lottery Page | Lottery function page of the main window | `lottery` |
| `history_page` | History Page | History record page of the main window | `history` |
| `settingsInterface` | Settings Placeholder Page | Main window sidebar "Settings" placeholder page | None |

**Description**:
- `main_window` only means "show main window", it is not a switchable sub-page
- Using short aliases can simplify calls, e.g., `page=roll` is equivalent to `page=roll_call_page`
- When switching pages, the window display action is automatically executed (default is show)

### Settings Window Openable Page List

The settings window supports opening the following pages, specified through the `window/settings?page=...` parameter:

| Page Identifier | Page Name | Description |
|-----------------|-----------|-------------|
| `basicSettingsInterface` | Basic Settings | Basic function settings of SecRandom |
| `listManagementInterface` | List Management | List management and editing |
| `extractionSettingsInterface` | Extraction Settings | Roll call and extraction related settings |
| `floatingWindowManagementInterface` | Floating Window Management | Floating window display and behavior settings |
| `notificationSettingsInterface` | Notification Settings | Notification prompt related settings |
| `safetySettingsInterface` | Security Settings | Security and privacy related settings |
| `customSettingsInterface` | Custom Settings | User custom function settings |
| `voiceSettingsInterface` | Voice Settings | Voice broadcast related settings |
| `historyInterface` | History Settings | History record management and settings |
| `moreSettingsInterface` | More Settings | Other extended settings |
| `updateInterface` | Update | Software update related page |
| `aboutInterface` | About | Software information and version description |

**Description**:
- When no `page` parameter is passed, `basicSettingsInterface` (Basic Settings) is opened by default
- Settings window pages do not support short aliases, full page identifiers must be used
- Can be opened in preview mode with the `preview=1` parameter

## Migration Guide

The URL/IPC protocol entries for old versions (below 2.2.6) have been removed. Please use the new unified entry for replacement.

### Removed Old Entries

The following old entries are no longer supported:
- `main/roll` → Removed
- `main/lottery` → Removed
- `main/` → Removed
- `settings/basic` → Removed
- `settings/list` → Removed
- `settings/extraction` → Removed
- `settings/floating` → Removed
- `settings/notification` → Removed
- `settings/safety` → Removed
- `settings/custom` → Removed
- `settings/voice` → Removed
- `settings/history` → Removed
- `settings/more` → Removed
- `settings/update` → Removed
- `settings/about` → Removed
- `settings/` → Removed

### Equivalent Replacement Examples

| Old Entry | New Entry (Equivalent Replacement) |
|-----------|-----------------------------------|
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

## FAQ

For frequently asked questions about IPC & URL protocols, please see: [IPC & URL Protocol FAQ](../../faq/ipc-url-faq.md)

## Quick Reference

Quick reference for the most commonly used commands:

| Function | Command |
|----------|---------|
| Open main window and switch to roll call page | `secrandom://window/main?action=show&page=roll_call_page` |
| Open settings window and show basic settings | `secrandom://window/settings?action=show&page=basicSettingsInterface` |
| Toggle floating window display state | `secrandom://window/float` |
| Quick roll call | `secrandom://roll_call/quick_draw` |
| Start roll call | `secrandom://roll_call/start` |
| Set roll call count | `secrandom://roll_call/set_count?count=3` |
| Start lottery | `secrandom://lottery/start` |
| Set lottery count | `secrandom://lottery/set_count?count=5` |
| Restart program | `secrandom://tray/restart` |

## Usage Examples

### URL Protocol Usage

**Creating Shortcuts**
1. Right-click desktop → New → Shortcut
2. Enter URL protocol (e.g., `secrandom://window/main?action=show&page=roll_call_page`)
3. Name the shortcut and complete creation

**Batch Script**
```batch
@echo off
echo Starting SecRandom main interface...
start secrandom://window/main?action=show&page=roll_call_page
```

**Browser Invocation**
```html
<a href="secrandom://window/main?action=show&page=roll_call_page">Open SecRandom Roll Call Page</a>
```

### IPC Protocol Usage

**Python Example**
For complete Python usage examples, please refer to: [secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)

**JavaScript Example**
For complete JavaScript usage examples, please refer to: [secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

### Notes

1. **Protocol Registration**: Ensure SecRandom has correctly registered the URL protocol
2. **Security Considerations**: Only use protocols listed in official documentation
3. **Parameter Validation**: Ensure parameter values are correct when using parameters
4. **Error Handling**: It is recommended to add error handling mechanisms when using protocols
5. **IPC Communication**: IPC protocol requires the program to be in running state to use
6. **Data Read-Only**: `data/*` commands will not modify any data, only used for queries

### Troubleshooting

**Protocol Cannot Open**
- Check if SecRandom is correctly installed
- Reinstall the software to fix protocol registration
- Check if system security software is blocking protocol invocation
- If all above factors are excluded, report bug to developer

**IPC Communication Failure**
- Confirm SecRandom program is running
- Check if IPC service is started normally
- View software logs for detailed error information

**Command Execution Failure**
- Check if command format is correct
- Confirm parameter values are within allowed range
- View returned error messages to locate the problem

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
