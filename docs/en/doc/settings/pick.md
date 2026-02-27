---
title: Drawing Settings
createTime: 2026/01/02 15:29:12
---

> **Personalize your drawing experience**
>
> Through rich customization options, create a drawing style and floating window experience exclusive to you.

## ::lucide:settings:: Drawing Settings

Drawing settings include three independent features: **Roll Call Settings**, **Quick Draw Settings**, and **Lottery Settings**. Each feature includes drawing function, display settings, and animation settings.

### ::lucide:library:: Roll Call Settings

#### ::lucide:dices:: Drawing Function

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Drawing Mode** | Dropdown | Repetitive/Non-repetitive/Semi-repetitive | Controls drawing logic |
| **Clear Record Method** | Dropdown | Manual/Auto/No Clear | Automatically disabled in repetitive mode |
| **Semi-repetitive Count** | Number Input | 0-100 | Enabled in semi-repetitive mode, sets repeat count |
| **Drawing Method** | Dropdown | By Class/By Gender/By Range | Controls drawing range |
| **Default Drawing List** | Dropdown | Dynamically loaded class list | Sets default class to use |

#### ::lucide:palette:: Display Settings

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Font Size** | Number Input | 10-1000px | Controls text display size |
| **Use Global Font** | Dropdown | Yes/No | Whether to use global font settings |
| **Custom Font** | Dropdown | System font list | Select custom font |
| **Result Display Format** | Dropdown | Multiple format options | Controls result display method |
| **Result Display Style** | Dropdown | Multiple style options | Controls result display style |
| **Display Random Group Member** | Dropdown | Multiple format options | Controls random group member display format |

#### ::lucide:clapperboard:: Animation Settings

**Basic Animation Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Animation Mode** | Dropdown | Multiple animation effects | Select animation type |
| **Animation Interval** | Number Input | 1-1000ms | Set animation switch interval |
| **Auto Play Count** | Number Input | 1-1000 | Set auto play count |
| **Result Flow Animation Style** | Toggle | Enable/Disable | Controls result flow animation |
| **Result Flow Animation Duration** | Number Input | 0-2000ms | Set result flow animation duration |

**Color Theme Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Color Theme** | Dropdown | Multiple color themes | Select animation color theme |
| **Fixed Color** | Color Picker | Custom color | Set fixed color (effective when theme is fixed color) |

**Student Image Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Student Image** | Toggle | Enable/Disable | Whether to display student images |
| **Image Position** | Dropdown | Multiple position options | Set image display position |
| **Open Image Folder** | Button | - | Open student image folder |

### ::lucide:zap:: Quick Draw Settings

#### ::lucide:dices:: Drawing Function

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Drawing Mode** | Dropdown | Repetitive/Non-repetitive/Semi-repetitive | Controls drawing logic |
| **Semi-repetitive Count** | Number Input | 0-100 | Enabled in semi-repetitive mode |
| **Drawing Method** | Dropdown | By Class/By Gender/By Range | Controls drawing range |
| **Default Drawing List** | Dropdown | Dynamically loaded class list | Sets default class to use |
| **Drawing Count** | Number Input | 1-100 | Sets number of people to draw each time |
| **Disable Time After Click** | Number Input | 0-60s | Time to disable button after click |

#### ::lucide:palette:: Display Settings

Same as Roll Call settings, including font size, global font, custom font, result display format, display random group member, etc.

#### ::lucide:clapperboard:: Animation Settings

**Basic Animation Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Animation Mode** | Dropdown | Multiple animation effects | Select animation type |
| **Animation Interval** | Number Input | 1-1000ms | Set animation switch interval |
| **Auto Play Count** | Number Input | 1-1000 | Set auto play count |

**Color Theme Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Color Theme** | Dropdown | Multiple color themes | Select animation color theme |
| **Fixed Color** | Color Picker | Custom color | Set fixed color |

**Student Image Settings**

Same as Roll Call settings.

### ::lucide:lightbulb:: Configuration Recommendations

#### ::lucide:dices:: Roll Call Settings Recommendations

- **Drawing Mode**: Choose according to teaching needs
  - Repetitive: Suitable for scenarios where the same person needs to be called multiple times
  - Non-repetitive: Suitable for ensuring every student is called
  - Semi-repetitive: Balance between repetitive and non-repetitive, can set repeat count
- **Animation Interval**: Recommended 80-100 ms, both smooth and not too fast
- **Font Size**: Recommended 50-80 px, adjust according to display screen size
- **Student Image**: Enable if personalized display is needed

#### ::lucide:zap:: Quick Draw Settings Recommendations

- **Drawing Count**: Recommended 1-3 people, avoid drawing too many at once
- **Disable Time After Click**: Recommended 3-5 seconds, prevent accidental operations
- **Animation Interval**: Recommended 80-100 ms
- **Font Size**: Recommended 50-80 px

#### ::lucide:gift:: Lottery Settings Recommendations

- **Drawing Mode**: Choose according to actual situation, ensure fair prize distribution
- **Prize Image**: Recommended to enable, increase visual effect
- **Animation Interval**: Recommended 80-100 ms
- **Font Size**: Recommended 50-80 px

### ::lucide:box:: Special Features

1. **File Monitor**: Roll call settings and lottery settings will automatically monitor changes in the list/prize pool folder and update dropdown options in real time.

2. **Drawing Mode Linkage**:
   - Repetitive mode: Disable clear record and semi-repetitive count settings
   - Non-repetitive mode: Enable clear record, disable semi-repetitive count
   - Semi-repetitive mode: Enable clear record and semi-repetitive count settings

3. **Background Loading**: Quick draw settings and lottery settings use background threads to load data, avoiding interface lag.

## ::lucide:app-window:: Floating Window Management

### ::lucide:settings:: 1. Basic Settings

**Show Floating Window on Startup**: Control whether to automatically display the floating window when the software starts

**Floating Window Transparency**: Adjust the transparency of the floating window
- Range: 0%-100%

**Always on Top Mode**: Choose the floating window always on top method
- Disable Always on Top: Floating window is not always on top, same level as other windows
- Always on Top: Floating window is displayed above all windows with normal permissions
- UIA Always on Top: Floating window is displayed above all windows using UIAccess level (can display on Windows login screen or full-screen UWP apps)

**Floating Window Draggable**: Control whether the floating window can be dragged
- Enable: Allow dragging the floating window to any position
- Disable: Floating window is fixed at current position and cannot be dragged

**Long Press Time**: Set the time required to long press the floating window before dragging

**No Focus Mode**: Set whether the floating window can get application focus
- Enable: Floating window cannot get application focus
- Disable: Floating window can get application focus, may cause floating window to get focus when foreground window changes

**Extend Quick Draw Component**: Display more selection controls next to the floating window quick draw button
- Enable: Display an additional down arrow next to the quick draw button for setting drawing range, gender, etc.
- Disable: Only display the quick draw button

**Reset Floating Window Position**: Reset the floating window position to the default position (usually located in the upper left corner of the screen)

### ::lucide:settings:: 2. Appearance Settings

**Floating Window Control Configuration**: Choose the function buttons displayed in the floating window
- Click the down arrow on the right side of the setting item to expand the button setting dropdown, check the buttons you need to make them display in the floating window
- Up to 2 buttons can be displayed on the left side of the down arrow, click the × next to the button name to quickly remove the button

**Floating Window Arrangement**: Set the arrangement of controls in the floating window
- Horizontal: Controls are arranged horizontally
- Vertical: Controls are arranged vertically
- Rectangular: Controls are arranged in a rectangular layout

**Floating Window Display Style**: Set the display style of controls in the floating window
- Icon + Text: Display both function icon and text description
- Icon Only: Display only function icon
- Text Only: Display only function text

**Floating Window Size**: Set the size of floating window buttons and icons  
Note: Floating window sizes are all data for 1920×1080 100% scaling, may vary under different scaling ratios
| Name | Main Floating Window Button Size |收纳 Floating Window Button Size |
|--------|----------------|------------------|
| Extra Small | 20px×20px | 20px×20px |
| Extra Small | 30px×30px | 25px×25px |
| Small | 40px×40px | 28px×28px |
| Medium | 50px×50px | 30px×30px |
| Large | 60px×60px | 35px×35px |
| Extra Large | 70px×70px | 40px×40px |
| Extra Extra Large | 80px×80px | 45px×45px |

### ::lucide:settings:: 3. Edge Snapping Settings

**Edge Snapping Function**: Control whether the floating window is automatically collapsed into a floating button when approaching the screen edge

**Edge Snapping Time**: Set the time interval from when the floating window moves to the edge to when it is collapsed

**Edge Snapping Display Style**: Set the display style when the floating window is collapsed into a floating button
- Text: Display text prompt
- Icon: Display function icon
- Arrow: Display arrow

### Foreground Hide Settings

**Function Description**: Configure to automatically hide SecRandom's floating window when a specific window is in the foreground (active) state, avoiding blocking important content.

#### 1. Hide Floating Window on Foreground Window

**Function Description**: Master switch, controls whether to enable the "foreground window detection and hide floating window" function.

- On: When a window meeting the conditions is detected in the foreground, the floating window will automatically hide.
- Off: The floating window always remains displayed (unless manually hidden), and will not automatically hide due to foreground window changes.

#### 2. Foreground Window Title

**Function Description**: Match based on window title keywords. When the foreground window title contains set keywords, the floating window hides.

**Operation Method**:
- Enter a keyword list separated by English semicolons `;`.
- Example: `PowerPoint;Word;Excel`
- Logic: As long as the foreground window title **contains** any keyword, hiding is triggered.

#### 3. Foreground Process Name

**Function Description**: Match based on process name. When the foreground window belongs to a set process, the floating window hides.

**Operation Method**:
- Enter a process name list separated by English semicolons `;` (usually ending with .exe).
- Example: `WeChat.exe`
- Logic: As long as the foreground window's process name **exactly matches** any item in the list, hiding is triggered.

## ::lucide:settings:: Personalization Tips

### 1. Drawing Settings Optimization

- **Display Effect**: Adjust font size according to classroom size to ensure students in the back row can see clearly
- **Animation Experience**: Appropriately adjust animation interval and play count to balance visual effect and drawing efficiency
- **Personalized Theme**: Enable color theme or set artistic fonts to make the drawing process more vivid

### 2. Floating Window Settings Tips

- **Convenient Operation**: Set button count to "Roll Call + Quick Draw" to improve classroom drawing efficiency
- **Interface Cleanliness**: Choose floating window controls and display style according to actual situation to reduce visual interference
- **Smart Edge Snapping**: Use edge snapping function to maintain floating window convenience without affecting other software use
- **Foreground Hiding**: Configure hiding conditions according to needs to avoid blocking important content

> **More Help**: For questions about personalization settings, welcome to check [FAQ](/en/faq/001.md) or [Contact Us](/en/team.md) for support!
