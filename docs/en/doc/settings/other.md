---
title: Other Settings
createTime: 2026/08/14 10:00:00
---

# Other Settings

::: tip Version Notice
This document corresponds to the **v3** settings pages (page management, shortcuts, updates, about, logs, etc.). v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Deep customization** - Page management, global shortcuts, update strategy and about info in one place.

## Page Management

### Enable Lottery
**Description**: whether to enable the lottery feature

- On: shows the lottery entry
- Off: hides the lottery entry and rejects lottery shortcuts and external commands

### Roll Call Control Panel Position
**Description**: show the roll call page control panel on the left or right side of the main content

- Left / Right

### Roll Call Page Controls
**Description**: control which controls appear in the roll call page side panel

Available: Reset Button, Count Adjust, Start Button, List Select, Range Select, Gender Select, Remaining List Button, Count Statistics

### Lottery Control Panel Position
**Description**: show the lottery page control panel on the left or right side of the main content

- Left / Right

### Lottery Page Controls
**Description**: control which controls appear in the lottery page side panel

Available: Reset Button, Quantity Adjust, Start Button, Pool Select, Member List Select, Range Select, Gender Select, Remaining List Button, Prize Count Statistics

## Shortcuts

### Enable Shortcuts
**Description**: enable global shortcut responses

### Shortcut List
| Shortcut | Function |
|----------|----------|
| Open Roll Call Page | open the roll call page (e.g. Ctrl+Alt+R) |
| Execute Quick Draw | execute a quick draw (e.g. Ctrl+Alt+Q) |
| Open Lottery Page | open the lottery page (e.g. Ctrl+Alt+L) |
| Increase Roll Call Count | increase roll call count |
| Decrease Roll Call Count | decrease roll call count |
| Increase Lottery Quantity | increase lottery quantity |
| Decrease Lottery Quantity | decrease lottery quantity |
| Start/Stop Roll Call | start or stop roll call |
| Start/Stop Lottery | start or stop lottery |

### Setting Shortcuts
1. Expand the corresponding shortcut setting
2. Press the desired combination (e.g. `Ctrl+Alt+R`)
3. `Esc` cancels input

**Notes**:
- Combinations already assigned to other actions show a "conflict" warning
- "Clear Shortcut" removes a set combination

## Update Settings

### Auto Update Mode
**Description**: when a new version is found by automatic checks, choose to notify, download or install

| Option | Description |
|--------|-------------|
| **Off** | do not check for updates automatically |
| **Auto-check and Notify** | notify when a new version is found |
| **Auto-check and Download** | download the new version automatically |
| **Auto-check and Install** | download and install the new version automatically |

### Update Channel
**Description**: choose stable or preview updates

- **Stable**: official releases
- **Preview**: preview releases (incl. beta/alpha)

### Update Source
**Description**: choose the update check source

| Option | Description |
|--------|-------------|
| **Auto (Recommended)** | tries SECTL official, GitHub mirror and GitHub in order |
| **SECTL** | official distribution (stable updates only) |
| **GitHub Mirror** | GitHub mirror source |
| **GitHub** | GitHub official source |

### Check for Updates
Click **"Check for Updates"** to check the latest version on the current channel. Only checks the signed full release manifest; does not download in the background.

**Force Check for Updates**: checks the latest version on the current channel even if it is lower than the current version.

### Update Status
- Last check time
- Update status: not checked / checking / up to date / update available / downloading / verifying / ready to install / restarting to apply

::: tip
Before deployment, the signed release manifest and the artifact's length and hash are verified to ensure the package is complete and trustworthy.
:::

## About

The "About SecRandom" page shows:
- App icon, name, version
- Banner
- Open source license (GNU GPLv3)
- Support & community links (QQ group, Bilibili, Afdian, etc.)
- Thanks to contributors

## Log Viewer

The "Log Viewer" page shows program run logs for troubleshooting. It also supports opening the log directory from the software.

## Open Specific Directories

Supported from within the software:
- **Log Directory**: run log location
- **Data Directory**: lists, history, proofs and other data
- **App Directory**: program installation location

## Feedback

Submit bug reports and feature suggestions directly from the software (based on Sentry reporting).

## Debug

The Debug page is for development and testing some software features (normal users generally don't need it).

## Related Pages

- Basic behavior settings: see [Basic Settings](/en/doc/settings/general-basic)
- Floating window: see [Floating Window Settings](/en/doc/settings/floating-window)
