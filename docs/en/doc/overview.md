---
title: Overview
createTime: 2026/08/14 10:00:00
---

# Welcome to SecRandom!

> **SecRandom stands as a beacon at the intersection of fairness and randomness**  
> A random selection tool for classrooms, teams, events, decision-making and more, ensuring every choice is fair and transparent.

::: danger Version Warning
The **v3 version is currently in Alpha stage** and should not be used in production. It may contain unknown bugs and is intended for user experience only. If you encounter issues, please report them on [GitHub Issues](https://github.com/SECTL/SecRandom/issues)!
:::

<span id="sys_cpb_tip" style="display: block; padding-top: 80px; margin-top: -80px;"></span>
::: warning System Compatibility Notice
Important Notice: Starting from version v1.3.1.5, SecRandom has stopped support for Windows 7 and 32-bit systems. We strongly recommend using Windows 10 or higher for continued features and stable updates.
Windows 7 and x86 users can download and use version v1.3.1.5 [here](https://github.com/SECTL/SecRandom/releases/tag/v1.3.1.5).
:::

::: tip Cross-Platform Support
Starting from v3, SecRandom is rebuilt with **C#/.NET and Avalonia**, officially supporting Windows, Linux, macOS, and mobile platforms (Android/iOS).
:::

::: info Open Source License
SecRandom is open source under the GNU GPL-3.0 license. You are free to use, modify, and distribute this software, but modified versions must also be open source under the GPL-3.0 license.
:::

# Quick Start

## What is it?

**[SecRandom](https://github.com/SECTL/SecRandom)** is a fair random selection system for classrooms, teams, events, decision-making and other scenarios, using intelligent dynamic weight algorithms to ensure every member gets fair selection opportunities. SecRandom v3 is built with **C#/.NET 10**, using **Avalonia + FluentAvalonia** for cross-platform UI, and adopts Microsoft Fluent Design language, combining **fairness, ease of use, and aesthetics**.

### Core Advantages

- **Zero Learning Curve**: Intuitive interface, easily complete random selection
- **Multi-scenario Coverage**: Full coverage of roll call/lottery, single/multiple/group/gender selection
- **Algorithm Guarantee**: Cryptographic-level random algorithm with intelligent dynamic weights ensuring fairness
- **Verifiable Drawing**: Draw process can be recorded, replayed, and notarized, with results auditable
- **Privacy Protection**: Local encrypted storage, data never exposed and protected from malicious tampering
- **Modern Design**: Win11 Fluent Design inspired, clean and elegant

## Applicable Scenarios

- **Classroom Roll Call**: Randomly select members without subjective bias
- **Random Grouping**: Fairly assign group tasks, promoting team collaboration
- **Question Lottery**: Boost engagement
- **Annual Meeting Lottery**: Fairly distribute prizes, enhance event fun
- **Team Grouping**: Randomly form project teams, promote cross-department collaboration
- **Welfare Distribution**: Fairly distribute employee benefits, demonstrate corporate care
- **Competition Selection**: Randomly determine contestant appearance order
- **Activity Organization**: Random lottery, lucky audience selection
- **Fair Opportunity Distribution**: Any scenario requiring fair random selection

## Core Features

### Draw Modes

#### Roll Call Mode
- Supports drawing by list scope, group, gender, and quantity, fitting real-world scenarios
- Supports normal random, history-balanced, and repetition control
- Single/multiple selection with rich draw animations

#### Quick Draw Mode
- Quickly draw students through an independent floating window without switching windows
- Supports shortcut keys and customizable buttons

#### Lottery Mode
- Supports prize board and inventory drawing, with independent student and prize management
- Dual-mode drawing for prize pools and lists, suitable for event draws, display order, and incentives

### Fairness & List Management
- Dynamically adjusts weights based on history count, draw interval, group, gender, etc., reducing repetition and distribution imbalance
- Uses stable internal identifiers to maintain history; student IDs, numbers, and names are display-only
- Supports multiple lists and prize pools with `.xlsx`, `.xls`, `.csv` import, mapping, and preview
- Every draw round saves history for query and review
- Supports batch avatar setting for members/prizes

### Auditable Draw Results
- Every draw automatically saves a proof record file (`.srproof.json`)
- Optional server participation to witness the draw process (formal notarization mode)
- Results can be re-checked through official channels

### Data, Privacy & Security
- Settings, lists, and history can be imported, exported, backed up, and restored
- Backups can include lists, history, draw proofs, images, audio, etc., but never passwords or security credentials
- Supports password, TOTP, or USB drive protection for important operations
- Supports crash recovery with error display and automatic restart

## Verification Boundaries

| Mode | What it can do | What it cannot prove |
|---|---|---|
| Offline proof | Replay a completed draw | Not a pre-draw server witness; cannot prove the local program or real-world list was not tampered with |
| Online witness | Protect the draw flow after server lock-in | Cannot prove the list is authentic, complete, or was not filtered before submission |

## Technology Evolution

| Version | Tech Stack | Stage |
| --- | --- | --- |
| v1 | Python + PyQt5 + qfluentwidgets | Initial desktop implementation |
| v2 | Python + PySide6 + qfluentwidgets | Qt stack evolution |
| **v3** | **C# + Avalonia + FluentAvalonia** | .NET desktop rebuild, continuously developing draw, verification, and desktop integration capabilities |

## Download & Updates

- [GitHub Releases](https://github.com/SECTL/SecRandom/releases) provides release packages and update notes for all versions
- [Official Download Page](https://stk.sectl.cn/SecRandom) provides the latest version entry
- Auto-update verifies the signed release manifest and artifact length/hash before deployment; refer to each release's packages and notes

## Support & Community

- [Afdian Support](https://afdian.com/a/lzy0983)
- [Email](mailto:lzy.12@foxmail.com)
- [QQ Group 833875216](https://qm.qq.com/q/iWcfaPHn7W)
- [QQ Channel](https://pd.qq.com/s/4x5dafd34?b=9)
- [Bilibili](https://space.bilibili.com/520571577)
- [Issue Tracker](https://github.com/SECTL/SecRandom/issues)
- [Official Documentation](https://secrandom.sectl.cn/doc/overview.html)
