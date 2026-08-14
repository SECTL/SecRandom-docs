---
title: Basic Settings
createTime: 2026/08/14 10:00:00
---

# Basic Settings (General)

::: tip Version Notice
This document corresponds to the **v3** "Settings → General → Basic" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

Basic settings manage the core behavior of the software, including startup behavior, window behavior, language and crash recovery.

## Behavior

### Launch on Startup
**Description**: Set whether the software auto-starts with the system

**Scenarios**:
- Classroom big-screen scenarios that need auto-start
- Users who want the software always running in the background

**How to use**: Toggle the switch on or off

**Notes**:
- Implemented with system-level mechanisms across platforms (Windows/Linux/macOS)
- If antivirus software flags it, allow the operation or temporarily disable the antivirus before enabling auto-start

### Show Main Window on Launch
**Description**: Set whether the main window shows automatically when the software starts

**Scenarios**:
- On: shows the main interface immediately after launch for quick operation
- Off: runs in the background after launch

**How to use**: Toggle the switch on or off

### Auto-save Window Size
**Description**: Whether to automatically save window size and position

**Scenarios**:
- On: on next launch, the main window and settings window restore to the size/position of last close (remembered independently)
- Off: every launch uses the default window size and position

**How to use**: Toggle the switch on or off

### Main Window Topmost Mode
**Description**: Choose whether the main window stays above other windows

**Options**:
- **No Topmost**: not always on top
- **Topmost**: normal always-on-top
- **UIAccess Topmost** (Windows only): requests administrator rights on restart to obtain a system UIAccess token, which can pierce most fullscreen windows

**How to use**: Select in the dropdown

**Notes**:
- If UIAccess mode is cancelled or fails, this launch falls back to normal topmost
- Non-Windows platforms only offer "Topmost / Not topmost"

### Background Resident
**Description**: Whether to keep running in the background after all windows are closed

**Scenarios**:
- On: after closing the main window, the software keeps running in the background and can be reopened via the tray icon or other means
- Off: closing the main window exits the software completely

**How to use**: Toggle the switch on or off

### URL Protocol Registration & IPC Service
**Description**: Register the custom URL protocol (`secrandom://`) and enable IPC communication, supporting link launch and external linkage

**Scenarios**:
- Launching the software from a browser or other app via a link
- Data exchange with other applications
- Receiving external commands to control the software

**How to use**: Toggle the switch on or off

**Examples**:
```
secrandom://roll_call/start  # start roll call
secrandom://lottery/draw     # start lottery
```

**Notes**:
- Registration failure shows an error message
- Detailed protocol & IPC docs: see [IPC & URL Protocol](/en/doc/resources/ipc_url)

### Display Language
**Description**: Switch the software interface language

**Options**: 简体中文, English, 日本語

**How to use**: Select in the dropdown

**Notes**: Some versions require a restart to take effect

## Crash Recovery

### Crash Recovery
**Description**: Choose how the program recovers after a crash

**Options**:
- **Off**: crash recovery disabled
- **Auto-restart only**: automatically restart after a crash
- **Show recovery page**: show a recovery page (with error info) after a crash
- **Show recovery page and auto-restart**: show the recovery page and auto-restart

**Scenarios**:
- Classroom scenarios where a crash should recover quickly to avoid disrupting teaching
- Need to see the crash reason for feedback

**Notes**:
- Crash recovery prompt handling happens before single-instance detection
- A normal restart first releases the single-instance service before restarting

## Related Pages

- Security settings: see [Security Settings](/en/doc/settings/security)
- Appearance & theme: see [Appearance Settings](/en/doc/settings/appearance)
- Backup: see [Backup Settings](/en/doc/settings/backup)
- Privacy: see [Privacy Settings](/en/doc/settings/privacy)
