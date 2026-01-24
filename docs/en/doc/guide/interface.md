---
title: Interface Guide
createTime: 2025/11/29 12:58:02
---

# SecRandom Interface Guide

## Interface Overview

SecRandom adopts the Fluent Design design language, building a modern user interface based on the PySide6 and qfluentwidgets frameworks. The main window inherits from FluentWindow, providing smooth navigation experience and consistent visual style. The interface supports features like window size memory, automatic centering, and maximized state preservation, ensuring users get a comfortable experience.

## Themes and Personalization

### Preset Theme Options

#### Light Theme
- Suitable for bright environments, providing a clear and crisp visual experience
- Enabled via Theme.LIGHT configuration

#### Dark Theme
- Suitable for low-light environments, reducing eye strain
- Enabled via Theme.DARK configuration
- Supports auto theme mode (Theme.AUTO) that automatically switches based on system settings

#### Custom Theme Color
- Supports custom theme colors via hexadecimal color codes or color names
- Theme colors apply to buttons, progress bars, and other interface elements for personalized appearance

#### Font Personalization
- Built-in HarmonyOS Sans SC font family
- Supports multiple font weights (Light/Medium/Bold)
- Supports loading custom font files

## Main Interface Navigation

### Core Feature Areas

#### Roll Call Page
- Icon: ic_fluent_people_20_filled
- Features: Random roll call, roll call history, roll call settings
- Supports quick navigation via URL protocol and IPC calls

#### Lottery Page
- Icon: ic_fluent_gift_20_filled
- Features: Lottery drawing, prize management, lottery history
- Supports weight settings and fair drawing algorithms

#### History Page
- Icon: ic_fluent_history_20_filled
- Features: View roll call and lottery history records
- Supports data statistics and historical data export

#### Settings Page
- Icon: ic_fluent_settings_20_filled
- Features: Global settings management
- Includes multiple sub-modules: basic settings, drawing settings, history management, list management, notification settings, voice settings, security settings, etc.

#### Navigation Bar Personalization
- Supports custom navigation item positions (top/bottom/hidden)
- Interface layout can be adjusted according to user preferences

## System Tray Menu

### Quick Action Panel

#### Interface Control
- Show/Hide Main Window: Quickly toggle main window display state
- Show/Hide Floating Window: Control floating window display
- Open Settings: Quick access to settings page
- About SecRandom: Display application information

#### Application Control
- Restart Application: Quickly restart the program
- Exit Application: Safely exit the program

#### Tray Features
- Supports automatic right-click menu closing
- Menu position intelligently adjusted to avoid exceeding screen boundaries
- Supports triggering tray operations via URL commands and IPC calls
