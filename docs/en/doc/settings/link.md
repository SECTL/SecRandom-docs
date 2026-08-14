---
title: Linkage Settings
createTime: 2026/08/14 10:00:00
---

# Linkage Settings

::: tip Version Notice
This document corresponds to the **v3** "Settings → Linkage Settings" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Course linkage** - Connect schedule data sources so draws stay in sync with course time.

## Course Linkage

### Data Source
**Description**: choose the course or external linkage data source

| Option | Description |
|--------|-------------|
| **Off** | course linkage disabled |
| **CSES Schedule** | use the CSES schedule file (`cses_schedule.yml`) |
| **ClassIsland** | get course info via the ClassIsland app |

### Restrict Operations Outside Class Time
**Description**: when the course source clearly shows a break or non-class period, restrict draws and resets; off means no restriction

### Allow Continue After Verification
**Description**: only effective when non-class-time restriction is enabled

- On: passing the configured security verification can temporarily continue draws or resets
- Off: draws/resets are directly blocked during non-class time

### Hide Floating Window After Class
**Description**: automatically hide the floating window when the course ends

## CSES Schedule

### Import Schedule
1. Click the **"Import Schedule"** button
2. Select the CSES schedule file
3. After import, it is parsed automatically and a summary is shown

### View Summary
Shows the schedule summary: total N classes, earliest/latest time.

### Clear Schedule
Click **"Clear Schedule"** to remove the imported schedule.

### Schedule Format Validation
Import validates the schedule format:
- File cannot be empty
- Root node must be an object
- Must contain valid classes
- Each class's start time must be before its end time
- Class times on the same weekday cannot overlap

::: tip
The CSES schedule file is at `data/CSES/cses_schedule.yml` (desktop).
:::

## Before/After Class

### Pre-class Reset
**Description**: automatically reset temporary draw records before class

### Pre-class Reset Time
**Description**: how many seconds before class the pre-class reset runs

### Pre-class Unlock Time
**Description**: how many seconds before class the break restriction is lifted early

### Post-class Disable Delay
**Description**: how many seconds after the course ends the related draw entries are disabled

## Subject History

### Subject History Filtering
**Description**: only use the current subject's history when calculating weights

### Break Assignment
**Description**: choose how history records during breaks are assigned

| Option | Description |
|--------|-------------|
| **Previous Course** | break draws are assigned to the previous course |
| **Next Course** | break draws are assigned to the next course |
| **Break** | break draws are separately marked as "break" |

::: tip
With subject history filtering enabled, fair draw weight calculation is separated by course, making each class's draws more balanced.
:::

## Notes

- Only confirmed course break times restrict local draws/resets or hide the floating window; missing data, disconnected or unknown states allow normal operation
- ClassIsland connection failures, timer not running, schedule disabled or not loaded show corresponding error messages

## Related Pages

- Security verification (linkage operation protection): see [Security Settings](/en/doc/settings/security)
- Course labels in history: see [History](/en/doc/settings/history)
