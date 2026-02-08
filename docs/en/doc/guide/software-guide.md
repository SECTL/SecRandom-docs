---
title: Software Guide
createTime: 2026/01/24 22:55:00
---

# Software Guide ::lucide:rocket::

Welcome to SecRandom! When you launch the software for the first time, the setup wizard will help you complete the initial configuration. This guide will provide detailed instructions for each step of the setup process.

## ::lucide:clipboard-list:: Guide Overview

The software setup includes the following **9 pages**. Complete them in order to finish the initial software configuration:

| Step | Page | Content | Estimated Time |
|------|------|---------|----------------|
| ::lucide:circle-1:: | [Welcome Page](#1-welcome-page) | Display app logo and title | 10 seconds |
| ::lucide:circle-2:: | [Language Selection Page](#2-language-selection-page) | Select application language | 30 seconds |
| ::lucide:circle-3:: | [License Agreement Page](#3-license-agreement-page) | Agree to license agreement and disclaimer | 1 minute |
| ::lucide:circle-4:: | [Data Migration Page](#4-data-migration-page) | Import old data (optional) | 2 minutes |
| ::lucide:circle-5:: | [Basic Settings Page](#5-basic-settings-page) | Simplified mode, theme, theme color | 1 minute |
| ::lucide:circle-6:: | [List Management Page](#6-list-management-page) | Student list, class management | 5 minutes |
| ::lucide:circle-7:: | [Enhanced Features Page](#7-enhanced-features-page) | TTS, music, ClassIsland integration | 3 minutes |
| ::lucide:circle-8:: | [Test Page](#8-test-page) | Test various features | 2 minutes |
| ::lucide:circle-9:: | [Links Page](#9-links-page) | Complete setup, view related links | 30 seconds |

::: tip Tip
Completing the entire setup process takes approximately 15-20 minutes. Data migration and list management are optional steps that you can skip and complete later in settings.
:::

---

## ::lucide:circle-1:: Welcome Page

### ::lucide:layout:: Page Content

- Displays SecRandom logo and title
- Simple welcome interface

### ::lucide:mouse-pointer-click:: Operation Steps

Click the **"Start"** button to proceed to the next step.

---

## ::lucide:circle-2:: Language Selection Page

### ::lucide:layout:: Page Content

- Provides multiple language options
- Language change requires restarting the application to take effect

### ::lucide:mouse-pointer-click:: Operation Steps

1. Select your preferred language from the dropdown list (e.g., "中文", "English")
2. Click "Next" to continue

::: warning Note
Language changes require restarting the application to take effect.
:::

---

## ::lucide:circle-3:: License Agreement Page

### ::lucide:layout:: Page Content

Contains two tabs:

- **License Agreement**: Displays GPL license agreement
- **Disclaimer**: Displays software disclaimer

### ::lucide:mouse-pointer-click:: Operation Steps

1. **Read Agreement**: Switch between the two tabs and read the agreement content completely
2. **Scroll to Bottom**: Must scroll to the bottom of the agreement to check the agreement option
3. **Check Agreement**:
   - ::lucide:check:: Agree to License Agreement
   - ::lucide:check:: Agree to Disclaimer
4. Click "Next" to continue

::: warning Must Agree
You must check both "Agree to License Agreement" and "Agree to Disclaimer" to proceed to the next step.
:::

---

## ::lucide:circle-4:: Data Migration Page

### ::lucide:layout:: Page Content

- Provides manual import of old data functionality
- If you have used SecRandom before, you can import data from the old version

### ::lucide:mouse-pointer-click:: Operation Steps

#### If You Need to Import Data

1. Click the "Import" button
2. Select the old version data file
3. Wait for the import to complete
4. Import successfully and automatically jump to the last page

#### If You Do Not Need to Import Data

Click "Next" to skip this step directly.

::: info Optional Step
Data migration is an optional step. If you are using it for the first time or do not need to import old data, you can skip this step.
:::

---

## ::lucide:circle-5:: Basic Settings Page

### ::lucide:layout:: Page Content

Configure the basic appearance and behavior settings of the software.

### ::lucide:mouse-pointer-click:: Operation Steps

#### ::lucide:circle-1:: Simplified Mode

- **On**: Hide advanced functions, simpler interface
- **Off**: Show all functions, suitable for advanced users
- **Recommended**: Recommended to turn off for first-time use to understand all functions

#### ::lucide:circle-2:: Theme Settings

Select interface theme:

| Option | Description |
|------|------|
| **Light** | Light theme, suitable for daytime use |
| **Dark** | Dark theme, suitable for night use, eye protection |
| **Follow System** | Automatically follow system theme settings |

#### ::lucide:circle-3:: Theme Color

Choose your favorite theme color to customize the software appearance.

::: tip Suggestion
It is recommended to select the "Follow System" theme, so that the software will automatically switch between light/dark modes according to system settings.
:::

---

## ::lucide:circle-6:: List Management Page

### ::lucide:layout:: Page Content

Manage student lists and class information.

### ::lucide:mouse-pointer-click:: Operation Steps

#### ::lucide:circle-1:: Create Class

1. Enter class name (e.g., "Grade 1 (3)")
2. Click "Create" button

#### ::lucide:circle-2:: Import Student List

**Method 1: Manual Input**
- Enter student names line by line
- Optional: Enter gender, group information

**Method 2: Excel Batch Import (Recommended)**

```
Excel Table Format:
| Student ID | Name | Gender | Group |
|------------|------|--------|-------|
| 01         | John | Male   | A     |
| 02         | Jane | Female | B     |
```

**Operation Steps**:
1. Prepare Excel table, ensure the first row is column names
2. Click "Import" button
3. Select Excel file
4. System automatically identifies column names and imports data

#### ::lucide:circle-3:: Create Prize Pool (Optional)

1. Switch to Lottery Mode
2. Enter prize pool name (e.g., "Final Exam Prizes")
3. Enter prize names line by line
4. Set prize weights (higher weight means higher probability of winning)

::: info Optional Step
List management is an optional step. You can continue configuring it later in settings.
:::

---

## ::lucide:circle-7:: Enhanced Features Page

### ::lucide:layout:: Page Content

Contains three tabs to configure enhanced features of the software.

### ::lucide:mouse-pointer-click:: Operation Steps

#### Tab 1: TTS Settings

Configure text-to-speech function:

| Setting | Description |
|--------|------|
| **Voice Engine** | Select TTS voice engine |
| **Edge TTS Voice Name** | Select specific voice (e.g., "Microsoft Xiaoxiao Online") |
| **Volume** | Adjust voice volume |
| **Speed** | Adjust voice playback speed |

#### Tab 2: Music Settings

Configure background music:

| Setting | Description |
|--------|------|
| **Animation Music** | Music played during drawing animation |
| **Result Music** | Music played when drawing result is displayed |
| **Music Volume** | Adjust music volume |
| **Fade In/Out** | Set music fade in/out effect |

#### Tab 3: ClassIsland Integration

Configure integration with ClassIsland:

| Setting | Description |
|--------|------|
| **Data Source Settings** | Configure ClassIsland data source |
| **CSes Import** | Import ClassIsland course data |
| **Notification Service** | Set notification service type (0=Off, 1/2=On) |
| **Dismiss Bell** | Configure dismiss bell function |

::: info Optional Step
Enhanced features are optional steps. You can continue configuring them later in settings.
:::

---

## ::lucide:circle-8:: Test Page

### ::lucide:layout:: Page Content

Test if the features you configured are working properly.

### ::lucide:mouse-pointer-click:: Operation Steps

#### ::lucide:circle-1:: Test TTS Voice

- Click "Test Voice" button
- Listen if voice broadcast is normal
- If there is a problem, return to the previous step to adjust settings

#### ::lucide:circle-2:: Test Music Playback

- Click "Test Animation Music" button
- Click "Test Result Music" button
- Check if music plays normally
- If there is a problem, return to the previous step to adjust settings

#### ::lucide:circle-3:: Test ClassIsland Integration

- Click "Test Integration" button
- Check if connection with ClassIsland is normal
- If there is a problem, return to the previous step to adjust settings

::: tip Suggestion
It is recommended to test all functions to ensure correct configuration before continuing.
:::

---

## ::lucide:circle-9:: Links Page

### ::lucide:layout:: Page Content

Provides related links for you to get more information and support.

### ::lucide:mouse-pointer-click:: Operation Steps

#### View Links

| Link | Description |
|------|------|
| **GitHub** | View source code and submit issues |
| **Bilibili** | Watch video tutorials |
| **Documentation** | View detailed documentation |
| **Organization Site** | Learn about organization info |
| **Feedback** | Submit feedback |

#### Complete Setup

Click **"Finish"** button to end the setup process.

::: tip Setup Completed
After setup is complete, the software will remember your configuration. If you need to reconfigure, you can find relevant options in settings.
:::

---

## ::lucide:party-popper:: Congratulations on Completing Setup!

You have completed the initial configuration of SecRandom! You can now start using the software.

### ::lucide:play:: Quick Start

| Action | Shortcut |
|------|----------|
| **Random Roll Call** | Right-click tray icon → "Roll Call" |
| **Random Lottery** | Right-click tray icon → "Lottery" |
| **View History** | Right-click tray icon → "History" |
| **Open Settings** | Right-click tray icon → "Settings" |

### ::lucide:footprints:: Next Steps

- ::lucide:book-open:: Read [User Interface Introduction](../guide/interface.md) to learn more about interface functions
- ::lucide:settings:: View [Software Settings Tutorial](../settings/basic.md) to learn deeply about various settings
- ::lucide:target:: Explore [Core Functions](../core-functions/person-extraction.md) to unleash the full potential of the software

---

## ::lucide:life-buoy:: Need Help?

If you encounter problems during the configuration process, you can get help through the following ways:

- ::lucide:library:: View [FAQ](../../faq/trouble.md)
- ::lucide:message-circle:: Join [QQ Group](https://qm.qq.com/q/PCqYgev4Em)
- ::lucide:bug:: Submit [GitHub Issues](https://github.com/SECTL/SecRandom/issues)

::: tip Feedback
Your feedback is very important to us! If you have any suggestions or find problems, please feel free to tell us.
:::
