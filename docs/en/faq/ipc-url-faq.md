---
title: IPC & URL Protocol FAQ
createTime: 2026/01/28 18:22:57
---
# IPC & URL Protocol FAQ

> **SecRandom IPC & URL Protocol FAQ**
>
> This page provides frequently asked questions and answers regarding the use of SecRandom IPC and URL protocols.

## Q1: What happens if an unknown action parameter is passed?

If the `action` parameter value passed is not `show`, `hide`, or `toggle`, the system will ignore that parameter and execute the default `toggle` operation.

**Example**:
- `secrandom://window/main?action=invalid` - Will execute toggle operation (equivalent to `secrandom://window/main`)

## Q2: What happens if a non-existent page parameter is passed?

If the `page` parameter value passed is not in the page list, the system will ignore that parameter, will not perform page switching, but will still execute the window display action.

**Example**:
- `secrandom://window/main?page=invalid_page` - Will execute default toggle operation, will not switch page
- `secrandom://window/settings?page=invalid_page` - Will execute default toggle operation, open default basic settings page

## Q3: How are visible and action parameters handled when both exist?

`visible` and `action` parameters have the same priority. Parameters are parsed in the order they appear, and later parameters will override earlier parameters.

**Example**:
- `secrandom://window/main?action=show&visible=0` - Will eventually execute hide operation (visible=0 overrides action=show)
- `secrandom://window/main?visible=1&action=hide` - Will eventually execute hide operation (action=hide overrides visible=1)

## Q4: How are multiple aliases of the page parameter handled?

`page` / `page_name` / `name` / `value` have the same priority. Parameters are parsed in the order they appear, and later parameters will override earlier parameters.

**Example**:
- `secrandom://window/main?page=roll_call_page&name=lottery_page` - Will eventually switch to lottery page (name overrides page)
- `secrandom://window/settings?page=basicSettingsInterface&value=customSettingsInterface` - Will eventually open custom settings page (value overrides page)

## Q5: How are truthy/falsy values of the preview parameter determined?

The `preview` parameter supports multiple ways to represent truthy/falsy values:

**Truthy values (enable preview mode)**: `1`, `true`, `yes`, `on`
**Falsy values (disable preview mode)**: `0`, `false`, `no`, `off`, or no parameter passed

**Example**:
- `secrandom://window/settings?page=basicSettingsInterface&preview=1` - Enable preview mode
- `secrandom://window/settings?page=basicSettingsInterface&preview=true` - Enable preview mode
- `secrandom://window/settings?page=basicSettingsInterface&preview=yes` - Enable preview mode
- `secrandom://window/settings?page=basicSettingsInterface&preview=on` - Enable preview mode
- `secrandom://window/settings?page=basicSettingsInterface&preview=0` - Disable preview mode
- `secrandom://window/settings?page=basicSettingsInterface` - Disable preview mode (default)

## Q6: Does the floating window support the page parameter?

No. The floating window command (`window/float`) only supports action parameters (action/mode/op/do/visible), and does not support the `page` parameter.

**Error Example**:
- `secrandom://window/float?page=roll_call_page` - The page parameter will be ignored

## Q7: How to use these commands in IPC protocol?

The IPC protocol usage is the same as the URL protocol, just replace the protocol header `secrandom://` with the IPC path.

**Example**:
- URL: `secrandom://window/main?action=show&page=roll_call_page`
- IPC: `window/main?action=show&page=roll_call_page`

For complete IPC usage examples, please refer to:
- [secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)
- [secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

## Q8: Will data retrieval commands modify data?

No. All `data/*` commands are read-only commands and will not modify any settings or state, only used for querying data.

## Q9: What are the parameter aliases for roll call and lottery commands?

The parameter aliases for roll call and lottery commands follow the interface compatibility strategy. Common aliases include:
- `count` / `value` - Set count
- `group` / `group_name` / `name` - Set group
- `gender` / `value` - Set gender
- `class_name` / `list_name` / `name` - Set list
- `pool_name` / `pool` / `name` - Set prize pool
- `index` / `value` - Set range

For specific supported aliases, please refer to the interface compatibility strategy.
