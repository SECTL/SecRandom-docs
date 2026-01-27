---
title: Basic Settings
createTime: 2025/11/24 23:43:05
---

# SecRandom Basic Settings Documentation

## Overview

Basic Settings is the core configuration interface of SecRandom software, used to manage the software's basic functions, appearance, and data. This document will introduce the functionality and usage of each setting item in detail.

## Settings Interface Structure

The Basic Settings interface is divided into three main parts:

1. **Basic Functions** - Configure core software function options
2. **Personalization** - Customize software appearance and user experience
3. **Data Management** - Manage software data import and export

---

## 1. Basic Function Settings

### 1.1 Simplified Settings Mode

**Function Description**: Hide advanced setting items and display only recommended settings

**Applicable Scenarios**:
- First-time users using the software
- Simple usage scenarios that don't require complex configuration

**Operation Method**: Click the toggle button to enable or disable

**Effect**:
- When enabled, the settings interface will only display basic and commonly used setting items
- When disabled, all available setting options will be displayed

---

### 1.2 Startup with System

**Function Description**: Set whether the software starts automatically with the system

**Applicable Scenarios**:
- Users who need to use the software daily
- Users who want the software to always run in the background

**Operation Method**: Click the toggle button to enable or disable

**Notes**:
- Administrator privileges are required to set startup with system
- If the setting fails, an error prompt will be displayed

---

### 1.3 Show Main Window on Startup

**Function Description**: Set whether the main window is automatically displayed when the software starts

**Applicable Scenarios**:
- Enabled: The main interface is displayed immediately after startup, facilitating quick operation
- Disabled: The software runs in the background after startup, suitable for scenarios that require background residence

**Operation Method**: Click the toggle button to enable or disable

---

### 1.4 Auto Save Window Size

**Function Description**: Whether to automatically save the window size

**Applicable Scenarios**:
- Enabled: When the software starts next time, the window will restore to the size and position when it was last closed
- Disabled: The software uses the default window size every time it starts

**Operation Method**: Click the toggle button to enable or disable

---

### 1.5 Background Residence

**Function Description**: Whether to remain resident in the background after closing all windows

**Applicable Scenarios**:
- Enabled: After closing the main window, the software still runs in the background and can be reopened through the tray icon or other methods
- Disabled: The software completely exits after closing the main window

**Operation Method**: Click the toggle button to enable or disable

**Notes**:
- This setting needs to be used together with "Show Main Window on Startup"
- It is recommended to enable this when you need the software to stay in the background

---

### 1.6 URL Protocol Registration & IPC Service

**Function Description**: Register custom URL protocol (secrandom://) and enable IPC communication, supporting link launching and external integration

**Applicable Scenarios**:
- Need to launch the software from a browser or other applications through links
- Need to interact with other applications
- Need to receive external commands to control the software

**Operation Method**: Click the toggle button to enable or disable

**Usage Examples**:
```
secrandom://roll_call/start  # Start roll call function
secrandom://lottery/draw     # Start lottery function
```

**Notes**:
- Administrator privileges are required to register the URL protocol
- If registration fails, an error prompt will be displayed
- After enabling, the software can receive external URL protocol calls

---

## 2. Personalization Settings

### 2.1 Theme Mode

**Function Description**: Select the software interface theme style

**Available Options**:
- **Light**: Use light theme, suitable for daytime use
- **Dark**: Use dark theme, suitable for nighttime use, eye protection
- **Follow System**: Automatically switch according to system theme

**Operation Method**: Select the theme mode in the dropdown box

**Effect**: Takes effect immediately, no need to restart the software

---

### 2.2 Theme Color

**Function Description**: Set the software interface theme color

**Operation Method**: Click the color picker to select your favorite color

**Effect**: Takes effect immediately, no need to restart the software

**Application Scope**:
- Button colors
- Highlight colors
- Accent colors

---

### 2.3 Display Language

**Function Description**: Switch the software interface language

**Available Languages**:
- Simplified Chinese (ZH_CN)
- English (EN_US)

**Operation Method**: Select the language in the dropdown box

**Notes**:
- Need to restart the software to take effect
- After restart, all interface text will switch to the selected language

---

### 2.4 DPI Scaling

**Function Description**: Adjust the software interface scaling ratio

**Available Options**:
- 100% - Original size
- 125% - Scale 1.25x
- 150% - Scale 1.5x
- 175% - Scale 1.75x
- 200% - Scale 2x
- Auto - Automatically adjust according to system DPI settings

**Operation Method**: Select the scaling ratio in the dropdown box

**Applicable Scenarios**:
- Interface is too small on high-resolution screens
- Need larger fonts and icons
- Users with visual impairments

**Notes**:
- Need to restart the software to take effect

---

### 2.5 Font

**Function Description**: Set the software interface display font

**Operation Method**: Select the font in the dropdown box

**Notes**:
- Need to restart the software to take effect
- Select fonts installed on the system

---

### 2.6 Font Weight

**Function Description**: Set the software interface font weight

**Available Options**:
- Extra Light
- Thin
- Light
- Regular
- Medium
- Semi Bold
- Bold
- Extra Bold
- Black

**Operation Method**: Select the font weight in the dropdown box

**Notes**:
- Need to restart the software to take effect
- Different fonts may support different weights

---

## 3. Data Management

### 3.1 Export Settings

**Function Description**: Export current settings to a configuration file for backup and migration

**Operation Method**:
1. Click the "Export Settings" button
2. Select the save location
3. Confirm export

**Export Content**:
- All basic settings
- Personalization settings
- Other function settings

**Applicable Scenarios**:
- Backup current configuration
- Migrate settings between different devices
- Share configuration with other users

---

### 3.2 Import Settings

**Function Description**: Import settings from a configuration file, overwriting current configuration information

**Operation Method**:
1. Click the "Import Settings" button
2. Select the configuration file
3. Confirm import

**Notes**:
- Import will overwrite all current settings
- Need to restart the software after import to take effect
- It is recommended to backup current settings before importing

---

### 3.3 Export All Data

**Function Description**: Export all data and settings when exiting the software

**Operation Method**:
1. Click the "Export All Data" button
2. Confirm export warning
3. Select the save location
4. Wait for export to complete

**Export Content**:
- Software version information
- All settings configuration
- Roll call lists
- Lottery lists
- History records
- Log files

**Notes**:
- Exported data may contain sensitive information, please keep it safe
- The export process may take some time, depending on the data volume

---

### 3.4 Import All Data

**Function Description**: Restore all data from a backup file when starting the software

**Operation Method**:
1. Click the "Import All Data" button
2. Select the backup file
3. Confirm import warning
4. Wait for import to complete

**Notes**:
- Import will overwrite all current data
- Need to restart the software after import to take effect
- If versions don't match, a warning prompt will be displayed
- Some files may be skipped due to being in use

---

### 3.5 Export Diagnostic Data

**Function Description**: Export diagnostic information when exiting the software for troubleshooting

**Operation Method**:
1. Click the "Export Diagnostic Data" button
2. Confirm export warning
3. Select the save location
4. Wait for export to complete

**Export Content**:
- Software information
- Settings configuration
- Roll call lists
- Lottery lists
- History records
- Log files

**Applicable Scenarios**:
- Provide to developers when encountering software issues
- Technical support needs diagnostic information

**Notes**:
- Exported data may contain sensitive information
- Please confirm it is safe before sharing diagnostic data

---

### 3.6 View Logs

**Function Description**: View and manage program log files

**Operation Method**: Click the "View Logs" button

**Functions**:
- View program running logs
- Search log content
- Export log files
- Clear logs

**Applicable Scenarios**:
- Troubleshoot software issues
- View software running status
- Technical support needs log information

---

### 3.7 Backup Management

**Function Description**: Manage automatic and manual backups

**Operation Method**: Click the "Backup Management" button

#### 3.7.1 Automatic Backup

**Function Description**: Configure automatic backup strategy

**Setting Items**:
- **Enable**: Enable or disable automatic backup
- **Auto Backup Interval**: Set automatic backup interval (days)
- **Auto Backup Limit**: Set the maximum number of automatic backups to keep (0 for unlimited)
- **Last Successful Backup**: Display the last successful backup time

**Operation Method**:
1. Set each parameter in the "Automatic Backup" tab
2. Click the "Enable" button to enable automatic backup

#### 3.7.2 Manual Backup

**Function Description**: Immediately backup and manage backup files

**Operation Method**:
1. In the "Manual Backup" tab
2. Click the "Backup Now" button to create a backup
3. Click the "View Backup Files" button to open the backup folder
4. View the backup folder size

**Backup Content**:
- Configuration files (config)
- List data (list)
- Language files (Language)
- History records (history)
- Audio resources (audio)
- CSES integration (CSES)
- Image resources (images)
- Running logs (logs)

**Notes**:
- You can control whether to include certain types of data through toggles
- After disabling an item, that folder will not be packaged into the backup file

#### 3.7.3 Restore Backup

**Function Description**: Select a backup file and restore it (takes effect after restart)

**Operation Method**:
1. In the "Restore Backup" tab
2. Click the "Refresh" button to update the backup file list
3. Select the backup file to restore from the list
4. Click the "Restore" button
5. Confirm the restore operation
6. Wait for restore to complete
7. Restart the software to apply changes

**Notes**:
- Restore will overwrite all current settings and data
- Restore operation cannot be undone
- It is recommended to backup current data before restoring
- You can delete unnecessary backup files

---

## 4. Best Practices

### 4.1 Daily Usage Recommendations

1. **Regular Backup**: It is recommended to perform a complete data backup once a week
2. **Enable Automatic Backup**: Set up automatic backup to prevent data loss
3. **Set Theme Reasonably**: Choose an appropriate theme based on your usage environment to protect your eyes
4. **Adjust DPI Scaling**: Adjust the interface size based on screen resolution and personal preferences

### 4.2 Data Migration Recommendations

1. **Backup Before Export**: Export current data as a backup before performing data migration
2. **Version Compatibility**: Ensure that the imported data is compatible with the current software version
3. **Step-by-Step Import**: Import settings first, confirm there are no issues, then import other data

### 4.3 Troubleshooting Recommendations

1. **View Logs**: When encountering problems, first check the log files to understand detailed information
2. **Export Diagnostic Data**: If technical support is needed, export diagnostic data and provide it to developers
3. **Restore Default Settings**: If problems persist, try restoring default settings

---

## 5. Summary

Basic Settings is the core configuration interface of SecRandom software. Through reasonable configuration, you can:

- Improve software user experience
- Protect important data from loss
- Quickly troubleshoot and solve problems
- Migrate data between different devices

It is recommended that users configure each setting reasonably according to their usage habits and needs, and regularly backup data.
