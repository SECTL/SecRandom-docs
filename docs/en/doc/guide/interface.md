---
title: Interface Introduction
createTime: 2026/08/14 10:00:00
---

# Interface Introduction

::: tip Version Notice
This document corresponds to the **v3** interface. v3 is built with C#/.NET and Avalonia + FluentAvalonia; details may change with versions, please refer to the actual interface.
:::

## Interface Overview

SecRandom v3 adopts the Microsoft Fluent Design language, built on **Avalonia + FluentAvalonia** to deliver a modern cross-platform UI. The main window uses FluentAvalonia's `NavigationView` for smooth navigation and a consistent visual style. The interface remembers window size, auto-centers, and saves maximized state for a comfortable experience.

## Theme & Personalization

### Theme Mode
- **Light**: For bright environments, clear and crisp
- **Dark**: For dim environments, reduces eye strain
- **Follow System**: Automatically switches with the system theme

### Theme Color Customization
- Custom accent color (follow system or custom)
- Applied to buttons, progress bars and other UI elements

### Font Personalization
- Default font: **MiSans**
- Multiple weights (ExtraLight/Thin/Light/Regular/Medium/SemiBold/Bold/ExtraBold/Black)
- Live preview (Chinese, English, numbers and symbols samples)

::: tip
These settings are in **Settings → Personalized → Appearance**.
:::

## Main Interface Navigation

### Roll Call Page
- Features: random roll call, roll call history, roll call settings
- Draw by list scope, group, gender and quantity
- Quick jump via URL protocol and IPC calls

### Lottery Page
- Features: lottery drawing, prize management, lottery history
- Prize board / inventory drawing, weight settings, fair draw algorithm
- View remaining list (remaining prizes)

### History Page
- Features: view roll call and lottery history
- Filter by list/pool, all records / by time view
- Shows draw mode (random/fair), draw quantity, course/break info

### Quick Draw
- Quickly draw students via an independent floating window
- No window switching needed in class; one-click draw

### Floating Window
- Main floating window: roll call / quick draw / lottery entries, customizable controls
- Edge docking, no-focus mode, auto-hide on foreground window, long-press actions

### Settings Page
- Features: global settings management
- Grouped by v3: General (Basic/Security/Backup/Privacy), Personalized (Appearance/Floating Window/Music), List Management, Picking Settings, Reminder Settings (Voice & Music/Notification), History, Linkage Settings, Verifiable Drawing, More Settings

## System Tray Menu

### Quick Actions
- Show/Hide main window
- Show/Hide floating window
- Open settings
- About SecRandom

### App Control
- Restart application
- Exit application

## Other Interface Features

### Version in Title Bar
The main window title bar shows the current version number.

### About Page
- App icon, name and version info
- Banner display
- Open source license, support and thanks

### Crash Recovery Screen
After a crash, restarting shows a recovery page (with error info); choose to auto-restart or view logs.

### Mobile Interface
Android/iOS mobile builds use native Avalonia controls with FluentAvalonia settings items; a bottom navigation bar provides Roll Call / Lottery / History entries.
