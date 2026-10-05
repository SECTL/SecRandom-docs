---
title: History
createTime: 2026/08/14 10:00:00
---

# History

::: tip Version Notice
This document corresponds to the **v3** "Settings → History" page. Settings may change with versions; please refer to the actual interface.
:::

> **Records you can review** - View and manage roll call and lottery history to continuously improve draw strategy.

## History Page

History contains two tabs:
- **Roll Call History**: view roll call draw records
- **Lottery History**: view lottery draw records

## Roll Call History

### Select List
**Description**: choose the member list to view

### View Mode
**Description**: choose the history view mode

| Mode | Description |
|------|-------------|
| **All Records** | aggregated statistics for all members in this list |
| **View by Time** | view each draw record chronologically |

### Statistics (All Records Mode)
- **Name**: member name
- **Roll Call Count**: total times the member was drawn
- **Number/ID**: member number
- **Gender**: member gender
- **Group**: member group
- **Roll Call Mode**: draw type (random draw / fair draw)
- **Roll Call Count**: number of people drawn each time

### View by Time
- Lists each draw record chronologically
- Shows draw time, draw type, number of people, course, etc.

## Lottery History

### Select Pool
**Description**: choose the lottery pool to view

### View Mode
- **All Records**: aggregated statistics for all prizes in this pool
- **View by Time**: view each draw record chronologically

### Statistics (All Records Mode)
- **Name**: prize name
- **Win Count**: total times the prize was drawn
- **Number**: prize number
- **Draw Quantity**: number of prizes drawn each time

## Courses & Breaks

### Course Label
History records show the **course** (subject) each draw belongs to.

### Break Assignment
When linkage is enabled, draws during breaks are assigned per configuration:
- **Previous Course**
- **Next Course**
- **Break**

::: tip
When subject history filtering is enabled, fair drawing only uses the current subject's history for weight calculation.
:::

## Refresh

Click **"Refresh"** to reload history data.

## Export History

Under Settings → History, **"Export history"** exports the two kinds of records separately:

| Item | Description |
|------|-------------|
| **Export roll-call history** | With list, course, time-range and sort options; every export covers all members of the selected lists |
| **Export lottery history** | With pool, time-range and sort options; every export covers all prizes of the selected pools |

**Steps**:
1. Expand the item to export (roll-call history / lottery history)
2. Choose the **export scope** (a list or pool, or "All lists"/"All pools"), the course, the time range and the **time order**
3. Choose the **file format**: Excel (`.xlsx`) or CSV (`.csv`)
4. Click **"Export"**

**Notes**:
- One list (or pool) writes one file; several are packaged as a ZIP
- The summary sheet includes members or prizes that were **never drawn**, not just the drawn records

## Related Pages

- Fair draw weights: see [Picking Settings](/en/doc/settings/pick)
- Course linkage: see [Linkage Settings](/en/doc/settings/link)
