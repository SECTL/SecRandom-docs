---
title: List Management
createTime: 2026/08/14 10:00:00
---

# List Management

::: tip Version Notice
This document corresponds to the **v3** "Settings → List Management" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Efficient management** - Create, import, export and maintain roll call lists and lottery pools through an intuitive list management interface.

## List Structure

v3's list management contains four sub-pages:

| Page | Description |
|------|-------------|
| **Roll Call Lists** | Manage multiple student lists |
| **Roll Call Table** | Manage roll call list data in table form |
| **Lottery Lists** | Manage multiple prize pools |
| **Lottery Table** | Manage lottery pool data in table form |

---

## 1. Roll Call Lists

### 1.1 Current List

**Current List**: choose the member list to view or import

- Switch the current list via the dropdown
- After switching, the member list below refreshes to that list's data

### 1.2 List Operations

- **New List**: create a new roll call list
- **Rename**: rename the current list
- **Delete List**: delete the current list (irreversible)

### 1.3 Member Management

- **Add Member**: enter ID/Number or Name (at least one), optionally gender, group, tags
- **Delete Member**: delete selected members
- **Refresh**: refresh the member list

#### Fairness Tip When Adding Members
When all existing members in a list have non-zero draw counts, adding new members may increase their draw probability with fair drawing. The software asks whether to **delete this list's history**; clearing it improves fair drawing.

### 1.4 Import Member List

**Supported formats**: `.xlsx`, `.xls`, `.csv` (first row as column names)

**Steps**:
1. Click the **"Import List"** button
2. Select a local file (Excel/CSV)
3. Set **column mapping**:
   - ID/Number column, Name column (at least one)
   - Gender, Group, Tags columns (optional)
4. Preview the data to import
5. Handle duplicate names (keep duplicates / auto-rename)
6. Confirm the overwrite prompt (if the current list has members)
7. Click **"Import"** to finish

**Notes**:
- Rows where both ID/Number and Name are empty are not imported
- The system uses internal identifiers to distinguish records; duplicates do not cause data confusion

### 1.5 Export Member List

1. Click the **"Export List"** button
2. Choose the save path and file format
3. Click **"Save"** to finish

---

## 2. Lottery Lists (Pools)

### 2.1 Current Pool

**Current Pool**: choose the lottery pool to view or import

### 2.2 Pool Operations

- **New Pool**: create a new pool
- **Rename**: rename the current pool
- **Delete Pool**: delete the current pool (irreversible)

### 2.3 Prize Management

- **Add Prize**: enter ID/Number or prize name (at least one), optionally weight, quantity, tags
  - Weight and quantity must be valid numbers greater than 0
- **Delete Prize**: delete selected prizes

### 2.4 Import Lottery Pool

**Supported formats**: `.xlsx`, `.xls`, `.csv` (first row as column names)

**Steps**:
1. Click the **"Import Pool"** button
2. Select a local file (Excel/CSV)
3. Set **column mapping**:
   - ID/Number column, prize name column (at least one)
   - Weight, quantity, tags columns (optional)
4. Preview, handle duplicates, confirm overwrite, then import

### 2.5 Export Lottery Pool

Similar to roll call list export: choose the save path and format, then export.

---

## 3. List Transfer (New in v3)

v3 supports transferring lists between devices via QR codes, session codes, etc.:

### Export to Another Device
- **QR Code Export**: encode the list/settings as a QR code; scan it with another device to import
- **Session Code Export**: generate a session code; enter it on another device to transfer
- **Quick/Offline Export**: export quickly via a local file

### Import from Another Device
- **Camera Scan**: scan the QR code shown on another device with the camera (camera selection supported)
- **Session Code Import**: enter the other device's session code
- **File Import**: choose the file exported from the other device

**Notes**:
- List transfer has a unified transfer size limit
- Camera scanning supports selecting platform cameras (Windows/Linux/macOS/Android)
- Cloud sync links and copy buttons are supported

---

## Related Pages

- Picking settings (default list/pool): see [Picking Settings](/en/doc/settings/pick)
- History: see [History](/en/doc/settings/history)
