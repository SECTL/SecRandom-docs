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

## Common Parameters

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

:::: field-group
::: field name="count" type="正整数" default="1"
Roll call count
:::

::: field name="value" type="正整数" default="1"
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

:::: field-group
::: field name="count" type="正整数" default="1"
Lottery count
:::

::: field name="value" type="正整数" default="1"
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

## data/* Data Retrieval Commands

Data retrieval commands are used to query various data from SecRandom.

### Command List

| Command | Description |
|---------|-------------|
| `data/roll_call_list` | Get roll call list |
| `data/lottery_list` | Get lottery list |
| `data/roll_call_history` | Get roll call history |
| `data/lottery_history` | Get lottery history |

### Parameter Description

#### data/roll_call_list

Get roll call list command, retrieve the current roll call list.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call list retrieved successfully",
  "data": {
    "list_name": "Grade 3 Class 1",
    "students": [
      {
        "name": "Zhang San",
        "id": "001"
      },
      {
        "name": "Li Si",
        "id": "002"
      }
    ]
  }
}
```

**Usage Examples**:
- `secrandom://data/roll_call_list` - Get roll call list

#### data/lottery_list

Get lottery list command, retrieve the current lottery list.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery list retrieved successfully",
  "data": {
    "list_name": "Grade 3 Class 1",
    "students": [
      {
        "name": "Zhang San",
        "id": "001"
      },
      {
        "name": "Li Si",
        "id": "002"
      }
    ]
  }
}
```

**Usage Examples**:
- `secrandom://data/lottery_list` - Get lottery list

#### data/roll_call_history

Get roll call history command, retrieve the roll call history records.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Roll call history retrieved successfully",
  "data": {
    "history": [
      {
        "time": "2025-11-29 13:00:00",
        "students": [
          {
            "name": "Zhang San",
            "id": "001"
          }
        ]
      }
    ]
  }
}
```

**Usage Examples**:
- `secrandom://data/roll_call_history` - Get roll call history

#### data/lottery_history

Get lottery history command, retrieve the lottery history records.

**Parameter Table**: No parameters

**Return Value Description**:
```json
{
  "status": "success",
  "message": "Lottery history retrieved successfully",
  "data": {
    "history": [
      {
        "time": "2025-11-29 13:00:00",
        "students": [
          {
            "name": "Zhang San",
            "id": "001"
          }
        ]
      }
    ]
  }
}
```

**Usage Examples**:
- `secrandom://data/lottery_history` - Get lottery history
