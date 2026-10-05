---
title: List Management
createTime: 2026/08/14 10:00:00
---

# List Management

::: tip Version Notice
This document corresponds to the **v3** "Settings → List Management" page. Settings may change with versions; please refer to the actual interface.
:::

> **Efficient management** - Create, import, export and maintain roll call lists and lottery pools through an intuitive list management interface.

## List Structure

v3's list management contains two pages with the same layout: pick a list first, then maintain its entries in the table.

| Page | Description |
|------|-------------|
| **Member Lists** | Manage multiple student lists; the table holds ID/Number, name, gender, group and tags |
| **Lottery Lists** | Manage multiple prize pools; the table holds ID/Number, prize name, weight, quantity and tags |

---

## 1. Member Lists

### 1.1 Current List

**Current List**: choose the member list to view or import

- Switch the current list via the dropdown
- After switching, the member table below refreshes to that list's data

### 1.2 List Operations

- **New List**: create a new roll call list
- **Rename**: rename the current list
- **Delete List**: delete the current list (irreversible)

### 1.3 Member Management

- **Add Member**: enter ID/Number or Name (at least one), optionally gender, group, tags
- **Edit Member**: change any field of the member; clear the **"Exists"** checkbox to exclude the member from drawing
- **Delete Member**: delete selected members
- **Refresh**: refresh the member list

#### Fairness Tip When Adding Members
When all existing members in a list have non-zero draw counts, adding new members may increase their draw probability with fair drawing. The software asks whether to **delete this list's history**; clearing it improves fair drawing.

### 1.4 Import Member List

After clicking the **"Import List"** button, pick an **import method** at the top of the drawer:

| Import method | Data source | Network required |
|---------------|-------------|------------------|
| **From an Excel/CSV file** | A local spreadsheet file | No |
| **Quick QR import** | A QR code shown by another device | Both devices online |
| **Offline QR import** | Multi-frame QR codes shown by another device | No |
| **Session code import** | A 12-character session code from another device | Yes |

Whichever method you use, the data goes through a preview first; click **"Import"** to write it into the current list.

#### 1.4.1 Import from an Excel/CSV file

**Supported formats**: `.xlsx`, `.xls`, `.csv` (you can pick the import region yourself)

**Steps**:
1. Click **"Choose an Excel/CSV file"** and select the file
2. Confirm the worksheet, header row and data row range in **"Import Region"**
3. Set **column mapping**:
   - ID/Number column, Name column (at least one)
   - Gender, Group, Tags columns (optional)
4. Preview the data to import
5. Handle duplicate names (keep duplicates / auto-rename)
6. Confirm the overwrite prompt (if the current list has members)
7. Click **"Import"** to finish

**Import Region** settings:

| Setting | Description |
|---------|-------------|
| **Worksheet** | Shown when the file contains several worksheets; switching reloads the file for that worksheet. Hidden for CSV and single-worksheet files |
| **Header row** | Auto-detected from keywords such as ID/name/gender/group/tags within the first 10 rows; when nothing is recognized, the first row is used and a hint is shown, and you can set it manually |
| **No header** | Choosing "No header (use A, B, C as column names)" falls back to Excel column letters |
| **Data row range** | Start and end rows given as **original spreadsheet row numbers** (1-based, exactly what you see in Excel); anything outside the region is ignored |
| **Raw row preview** | Shows 5 rows around the header row; **click any row to make it the header row**. For later rows, use the "Header row" dropdown |

**Notes**:
- Rows where both ID/Number and Name are empty are not imported
- When the region contains no data rows, the drawer reports "no importable data rows in the current import region, please adjust it"
- The system uses internal identifiers to distinguish records; duplicates do not cause data confusion

::: tip Title rows or blank rows at the top of the sheet?
No need to trim the file by hand: point **Header row** at the real title row and narrow the **Data row range** to the data itself — trailing total rows and blank rows are excluded too.
:::

#### 1.4.2 Quick QR import

Both devices must be online; the QR code holds a single frame:

1. On the other device, choose **"Quick QR export to another device"**
2. On this device, choose "Quick QR import" — the camera opens automatically, and you can pick a camera from the dropdown first
3. Point the camera at the QR code on the other device
4. The list is fetched automatically; check the preview and click **"Import"**

#### 1.4.3 Offline QR import

No network at all: the other device cycles the whole list through multi-frame QR codes, and this device reassembles it by scanning continuously.

1. On the other device, choose **"Offline export to another device"**
2. On this device, choose "Offline QR import" and keep the QR code steady in the camera view
3. The panel shows transfer progress, speed, transferred/total size, new/duplicate/invalid frames, session and elapsed time
4. Once the transfer completes, check the preview and click **"Import"**

::: warning Camera hints
- If camera permission is denied or the camera fails to start, the drawer explains why — switch to file import or session code import instead
- Offline QR import is more sensitive to image quality; fill the view with the QR code and keep it stable
:::

#### 1.4.4 Session code import

Requires a network connection:

1. On the other device, choose **"Session code export to another device"** to get a 12-character session code
2. Enter the code (12 letters or digits); verification starts automatically once all 12 characters are entered
3. After verification succeeds, check the preview and click **"Import"**

Editing the code cancels the previous verification, and an invalid or expired code is reported in the drawer.

#### 1.4.5 What happens on every import

- The preview shows the first 3 rows so you can confirm the column mapping
- For duplicate names you can choose **"Keep duplicates"** (the system distinguishes records by internal identifier), **"Auto-rename"**, or **"Go back and edit"**
- If the current list already has members, a prompt warns that this import overwrites the current list

### 1.5 Export Member List

After clicking the **"Export List"** button, pick an **export method** first:

| Export method | Description |
|---------------|-------------|
| **Export to file** | Save as an `.xlsx` or `.csv` file |
| **Quick QR export to another device** | Generate a pairing QR code; other devices fetch the list online by scanning it |
| **Offline export to another device** | Cycle multi-frame QR codes; the other device scans them without any network |
| **Session code export to another device** | Generate a 12-character session code with a copy button |

**Notes**:
- While a quick QR export or a session code export is running, the sync portal address (`secrandom-sync.sectl.cn`) is shown; opening it in another device's browser receives the list file without installing anything
- Click **"Stop Export"** to end the transfer early

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
- **Edit Prize**: change any field of the prize; clear the **"Exists"** checkbox to exclude the prize from drawing
- **Delete Prize**: delete selected prizes

### 2.4 Import Lottery Pool

After clicking the **"Import Pool"** button, the import methods are exactly the same as for member lists:

- **From an Excel/CSV file** (`.xlsx`, `.xls`, `.csv`; worksheet, header row and data row range are selectable too)
- **Quick QR import**
- **Offline QR import**
- **Session code import**

Only the **column mapping** differs:

- ID/Number column, prize name column (at least one)
- Weight, quantity, tags columns (optional)

Preview, duplicate handling and the overwrite prompt work the same way as for member lists.

### 2.5 Export Lottery Pool

Like member list export, four methods are available: **export to file** (`.xlsx`/`.csv`), **quick QR export**, **offline export** and **session code export**.

---

## 3. Cross-Device Transfer (New in v3)

Lists and settings can both be moved between this device and another one. The four methods — **file / quick QR / offline QR / session code** — are shared by list import, list export, and the export/import settings entries under "More options" in the settings page:

| Method | Characteristics |
|--------|-----------------|
| **File** | The most universal option, handing over an exported file; lists support `.xlsx`/`.csv` |
| **Quick QR** | Generates a pairing QR code; the other device scans it and fetches the data from the sync service. Fast, but requires network |
| **Offline QR** | Encodes the data into cycling multi-frame QR codes; works fully offline, slower for large data |
| **Session code** | A 12-character code you can read out or send as text; requires network |

**Notes**:
- Transfer has size limits: the payload of quick QR and session code through the sync service is capped at **1 MiB**, and offline QR at **300 KiB**
- The list is **encrypted locally before upload**: quick QR carries the decryption key inside the QR code, while session code derives the key from the code itself and only a hash of the code reaches the service
- Camera scanning supports selecting platform cameras (Windows/Linux/macOS/Android)
- Only lists and settings are transferred; security credentials (password, TOTP, USB binding) are never included

---

## Related Pages

- Picking settings (default list/pool): see [Picking Settings](/en/doc/settings/pick)
- History: see [History](/en/doc/settings/history)
- Backup and restore: see [Backup](/en/doc/settings/backup)
