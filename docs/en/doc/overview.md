---
title: Overview
createTime: 2025/11/25 14:24:16
---

# Welcome to SecRandom!

> **SecRandom stands as a beacon at the intersection of fairness and randomness**  
> A random selection tool carefully designed for classrooms, teams, activities and more, ensuring every choice is fair and transparent.

::: warning System Compatibility Notice
Important Notice: Starting from version v1.3.1.5, SecRandom has stopped support for Windows 7 and 32-bit systems. We strongly recommend using Windows 10 or higher for continued features and stable updates.
Windows 7 and x86 users can download and use version v1.3.1.5 [here](https://github.com/SECTL/SecRandom/releases/tag/v1.3.1.5).
:::

::: tip Linux Support Notice
Starting from version 2.0, SecRandom will officially provide support for Linux operating systems, offering deb format packages for x86 architecture.
:::

::: info Open Source License
SecRandom is open source under the GNU GPL-3.0 license. You are free to use, modify, and distribute this software, but modified versions must also be open source under the GPL-3.0 license.
:::

# Quick Start

## What is it?

**[SecRandom](https://github.com/SECTL/SecRandom)** is a fair random selection system designed specifically for educational scenarios, using intelligent dynamic weight algorithms to ensure every member gets fair selection opportunities. SecRandom is built with Python 3.13.5, uses PySide6 + PySide6-Fluent-Widgets for UI, and adopts Microsoft Fluent Design language, combining **fairness, ease of use, and aesthetics**.

### Core Advantages

- **Zero Learning Curve**: Intuitive interface, easily complete random selection
- **Multi-scenario Coverage**: Full coverage of roll call/lottery, single/multiple/group/gender selection
- **Algorithm Guarantee**: Cryptographic-level random algorithm with intelligent dynamic weights ensuring fairness
- **Privacy Protection**: Local encrypted storage, data never exposed and protected from malicious tampering
- **Modern Design**: Win11 Fluent Design inspired, clean and elegant

## Applicable Scenarios

### Education
- **Classroom Roll Call**: Randomly select students to answer questions, avoiding subjective bias
- **Random Grouping**: Fairly assign group tasks, promoting team collaboration
- **Question Lottery**: Enliven classroom atmosphere, stimulate student participation

### Corporate Events
- **Annual Meeting Lottery**: Fairly distribute prizes, enhance event fun
- **Team Grouping**: Randomly form project teams, promote cross-department collaboration
- **Welfare Distribution**: Fairly distribute employee benefits, demonstrate corporate care

### Other Scenarios
- **Competition Selection**: Randomly determine contestant appearance order
- **Activity Organization**: Random lottery, lucky audience selection
- **Fair Opportunity Distribution**: Any scenario requiring fair random selection

## ::lucide:star:: Core Features

### ::lucide:dices:: Selection Modes

#### Roll Call Mode
- **Single Person Selection**: Randomly choose one student
- **Multiple Person Selection**: Select multiple students at once
- **Group Selection**: Extract by preset group rules
- **Gender Selection**: Precise selection by gender criteria

#### Lottery Mode
- **Prize Weight Setting**: Different prizes can have different winning probabilities
- **Prize Pool Management**: Flexible management of prize information
- **Result Display**: Clear display of winners and prizes

#### Quick Selection
- **Floating Window Selection**: Call up small floating window anytime for quick selection
- **Shortcut Key Support**: Customizable shortcut keys, one-click selection
- **Uninterrupted Teaching**: Selection process doesn't affect normal teaching flow

### ::lucide:settings:: Smart Settings

#### Fair Selection Algorithm
SecRandom uses intelligent dynamic weight algorithms combined with average value difference protection mechanisms to ensure every member gets fair selection opportunities:

- **Dynamic Weight**: The more times someone is selected, the lower their probability of being selected again
- **Cold Start Protection**: New members or long-unselected members won't lose opportunities due to low weights
- **Average Value Filtering**: Only members with selection count ≤ average are allowed in the candidate pool
- **Maximum Gap Protection**: When the gap between maximum and minimum selection counts exceeds a threshold, extreme values are excluded
- **Candidate Pool Size Guarantee**: Ensure candidate pool is not smaller than the set minimum size
- **Real-time Probability Visualization**: Display each member's selection probability, fairness is visible

### ::lucide:database:: Data Management

#### List Management
- **Multi-list Support**: One program manages multiple class lists, simpler operation
- **List Import**: Support Excel (.xls/.xlsx), CSV format file import
- **List Export**: Support exporting student lists, convenient for backup and migration
- **Student Information**: Complete information including name, student ID, gender, group, avatar

#### History Records
- **Complete Records**: Automatically record time and results of each selection
- **Record Filtering**: Support filtering history by time, mode, etc.
- **Auto Cleanup**: Can set automatic cleanup of expired records
- **Data Statistics**: Selection count statistics, weight analysis

### ::lucide:shield-check:: Privacy & Security

#### Multi-layer Protection
- **Password Protection**: Support setting password to protect settings page
- **TOTP Two-factor Authentication**: Support time-based one-time passwords
- **USB Binding**: Support binding USB devices as security verification
- **Data Encryption**: Sensitive data encrypted storage, prevent malicious tampering
- **Local Storage**: Data never exposed, fully under your control

### User Experience

#### Modern Design
- **Theme Switching**: Light/Dark theme auto-switching, adapt to different environments
- **Smooth Animations**: Exquisite selection animation experience
- **System Tray**: System tray resident, convenient quick access
- **Startup on Boot**: Windows system supports startup on boot, ready in background

#### Voice Broadcast
- **Edge TTS**: Support Microsoft Edge voice engine, clear and natural voice
- **Local Voice**: Support local pyttsx3 voice engine
- **Instant Broadcast**: Selection results instantly voice broadcast, whole class knows

#### Software Integration
- **ClassIsland Integration**: Support integration with ClassIsland software for more convenient roll call result display
- **IPC/URL Call**: Support calling through IPC/URL interface, seamless integration with other software

## ::lucide:play:: Quick Start

### ::lucide:download:: 1. Download and Install

Get the latest version from [Download Page](/download), choose the appropriate installation package for your operating system:

- **Windows Users**: Download .exe installer or .zip archive
- **Linux Users**: Download .deb installation package

### ::lucide:rocket:: 2. Launch Program

- **Windows**: Double-click `SecRandom.exe` to launch the program
- **Linux**: Launch through application menu or command line

### ::lucide:list:: 3. Import List

1. Click the "Settings" button in the top right corner of the main interface
2. Select "List Management"
3. Click the "Import List" button
4. Select Excel (.xls/.xlsx) or CSV format student list file
5. Confirm import information, complete list import

### ::lucide:settings:: 4. Configure Parameters (Optional)

1. Go to "Settings" page
2. Configure selection parameters as needed:
   - Selection mode (single/multiple/group/gender)
   - Number of selections
   - Whether to enable dynamic weights
   - Whether to enable voice broadcast
   - Theme settings, etc.

### ::lucide:dices:: 5. Start Selection

1. Return to main interface
2. Select selection mode (roll call/lottery)
3. Set selection parameters
4. Click "Start Selection" button
5. View selection results

### ::lucide:history:: 6. View History Records

1. Click the "History Records" button on the main interface
2. View all selection history
3. Support filtering and exporting history records

## ::lucide:clipboard-check:: System Requirements

### Windows
- **Operating System**: Windows 10 or higher (Windows 7 not supported)
- **Architecture**: x64 (32-bit systems not supported)
- **Recommended Configuration**: 4GB RAM or higher

### Linux
- **Operating System**: Mainstream Linux distributions (Ubuntu, Debian, Fedora, etc.)
- **Architecture**: x64
- **Note**: Some features may be limited (such as startup on boot, certain system-level features)

### ::lucide:life-buoy:: Not Supported
- **macOS**: macOS is not currently supported

## ::lucide:users:: Join Community

- **Official Website**: [https://secrandom.sectl.top](https://secrandom.sectl.top)
- **GitHub**: [Give us a Star](https://github.com/SECTL/SecRandom)
- **QQ Group**: 833875216 [Click to Join](https://qm.qq.com/q/PCqYgev4Em)
- **Discord**: [Join Server](https://discord.gg/PmE7nPbha)
- **Bilibili**: [Follow Us](https://space.bilibili.com/520571577)
- **Afdian Support**: [Support Project Development](https://afdian.com/a/lzy0983)
- **Feedback**: Welcome to contact us anytime

---

> **Make every random selection meaningful, let every fairness shine bright!**
>
> **Zero Learning Curve** · **Fair & Transparent** · **Privacy Protection** · **Modern & Elegant**