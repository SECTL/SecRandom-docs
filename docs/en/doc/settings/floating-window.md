---
title: Floating Window Settings
createTime: 2026/08/14 10:00:00
---

# Floating Window Settings (Personalized)

::: tip Version Notice
This document corresponds to the **v3** "Settings → Personalized → Floating Window" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Quick drawing** - Start roll call, quick draw and lottery anytime from the floating window without breaking the rhythm.

## Window Display

### Show Floating Window on Launch
**Description**: Control whether the floating window opens automatically after the program starts

### Floating Window Opacity
**Description**: Set the floating window opacity (applies to both the main floating window and the quick draw window)

### Floating Window Topmost Mode
**Description**: Choose whether the floating window stays above other windows

| Option | Description |
|--------|-------------|
| **Not Topmost** | Does not stay on top |
| **Topmost** | Normal always-on-top |
| **UIAccess Topmost** (Windows only) | Requests administrator rights on restart; falls back to normal topmost for this launch if cancelled or failed |

## Floating Window Controls

### Floating Window Controls (Entries)
**Description**: Choose which feature entries appear in the main floating window

- **Roll Call**: shows the roll call entry
- **Quick Draw**: shows the quick draw entry
- **Lottery**: shows the lottery entry

### Control Arrangement
**Description**: Choose the arrangement of floating window controls

- **Rectangular**: two-column grid
- **Vertical**: single column
- **Horizontal**: single row

### Control Display Style
**Description**: Choose whether controls show icon, text, or both

- **Icon and Text**
- **Icon Only**
- **Text Only**

### Control Size
**Description**: Adjust the edge length of each square control; icons and text scale together

Options: Extra Small, Very Small, Small, Medium, Large, Very Large, Extra Large

## Moving & Edge Docking

### Draggable
**Description**: When off, neither the main floating window nor the dock handle can be dragged

### Edge Docking
**Description**: After drag release, automatically snap to the nearest left or right edge of the current screen

### Auto-collapse Delay
**Description**: Wait the specified seconds after docking before collapsing; 0 keeps it expanded

### No-focus Mode
**Description**: Clicking the floating window avoids stealing focus from the current window when possible

### Long-press Detection Time
**Description**: Milliseconds a long press must last to trigger the long-press action

### Hide Floating Window on Foreground Window
**Description**: Auto-hide the floating window when the current foreground window title or process name matches rules

- **Foreground Window Title**: hides when the title contains matching text (separate multiple rules with English semicolons `;`)
- **Foreground Process Name**: hides when the process name matches, e.g. `WeChat.exe` (separate multiple rules with `;`)

## Related Pages

- Quick draw settings: see [Picking Settings](/en/doc/settings/pick)
- Appearance & theme: see [Appearance Settings](/en/doc/settings/appearance)
