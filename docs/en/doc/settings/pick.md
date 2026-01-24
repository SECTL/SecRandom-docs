---
title: Drawing Settings
createTime: 2026/01/02 15:29:12
---

> **Personalize your drawing experience**
>
> Through rich customization options, create a drawing style and floating window experience exclusive to you.

## Drawing Settings

Drawing settings include three independent features: **Roll Call Settings**, **Quick Draw Settings**, and **Lottery Settings**. Each feature includes drawing function, display settings, and animation settings.

### 📚 Roll Call Settings

#### 🎲 Drawing Function

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Drawing Mode** | Dropdown | Repetitive/Non-repetitive/Semi-repetitive | Controls drawing logic |
| **Clear Record Method** | Dropdown | Manual/Auto/No Clear | Automatically disabled in repetitive mode |
| **Semi-repetitive Count** | Number Input | 0-100 | Enabled in semi-repetitive mode, sets repeat count |
| **Drawing Method** | Dropdown | By Class/By Gender/By Range | Controls drawing range |
| **Default Drawing List** | Dropdown | Dynamically loaded class list | Sets default class to use |

#### 🎨 Display Settings

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Font Size** | Number Input | 10-1000px | Controls text display size |
| **Use Global Font** | Dropdown | Yes/No | Whether to use global font settings |
| **Custom Font** | Dropdown | System font list | Select custom font |
| **Result Display Format** | Dropdown | Multiple format options | Controls result display method |
| **Result Display Style** | Dropdown | Multiple style options | Controls result display style |
| **Display Random Group Member** | Dropdown | Multiple format options | Controls random group member display format |

#### 🎬 Animation Settings

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

### ⚡ Quick Draw Settings

#### 🎲 Drawing Function

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Drawing Mode** | Dropdown | Repetitive/Non-repetitive/Semi-repetitive | Controls drawing logic |
| **Semi-repetitive Count** | Number Input | 0-100 | Enabled in semi-repetitive mode |
| **Drawing Method** | Dropdown | By Class/By Gender/By Range | Controls drawing range |
| **Default Drawing List** | Dropdown | Dynamically loaded class list | Sets default class to use |
| **Drawing Count** | Number Input | 1-100 | Sets number of people to draw each time |
| **Disable Time After Click** | Number Input | 0-60s | Time to disable button after click |

#### 🎨 Display Settings

Same as Roll Call settings, including font size, global font, custom font, result display format, display random group member, etc.

#### 🎬 Animation Settings

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

### 🎁 Lottery Settings

#### 🎲 Drawing Function

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Drawing Mode** | Dropdown | Repetitive/Non-repetitive/Semi-repetitive | Controls drawing logic |
| **Clear Record Method** | Dropdown | Manual/Auto/No Clear | Automatically disabled in repetitive mode |
| **Semi-repetitive Count** | Number Input | 0-100 | Enabled in semi-repetitive mode |
| **Default Prize Pool** | Dropdown | Dynamically loaded prize pool list | Sets default prize pool to use |

#### 🎨 Display Settings

Same as Roll Call settings, including font size, global font, custom font, result display format, result display style, display random student, etc.

#### 🎬 Animation Settings

**Basic Animation Settings**

Same as Roll Call settings.

**Color Theme Settings**

Same as Roll Call settings.

**Prize Image Settings**

| Configuration | Type | Range/Options | Description |
|--------------|------|---------------|-------------|
| **Prize Image** | Toggle | Enable/Disable | Whether to display prize images |
| **Image Position** | Dropdown | Multiple position options | Set image display position |
| **Open Image Folder** | Button | - | Open prize image folder |

### 💡 Configuration Recommendations

#### Roll Call Settings Recommendations

- **Drawing Mode**: Choose based on teaching needs
  - Repetitive: Suitable for scenarios requiring multiple roll calls
  - Non-repetitive: Suitable for ensuring every student is called
  - Semi-repetitive: Balances repetition and non-repetition, can set repeat count
- **Animation Interval**: Recommended 80-100ms, smooth but not too fast
- **Font Size**: Recommended 50-80px, adjust based on display screen size
- **Student Image**: Enable if personalized display is needed

#### Quick Draw Settings Recommendations

- **Drawing Count**: Recommended 1-5 people, avoid drawing too many at once
- **Disable Time After Click**: Recommended 3-5 seconds, prevent accidental operations
- **Animation Interval**: Recommended 80-100ms
- **Font Size**: Recommended 50-80px

#### Lottery Settings Recommendations

- **Drawing Mode**: Usually choose non-repetitive to ensure fair prize distribution
- **Prize Image**: Recommended to enable, enhances visual effect
- **Animation Interval**: Recommended 80-100ms
- **Font Size**: Recommended 50-80px

### 🔧 Special Feature Notes

1. **File Monitor**: Roll Call and Lottery settings automatically monitor changes in list/prize pool folders, updating dropdown options in real-time

2. **Drawing Mode Linkage**:
   - Repetitive mode: Disables clear record and semi-repetitive count settings
   - Non-repetitive mode: Enables clear record, disables semi-repetitive count
   - Semi-repetitive mode: Enables clear record and semi-repetitive count settings

3. **Background Loading**: Quick Draw and Lottery settings use background threads to load data, avoiding interface lag

## Floating Window Management

### Basic Settings

**Show Floating Window on Startup**: Control whether to automatically display the floating window when the software starts

**Floating Window Transparency**: Adjust floating window transparency
- Range: 0%-100%

**Floating Window Draggable**: Control whether the floating window can be dragged
- Enable: Allow dragging the floating window to any position
- Disable: Floating window is fixed at the current position and cannot be dragged

**Long Press Time**: Set the time required to long press the floating window before dragging

**Reset Floating Window Position**: Reset the floating window position to the default position (usually located in the top left corner of the screen)

### Appearance Settings

**Floating Window Control Configuration**: Select function buttons to display in the floating window
- Roll Call: Only display roll call function button
- Quick Draw: Only display quick draw function button
- Lottery: Only display lottery function button
- Roll Call + Quick Draw: Display roll call and quick draw function buttons at the same time
- Roll Call + Lottery: Display roll call and lottery function buttons at the same time
- Quick Draw + Lottery: Display quick draw and lottery function buttons at the same time
- Roll Call + Quick Draw + Lottery: Display roll call, quick draw, and lottery function buttons at the same time

**Floating Window Arrangement**: Set the arrangement of controls in the floating window
- Horizontal arrangement: Controls are arranged horizontally
- Vertical arrangement: Controls are arranged vertically
- Rectangular arrangement: Controls are arranged in a rectangular layout

**Floating Window Display Style**: Set the display style of controls in the floating window
- Icon + Text: Display function icon and text description at the same time
- Icon Only: Only display function icon
- Text Only: Only display function text

**Floating Window Size**: Set the size of floating window buttons and icons
Note: Floating window sizes are all data for 1920x1080 100% scaling, there may be differences under different scaling ratios
| Name | Main Floating Window Button Size |收纳 Floating Window Button Size |
|--------|----------------|------------------|
| Extra Small | 20px×20px | 20px×20px |
| Very Small | 30px×30px | 25px×25px |
| Small | 40px×40px | 28px×28px |
| Medium | 50px×50px | 30px×30px |
| Large | 60px×60px | 35px×35px |
| Extra Large | 70px×70px | 40px×40px |
| Extra Extra Large | 80px×80px | 45px×45px |

### Edge Docking Settings

**Edge Docking Function**: Control whether the floating window automatically collapses into a floating button when approaching the screen edge

**Edge Docking Time**: Set the time interval from when the floating window moves to the edge to collapsing

**Edge Docking Display Style**: Set the display style when the floating window collapses into a floating button
- Text: Display text prompt
- Icon: Display function icon
- Arrow: Display arrow

## Personalization Settings Tips

### Drawing Settings Optimization

- **Display Effect**: Adjust font size according to classroom size to ensure students in the back row can also see clearly
- **Animation Experience**: Appropriately adjust animation interval and play count to balance visual effect and drawing efficiency
- **Personalized Theme**: Enable color theme or set artistic fonts to make the drawing process more vivid

### Floating Window Settings Tips

- **Convenient Operation**: Set button count to "Roll Call + Quick Draw" to improve classroom drawing efficiency
- **Clean Interface**: Choose floating window controls and display style according to actual situation to reduce visual interference
- **Smart Docking**: Use edge docking function to maintain floating window convenience without affecting other software use

> **More Help**: If you have any questions about personalization settings, please check [FAQ](/faq/001.md) or [contact us](/team.md) for support!
