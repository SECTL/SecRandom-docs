---
title: IPC & URL Protocols
createTime: 2025/11/29 13:02:57
---
# SecRandom IPC & URL Protocols Complete List

> **SecRandom IPC & URL Protocol Reference**
> 
> This page provides a complete list of IPC and URL protocols supported by SecRandom software, allowing quick access to various software modules and execution of specific operations.

## Protocol Overview

SecRandom supports two protocol methods:
- **URL Protocol**: Called via `secrandom://` protocol, suitable for external applications and browsers
- **IPC Protocol**: Inter-process communication, suitable for programming integration and automation scripts

## Main Interface Page Commands

### Roll Call Interface
<div class="config-card highlight">

- **URL**: `secrandom://main/roll`
- **IPC**: `main/roll`
- **Function**: Open roll call interface

</div>

### Lottery Interface
<div class="config-card highlight">

- **URL**: `secrandom://main/lottery`
- **IPC**: `main/lottery`
- **Function**: Open lottery interface

</div>

### Main Interface
<div class="config-card highlight">

- **URL**: `secrandom://main`
- **IPC**: `main`
- **Function**: Open main interface

</div>

## Settings Page Commands

### Basic Settings
<div class="config-card">

- **URL**: `secrandom://settings/basic`
- **IPC**: `settings/basic`
- **Function**: Open basic settings interface

</div>

### List Settings
<div class="config-card">

- **URL**: `secrandom://settings/list`
- **IPC**: `settings/list`
- **Function**: Open list management settings interface

</div>

### Extraction Settings
<div class="config-card">

- **URL**: `secrandom://settings/extraction`
- **IPC**: `settings/extraction`
- **Function**: Open extraction-related settings interface

</div>

### Floating Window Settings
<div class="config-card">

- **URL**: `secrandom://settings/floating`
- **IPC**: `settings/floating`
- **Function**: Open floating window settings interface

</div>

### Notification Settings
<div class="config-card">

- **URL**: `secrandom://settings/notification`
- **IPC**: `settings/notification`
- **Function**: Open notification settings interface

</div>

### Security Settings
<div class="config-card">

- **URL**: `secrandom://settings/safety`
- **IPC**: `settings/safety`
- **Function**: Open security settings interface

</div>

### Custom Settings
<div class="config-card">

- **URL**: `secrandom://settings/custom`
- **IPC**: `settings/custom`
- **Function**: Open custom settings interface

</div>

### Voice Settings
<div class="config-card">

- **URL**: `secrandom://settings/voice`
- **IPC**: `settings/voice`
- **Function**: Open voice settings interface

</div>

### History Settings
<div class="config-card">

- **URL**: `secrandom://settings/history`
- **IPC**: `settings/history`
- **Function**: Open history settings interface

</div>

### More Settings
<div class="config-card">

- **URL**: `secrandom://settings/more`
- **IPC**: `settings/more`
- **Function**: Open more settings interface

</div>

### Update Settings
<div class="config-card">

- **URL**: `secrandom://settings/update`
- **IPC**: `settings/update`
- **Function**: Open update settings interface

</div>

### About Settings
<div class="config-card">

- **URL**: `secrandom://settings/about`
- **IPC**: `settings/about`
- **Function**: Open about information interface

</div>

### Settings Main Interface
<div class="config-card">

- **URL**: `secrandom://settings`
- **IPC**: `settings`
- **Function**: Open settings main interface

</div>

## Tray Function Commands

### Toggle Display
<div class="config-card">

- **URL**: `secrandom://tray/toggle`
- **IPC**: `tray/toggle`
- **Function**: Toggle main interface display status

</div>

### Open Settings
<div class="config-card">

- **URL**: `secrandom://tray/settings`
- **IPC**: `tray/settings`
- **Function**: Open settings via tray

</div>

### Floating Window Control
<div class="config-card">

- **URL**: `secrandom://tray/float`
- **IPC**: `tray/float`
- **Function**: Toggle floating window display status

</div>

### Restart Program
<div class="config-card warning">

- **URL**: `secrandom://tray/restart`
- **IPC**: `tray/restart`
- **Function**: Restart SecRandom program

</div>

### Exit Program
<div class="config-card warning">

- **URL**: `secrandom://tray/exit`
- **IPC**: `tray/exit`
- **Function**: Exit SecRandom program

</div>

## Data Retrieval Commands (Read Only)

### Get Roll Call List
<div class="config-card theme">

- **URL**: `secrandom://data/roll_call_list`
- **IPC**: `data/roll_call_list`
- **Function**: Get current roll call list data

</div>

### Get Lottery List
<div class="config-card theme">

- **URL**: `secrandom://data/lottery_list`
- **IPC**: `data/lottery_list`
- **Function**: Get current lottery list data

</div>

### Get Roll Call History
<div class="config-card theme">

- **URL**: `secrandom://data/roll_call_history`
- **IPC**: `data/roll_call_history`
- **Function**: Get roll call history records

</div>

### Get Lottery History
<div class="config-card theme">

- **URL**: `secrandom://data/lottery_history`
- **IPC**: `data/lottery_history`
- **Function**: Get lottery history records

</div>

## Usage Examples

<div class="tip-box">

### URL Protocol Usage

**Create Shortcut**
1. Right-click desktop → New → Shortcut
2. Enter URL protocol (e.g., `secrandom://main`)
3. Name shortcut and complete creation

**Batch Script**
```batch
@echo off
echo Starting SecRandom main interface...
start secrandom://main
```

**Browser Call**
```html
<a href="secrandom://main">Open SecRandom</a>
```

### IPC Protocol Usage

**Python Example**
For complete Python usage examples, please refer to: [secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)

**JavaScript Example**
For complete JavaScript usage examples, please refer to: [secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

### Notes

1. **Protocol Registration**: Ensure SecRandom has correctly registered URL protocols
2. **Security Considerations**: Only use protocols listed in official documentation
3. **Parameter Validation**: Ensure parameter values are correct when using parameters
4. **Error Handling**: It is recommended to add error handling mechanisms when using protocols
5. **IPC Communication**: IPC protocol requires program to be in running state to use

### Troubleshooting

**Protocol Cannot Open**
- Check if SecRandom is correctly installed
- Reinstall software to fix protocol registration
- Check if system security software is blocking protocol calls
- If all above factors are excluded, report bug to developer

**IPC Communication Failed**
- Confirm SecRandom program is running
- Check if IPC service is started normally
- View software logs for detailed error information

</div>

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