---
title: Software Guide
createTime: 2026/08/14 10:00:00
---

# Software Setup Guide

Welcome to SecRandom! On first launch, the initial setup wizard will help you complete the necessary confirmations and basic configuration. This guide walks through every step of the setup flow.

::: tip Version Notice
This document corresponds to the **v3** initial setup flow. v3 is in Alpha stage; details may change with versions, please refer to the actual interface.
:::

## Setup Flow Overview

The setup wizard contains **8 steps** (a welcome page + 7 configuration/confirmation pages). Complete them in order to finish the initial configuration:

| Step | Page | Content | Estimated Time |
|------|------|---------|----------------|
| 1 | [Welcome](#1-welcome) | App logo, title and language selection | 10 sec |
| 2 | [Verifiable Drawing Notice](#2-verifiable-drawing-notice) | Understand the two modes and boundaries of verifiable drawing | 1 min |
| 3 | [Privacy Policy](#3-privacy-policy) | Read and confirm the privacy policy | 1 min |
| 4 | [GPLv3 License](#4-gplv3-license) | Read and confirm the open source license | 1 min |
| 5 | [Basic Settings](#5-basic-settings) | Appearance, theme and other basic configuration | 1 min |
| 6 | [List Management](#6-list-management) | Import or create roll call/lottery lists | 5 min |
| 7 | [Enhanced Features](#7-enhanced-features) | Voice, music, linkage and other optional features | 3 min |
| 8 | [Complete](#8-complete) | Finish the setup and enter the main interface | 10 sec |

::: tip
Completing the whole flow takes about 10-15 minutes. List management is optional; you can skip it and set it up later.
:::

---

## 1. Welcome

### Page Content
- Displays the SecRandom logo and title
- **Language selector** at the bottom left; takes effect immediately (no restart needed)

### Steps
1. Choose your preferred language (中文 / English / 日本語)
2. Click **"Start"** to continue

::: tip
Switching language refreshes the interface text and keeps the current flow; it does not exit the wizard.
:::

---

## 2. Verifiable Drawing Notice

### Page Content
The "About Verifiable Drawing" explanation is collapsed by default. Expand it and confirm:

**Normal Mode**
- Records the candidate pool, weights, draw rules, random material and results
- Can complete local draws offline and save replayable proofs (`.srproof.json`)
- When online, new draws are submitted to fair.sectl.cn for independent replay and signing
- The signature can detect tampering with the proof file after submission

**Formal Notarization Mode**
- First locks the anonymous candidate pool, weights and rules to fair.sectl.cn
- The server generates random material, computes the result and saves an immutable official proof
- If network fluctuation, disconnection or service unavailability prevents obtaining the server completion proof, no local substitute result is produced and the mode is not switched automatically
- Prevents replacement of local draw code, random material and result files after the flow is locked; still cannot prove the real-world list is complete and authentic, or that the pool was not filtered before submission

### Steps
1. Expand and read the verifiable drawing explanation
2. Check **"I have read and understood the above limitations"**
3. Click **"Next"** to continue

::: warning Confirmation Required
You must check the confirmation box to continue.
:::

---

## 3. Privacy Policy

### Page Content
Shows the SecRandom privacy policy (version 1). Key terms include:

- **Local Data**: Lists, prizes, history and settings are stored locally by default
- **Sentry Telemetry**: When enabled, may upload crashes, logs, traces and performance data (can be disabled)
- **Online Status Statistics**: Normal reporting includes approximate location; anonymous reporting only counts online users
- **Choice & Change**: These privacy options can be changed anytime in **Settings → General → Privacy**

### Steps
1. Read the full privacy policy
2. Check **"I agree to the privacy policy"**
3. Click **"Next"** to continue

---

## 4. GPLv3 License

### Page Content
Shows the GNU GPLv3 license notice:

- SecRandom is released under the GPLv3 license
- GPLv3 allows running, studying, modifying and redistributing the software
- When distributing modified versions, you must comply with the copyleft terms, provide the corresponding source code and distribute under GPLv3

### Steps
1. Read the GPLv3 notice
2. Check **"I agree to the GPLv3 license"**
3. Click **"Next"** to continue

::: tip
When the privacy policy or GPL version is updated, the software re-opens the corresponding confirmation page and asks for re-confirmation.
:::

---

## 5. Basic Settings

### Page Content
Configure basic appearance and behavior:
- **Theme Mode**: Light / Dark / Follow system
- **Theme Color**: Choose the interface accent color
- **Font**: Interface font family and weight (default MiSans)
- **Launch on Startup**: Whether to auto-start with the system (optional)
- **Crash Recovery**: Choose how the program recovers after a crash

### Steps
1. Adjust the appearance options as needed
2. Click **"Next"** to continue

::: tip
These settings can be changed later in **Settings → General → Basic** and **Settings → Personalized → Appearance**.
:::

---

## 6. List Management

### Page Content
Create your first usable list:
- **Roll Call List**: Import or create a student list (supports `.xlsx`, `.xls`, `.csv`)
- **Lottery Pool**: Import or create a prize pool (optional)

### Steps
1. Click **"Import"** and select a list file (Excel/CSV)
2. Configure **column mapping** in the import dialog (ID/Number, Name, Gender, Group, Tags)
3. Verify the data in the preview area
4. Click **"Import"** to finish

::: warning Note
- Select at least the ID/Number column or the Name column
- Rows where both are empty are not imported
- For duplicate names you can choose "keep duplicates" or "auto-rename"; the system uses internal identifiers to distinguish records
:::

::: tip
List management is optional. If skipped, you can create and import lists anytime in **Settings → List Management**.
:::

---

## 7. Enhanced Features

### Page Content
Configure optional enhanced features:
- **Voice Broadcast**: Choose the voice engine (System voice / Edge TTS) and voice
- **Music Library**: Import draw background music (MP3/WAV/FLAC)
- **Course Linkage**: Connect CSES schedule or ClassIsland (optional)
- **Lottery Switch**: Whether to enable the lottery feature

### Steps
1. Configure voice, music and other options as needed
2. Click **"Next"** to continue

::: tip
These features can be changed later in **Settings → Reminder Settings**, **Settings → Personalized → Music** and **Settings → Linkage Settings**.
:::

---

## 8. Complete

### Page Content
- Shows the completion notice
- Provides related links (official docs, QQ group, issue tracker, etc.)

### Steps
1. Click **"Finish"**
2. The software automatically opens the **main window**; start using it

::: tip
After the wizard, the software enters the normal startup flow and opens the main interface. You can view version and support info in **Settings → About** anytime.
:::

---

## FAQ

### Can I skip the privacy policy confirmation during setup?
No. The privacy policy, GPLv3 and verifiable drawing notice all require explicit confirmation before continuing. This is a necessary step for first-time use.

### Can I change the language after setup?
Yes. Change it in **Settings → General → Basic → Display Language** (some versions require a restart).

### What if importing a list fails during setup?
Check the file format (`.xlsx`, `.xls`, `.csv` supported, first row as column names) and confirm the column mapping is correct. You can also skip the import and handle it later in **Settings → List Management**.
