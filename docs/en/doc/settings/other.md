---
title: Other Settings
createTime: 2026/08/14 10:00:00
---

# Other Settings

::: tip Version Notice
This document corresponds to the **v3** settings pages (page management, shortcuts, updates, about, logs, etc.). Settings may change with versions; please refer to the actual interface.
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

## More Options

The **"More options..."** menu at the top right of the settings page gathers the log, diagnostics and data migration entries:

| Menu item | Description |
|-----------|-------------|
| **View Logs** | opens the log viewer (see "Log Viewer" below) |
| **Export Diagnostic Data** | immediately exports sanitized runtime information and restricted logs for troubleshooting |
| **Export Settings** | exports the current settings as a SecRandom v3 settings file (`.json`) |
| **Import Settings** | imports settings only from a SecRandom v3 settings file, overwriting the current configuration |
| **Export All Data** | exports all non-credential data and settings (`.zip`) |
| **Import All Data** | imports all data only from a SecRandom v3 backup |
| **Announcements** | opens the announcements page |
| **Feedback** | opens the feedback drawer for bug reports or feature suggestions |
| **Open Log / Data / App Directory** | opens the corresponding directory in the file manager |

### Export Diagnostic Data

Two packages are offered:

- **Standard package**: all sanitized logs and runtime information
- **Extended package**: everything in the standard package plus a sanitized settings snapshot, profile count summary and sanitized crash reports

Neither package contains lists, history contents or security credentials.

### Export / Import Settings and All Data

- **Export Settings** and **Import Settings** each offer four methods: **export to file / import from file**, **quick QR**, **offline QR** and **session code** (see [List Management](/en/doc/settings/listmg) for how each method works)
- **Export All Data** packages all non-credential data and settings; **Import All Data** only accepts SecRandom v3 backups

::: warning A snapshot is created before importing
Confirming an import first creates a recovery snapshot (a settings snapshot for importing settings, a full snapshot for importing all data); nothing is imported if the snapshot fails. Security credentials such as the password, TOTP, USB binding and lock state are never imported.
:::

## Log Viewer

The "Log Viewer" page shows program run logs for troubleshooting. It also supports opening the log directory from the software.

## Open Specific Directories

Supported from within the software:
- **Log Directory**: run log location
- **Data Directory**: lists, history, proofs and other data
- **App Directory**: program installation location

## Announcements

The "Announcements" page shows official announcements (with pinned entries); click **"Refresh announcements"** to fetch them again. When loading fails the page reports that the announcement service cannot be reached and asks you to check your network.

## Feedback

Two entry points: **More options... → Feedback**, and **"In-app feedback"** on the crash recovery page.

**Description**: Submit bug reports, feature or experience suggestions directly from the software

**Steps**:
1. Choose the feedback type (bug / new feature / improvement)
2. Fill in the short title, expected behavior, actual result, reproduction steps and other details in the form
3. Optionally enter a contact email so we can reply when needed
4. Click **"Submit feedback"**

**Notes**:
- Submitting automatically generates and uploads the same **sanitized ZIP attachment** as "Export Diagnostic Data" to help locate the problem
- If that ZIP exceeds the upload limit the feedback is not submitted; clear the logs and retry, or use [GitHub Issues](https://github.com/SECTL/SecRandom/issues) instead

## Debug

The Debug page is for development and testing some software features (normal users generally don't need it).

## Related Pages

- Basic behavior settings: see [Basic Settings](/en/doc/settings/general-basic)
- Floating window: see [Floating Window Settings](/en/doc/settings/floating-window)
