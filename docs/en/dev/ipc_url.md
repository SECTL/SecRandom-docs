---
title: IPC & URL Protocol
createTime: 2025/11/29 13:02:57
---
# SecRandom IPC & URL Protocol Complete List

> **SecRandom IPC & URL Protocol Reference**
>
> This page provides a complete list of IPC and URL protocols supported by SecRandom software. Through these protocols, you can quickly access various functional modules of the software and perform specific operations.

## ::lucide:telescope:: Overview

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

## ::lucide:list:: Complete Command Overview Table

| Command Group | Command | Purpose | Read-Only | Affects Interface |
|---------------|---------|---------|-----------|-------------------|
| **Window Control** {rowspan=3} | `window/main` | Main window control | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `window/settings` | Settings window control | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `window/float` | Floating window control | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| **Tray Functions** {rowspan=5} | `tray/toggle` | Toggle display | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `tray/settings` | Open settings | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `tray/float` | Floating window control | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `tray/restart` | Restart program | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `tray/exit` | Exit program | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| **Roll Call Control** {rowspan=8} | `roll_call/quick_draw` | Quick roll call | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/start` | Start roll call | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/stop` | Stop roll call | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/reset` | Reset roll call | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/set_count` | Set roll call count | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/set_group` | Set group | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/set_gender` | Set gender filter | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `roll_call/set_list` | Set roll call list | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| **Lottery Control** {rowspan=8} | `lottery/start` | Start lottery | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/stop` | Stop lottery | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/reset` | Reset lottery | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/set_count` | Set lottery count | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/set_pool` | Set prize pool | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/set_range` | Set range | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/set_gender` | Set gender filter | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| | `lottery/set_list` | Set lottery list | <p style="color: red;">No</p> | <p style="color: green;">Yes</p> |
| **Data Retrieval** {rowspan=4} | `data/roll_call_list` | Get roll call list | <p style="color: green;">Yes</p> | <p style="color: red;">No</p> |
| | `data/lottery_list` | Get lottery list | <p style="color: green;">Yes</p> | <p style="color: red;">No</p> |
| | `data/roll_call_history` | Get roll call history | <p style="color: green;">Yes</p> | <p style="color: red;">No</p> |
| | `data/lottery_history` | Get lottery history | <p style="color: green;">Yes</p> | <p style="color: red;">No</p> |

## ::lucide:settings:: Common Parameters

All window commands support the following common parameters for controlling window display behavior:

### Action Parameters

:::: field-group
::: field name="action" type="'show' | 'hide' | 'toggle'" default="''"
Control window display state
:::

::: field name="mode" type="'show' | 'hide' | 'toggle'" default="''"
Alias for action, same priority
:::

::: field name="op" type="'show' | 'hide' | 'toggle'" default="''"
Alias for action, same priority
:::

::: field name="do" type="'show' | 'hide' | 'toggle'" default="''"
Alias for action, same priority
:::

::: field name="visible" type="1 | 0" default=""
`1` is equivalent to `show`, `0` is equivalent to `hide`
:::
::::

### ::lucide:scroll-text:: Parameter Parsing Rules

1. **Priority**: `action` / `mode` / `op` / `do` / `visible` have the same priority. Parameters are parsed in the order they appear, and later parameters will override earlier ones
2. **Default Value**: When no action parameters are passed, the default `toggle` operation is executed (hide if currently displayed, otherwise show)
3. **Action Description**:
   - `show` - Force window to show
   - `hide` - Force window to hide
   - `toggle` - Toggle window display state

### ::lucide:play:: Parameter Usage Examples

- `secrandom://window/main?action=show` - Show main window
- `secrandom://window/main?visible=1` - Show main window (using visible parameter)
- `secrandom://window/main?mode=hide` - Hide main window (using mode alias)
- `secrandom://window/main` - Toggle main window display state (default toggle)

## window/main

Main window control command, used to control the display state of the main window and switch pages.

### Parameter Table

:::: field-group
::: field name="action" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Control window display state
:::

::: field name="page" type="'roll_call_page' | 'lottery_page' | 'history_page'" default="''"
Switch main window page
:::

::: field name="page_name" type="'roll_call_page' | 'lottery_page' | 'history_page'" default="''"
Alias for page
:::

::: field name="name" type="'roll_call_page' | 'lottery_page' | 'history_page'" default="''"
Alias for page
:::

::: field name="value" type="'roll_call_page' | 'lottery_page' | 'history_page'" default="''"
Alias for page
:::
::::

### Behavior Description

1. **No parameters passed**: Execute toggle operation, toggle main window display state
2. **Only action parameters passed**: Execute specified action (show/hide/toggle), do not switch page
3. **Page parameter passed**: Switch to specified page while executing the action
4. **Page parameter aliases**: `page` / `page_name` / `name` / `value` have the same priority, later parameters will override earlier ones
5. **Page alias support**: Supports short aliases (e.g., `roll` → `roll_call_page`), see page list for details

### ::lucide:play:: Usage Examples

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

## ::lucide:settings:: window/settings

Settings window control command, used to control the display state of the settings window and open specific settings pages.

### Parameter Table

:::: field-group
::: field name="action" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Control window display state
:::

::: field name="page" type="'basicSettingsInterface' | 'listManagementInterface' | 'extractionSettingsInterface'" default="'basicSettingsInterface'"
Open specified settings page
:::

::: field name="page_name" type="'basicSettingsInterface' | 'listManagementInterface' | 'extractionSettingsInterface'" default="'basicSettingsInterface'"
Alias for page
:::

::: field name="name" type="'basicSettingsInterface' | 'listManagementInterface' | 'extractionSettingsInterface'" default="'basicSettingsInterface'"
Alias for page
:::

::: field name="value" type="'basicSettingsInterface' | 'listManagementInterface' | 'extractionSettingsInterface'" default="'basicSettingsInterface'"
Alias for page
:::

::: field name="preview" type="'1' | '0' | 'true' | 'false' | 'yes' | 'no' | 'on' | 'off'" default="'false'"
Whether to open in preview mode
:::
::::

### Behavior Description

1. **No parameters passed**: Execute toggle operation, open settings window and display basic settings page
2. **Only action parameters passed**: Execute specified action (show/hide/toggle), do not switch page
3. **Page parameter passed**: Open specified settings page while executing the action
4. **Preview parameter**: When set to true value (`1`/`true`/`yes`/`on`), open settings page in preview mode
5. **Page parameter aliases**: `page` / `page_name` / `name` / `value` have the same priority, later parameters will override earlier ones

### ::lucide:play:: Usage Examples

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

## ::lucide:app-window:: window/float

Floating window control command, used to control the display state of the floating window.

### Parameter Table

:::: field-group
::: field name="action" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Control floating window display state
:::

::: field name="mode" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Alias for action
:::

::: field name="op" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Alias for action
:::

::: field name="do" type="'show' | 'hide' | 'toggle'" default="'toggle'"
Alias for action
:::

::: field name="visible" type="1 | 0" default="''"
`1` is equivalent to `show`, `0` is equivalent to `hide`
:::
::::

### Behavior Description

1. **No parameters passed**: Execute toggle operation, toggle floating window display state
2. **Action parameters passed**: Execute specified action (show/hide/toggle)
3. **Floating window does not support page switching**: Floating window commands do not support `page` parameter

### ::lucide:play:: Usage Examples

- `secrandom://window/float` - Toggle floating window display state
- `secrandom://window/float?action=show` - Show floating window
- `secrandom://window/float?action=hide` - Hide floating window
- `secrandom://window/float?action=toggle` - Toggle floating window display state
- `secrandom://window/float?mode=show` - Show floating window (using mode alias)
- `secrandom://window/float?op=hide` - Hide floating window (using op alias)
- `secrandom://window/float?visible=1` - Show floating window (using visible parameter)
- `secrandom://window/float?visible=0` - Hide floating window (using visible parameter)

## ::lucide:timer:: window/timer

Timer window control command, used to open the timer window.

::: info Note
This command currently only supports **opening** the timer window. It does not support hiding or toggling state, and has no configuration parameters.
:::

### Parameter Table

No parameters.

### Behavior Description

Executing this command will directly open the timer window. If the window is already open, it will be brought to the front.

### ::lucide:play:: Usage Examples

- `secrandom://window/timer` - Open timer window

## ::lucide:box:: tray/* Tray Function Commands

Tray function commands are used to control various functions of the tray menu.

### ::lucide:list:: Command List

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

## ::lucide:user-check:: roll_call/* Roll Call Control Commands

Roll call control commands are used to control the start, stop, reset of roll call functions and set roll call parameters.

### ::lucide:list:: Command List

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

:::: field-group
::: field name="count" type="positive integer" default="1"
Roll call count
:::

::: field name="value" type="positive integer" default="1"
Alias for count
:::
::::

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

:::: field-group
::: field name="group" type="string" default="Default group"
Group name
:::

::: field name="group_name" type="string" default="Default group"
Group name
:::

::: field name="name" type="string" default="Default group"
Alias for group
:::
::::

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

:::: field-group
::: field name="gender" type="'all' | 'male' | 'female'" default="'all'"
Gender filter
:::

::: field name="value" type="'all' | 'male' | 'female'" default="'all'"
Alias for gender
:::
::::

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

:::: field-group
::: field name="class_name" type="string" default="Default class"
Class name
:::

::: field name="list_name" type="string" default="Default class"
Alias for class_name
:::

::: field name="name" type="string" default="Default class"
Alias for class_name
:::
::::

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

## ::lucide:gift:: lottery/* Lottery Control Commands

Lottery control commands are used to control the start, stop, reset of lottery functions and set lottery parameters.

### ::lucide:list:: Command List

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

:::: field-group
::: field name="count" type="positive integer" default="1"
Lottery count
:::

::: field name="value" type="positive integer" default="1"
Alias for count
:::
::::

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

Set prize pool command, specify the prize pool for lottery.

**Parameter Table**:

:::: field-group
::: field name="pool" type="string" default="Default prize pool"
Prize pool name
:::

::: field name="pool_name" type="string" default="Default prize pool"
Prize pool name
:::

::: field name="name" type="string" default="Default prize pool"
Alias for pool
:::
::::

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Prize pool set to First Prize",
  "data": {
    "pool": "First Prize"
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_pool?pool=First Prize` - Set prize pool to "First Prize"
- `secrandom://lottery/set_pool?pool_name=Second Prize` - Set prize pool to "Second Prize" (using alias)

#### lottery/set_range

Set lottery range command, specify the range for lottery.

**Parameter Table**:

:::: field-group
::: field name="range" type="string" default="Default range"
Lottery range
:::

::: field name="range_name" type="string" default="Default range"
Lottery range
:::

::: field name="name" type="string" default="Default range"
Alias for range
:::
::::

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery range set to 1-100",
  "data": {
    "range": "1-100"
  }
}
```

**Usage Examples**:
- `secrandom://lottery/set_range?range=1-100` - Set lottery range to "1-100"
- `secrandom://lottery/set_range?range_name=101-200` - Set lottery range to "101-200" (using alias)

#### lottery/set_gender

Set gender filter command, specify the gender filter condition for lottery.

**Parameter Table**:

:::: field-group
::: field name="gender" type="'all' | 'male' | 'female'" default="'all'"
Gender filter
:::

::: field name="value" type="'all' | 'male' | 'female'" default="'all'"
Alias for gender
:::
::::

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

:::: field-group
::: field name="class_name" type="string" default="Default class"
Class name
:::

::: field name="list_name" type="string" default="Default class"
Alias for class_name
:::

::: field name="name" type="string" default="Default class"
Alias for class_name
:::
::::

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

## ::lucide:database:: data/* Data Retrieval Commands (Read-Only)

Data retrieval commands are used to get roll call lists, lottery lists, roll call history, and lottery history. These commands **will not modify any settings or status**, they are only used for data query.

### Core Principles

**Important: Only IPC calls will return results (JSON response)**

- Only IPC calls will return results (JSON response)
- Invoking via system URL protocol (`secrandom://...`) can only trigger actions, the caller cannot synchronously read any returned data
- Therefore: All `data/*` read commands can only be used as IPC requests (otherwise they are meaningless)

### ::lucide:plug:: How to Get Results via IPC

To get the return result of `data/*` commands via IPC, please send a request and read the response.

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

- **Top-level fields**: `success` (whether successful), `type` (type), `result` (business result) or `error` (error message)
- **Real business data**: In `resp["result"]`, this is the dictionary returned by the URL command processor

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

:::: field-group
::: field name="class_name" type="string" required
Class name (Compatible aliases: `class` / `name` / `className`)
:::
::::

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

:::: field-group
::: field name="pool_name" type="string" required
Prize pool name (Compatible aliases: `pool` / `name` / `poolName`)
:::
::::

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

:::: field-group
::: field name="class_name" type="string" required
Class name (Compatible aliases: `class` / `name` / `className`)
:::
::::

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

:::: field-group
::: field name="pool_name" type="string" required
Prize pool name (Compatible aliases: `pool` / `name` / `poolName`)
:::
::::

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

The main window supports switching to the following pages, specified by `window/main?page=...` parameter:

| Page ID | Page Name | Description | Short Alias |
|---------|-----------|-------------|-------------|
| `roll_call_page` | Roll Call Page | Main window roll call function page | `roll` |
| `lottery_page` | Lottery Page | Main window lottery function page | `lottery` |
| `history_page` | History Page | Main window history page | `history` |
| `settingsInterface` | Settings Placeholder Page | Main window sidebar "Settings" placeholder page | None |

**Description**:
- `main_window` only means "Show main window", not a switchable sub-page
- Using short aliases can simplify calling, e.g., `page=roll` is equivalent to `page=roll_call_page`
- Switching pages automatically executes the window show action (default is show)

### ::lucide:settings:: Settings Window Openable Page List

The settings window supports opening the following pages, specified by `window/settings?page=...` parameter:

| Page ID | Page Name | Description |
|---------|-----------|-------------|
| `basicSettingsInterface` | Basic Settings | SecRandom basic function settings |
| `listManagementInterface` | List Management | List management and editing |
| `extractionSettingsInterface` | Extraction Settings | Roll call and extraction related settings |
| `floatingWindowManagementInterface` | Floating Window Management | Floating window display and behavior settings |
| `notificationSettingsInterface` | Notification Settings | Notification related settings |
| `safetySettingsInterface` | Security Settings | Security and privacy related settings |
| `customSettingsInterface` | Custom Settings | User custom function settings |
| `voiceSettingsInterface` | Voice Settings | Voice broadcast related settings |
| `historyInterface` | History Settings | History record management and settings |
| `moreSettingsInterface` | More Settings | Other extended settings |
| `updateInterface` | Update | Software update related page |
| `aboutInterface` | About | Software information and version notes |

**Description**:
- When `page` parameter is not passed, `basicSettingsInterface` (Basic Settings) is opened by default
- Settings window pages do not support short aliases, complete page IDs must be used
- Use `preview=1` parameter to open settings page in preview mode

## ::lucide:arrow-right-left:: Migration Guide

URL/IPC protocol entries for older versions (below 2.2.6) have been removed. Please use the new unified entry for replacement.

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

## ::lucide:circle-help:: FAQ

For frequently asked questions about IPC & URL Protocol, please check: [IPC & URL Protocol FAQ](../../faq/ipc-url-faq.md)

## Cheat Sheet

Quick reference for most commonly used commands:

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

## ::lucide:play:: Usage Examples

### ::lucide:link-2:: URL Protocol Usage

**Create Shortcut**
1. Right-click Desktop → New → Shortcut
2. Enter URL protocol (e.g., `secrandom://window/main?action=show&page=roll_call_page`)
3. Name the shortcut and complete creation

**Batch Script**
```batch
@echo off
echo Starting SecRandom main interface...
start secrandom://window/main?action=show&page=roll_call_page
```

**Browser Call**
```html
<a href="secrandom://window/main?action=show&page=roll_call_page">Open SecRandom Roll Call Page</a>
```

### ::lucide:plug:: IPC Protocol Usage

**Python Example**
For complete Python usage example, please refer to: [secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)

**JavaScript Example**
For complete JavaScript usage example, please refer to: [secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

### ::lucide:alert-triangle:: Precautions

1. **Protocol Registration**: Ensure SecRandom has correctly registered URL protocol
2. **Security Considerations**: Only use protocols listed in official documentation
3. **Parameter Validation**: Ensure parameter values are correct when using parameters
4. **Error Handling**: Recommended to add error handling mechanism when using protocols
5. **IPC Communication**: IPC protocol requires the program to be in running state to use
6. **Data Read-Only**: `data/*` commands will not modify any data, only used for query

### ::lucide:wrench:: Troubleshooting

**Protocol Cannot Open**
- Check if SecRandom is correctly installed
- Reinstall software to fix protocol registration
- Check if system security software blocked protocol call
- If all above factors are excluded, report bug to developer

**IPC Communication Failed**
- Confirm SecRandom program is running
- Check if IPC service started normally
- Check software logs for detailed error information

**Command Execution Failed**
- Check if command format is correct
- Confirm parameter values are within allowed range
- Check returned error message to locate problem
