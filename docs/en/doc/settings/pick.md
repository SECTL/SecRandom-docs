---
title: Picking Settings
createTime: 2026/08/14 10:00:00
---

# Picking Settings

::: tip Version Notice
This document corresponds to the **v3** "Settings → Picking Settings" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Precise drawing** - Configure draw mode, display effects, animation and reminder text so every draw matches your expectations.

## Picking Settings Page

v3's picking settings contain the following sub-pages:

| Page | Description |
|------|-------------|
| **Default Picking Settings** | Global default draw behavior |
| **Roll Call Picking Settings** | Draw configuration for the roll call page |
| **Quick Draw Picking Settings** | Configuration for quick draw (floating-window fast draw) |
| **Lottery Picking Settings** | Draw configuration for the lottery page |
| **Face Draw Picking Settings** | Configuration for the face draw mode |

All picking pages share the same setting structure and support **"Enable Override"**: when enabled, that draw type uses its own configuration to override the defaults.

---

## Draw Settings

### Draw Mode
**Description**: Controls how duplicate draw records are handled

| Option | Description |
|--------|-------------|
| **Allow Duplicates** | Every draw picks from the full candidate pool; may hit repeatedly |
| **No Duplicates** | Drawn members do not re-enter the candidate pool until records are cleared |
| **Half Duplicates** | After reaching the threshold of draws, no longer re-enters the candidate pool |

### Half Duplicate Threshold
**Description**: Members no longer re-enter the candidate pool after reaching this draw count (half duplicate mode only)

### Clear Records
**Description**: Controls when draw records are cleared

| Option | Description |
|--------|-------------|
| **Clear After Restart** | Temporary draw records clear after restart |
| **Manual Clear** | Only clear via manual reset |

::: warning Note
Clearing records only affects temporary draw records, not persisted history.
:::

### Draw Type
**Description**: Use random drawing or fair drawing

| Option | Description |
|--------|-------------|
| **Random Draw** | Purely random drawing |
| **Fair Draw** | Dynamically adjusted based on history weights, reducing repeats and distribution imbalance |

### Default Draw List / Default Lottery Pool
- **Default Draw List**: the list used by default when opening the roll call page or executing quick draw
- **Default Lottery Pool**: the pool used by default when opening the lottery page

### Disable After Click (Quick Draw)
**Description**: seconds the button is disabled after one quick draw click, preventing accidental touches

---

## Display Settings

### Font Source
**Description**: Follow the global font or specify a separate font for draw results

- **Follow Global**: use the global UI font
- **Custom**: specify a separate font

### Custom Font
Font family name; leave empty to use the default font.

### Font Size
**Description**: draw result text size

### Display Format
**Description**: Controls whether results show name, number, or both

| Option | Description |
|--------|-------------|
| **Name Only** | Show name only |
| **Number Only** | Show number only |
| **Number and Name** | Show both number and name |

### Display Style
**Description**: Controls the overall style of draw results

- **Default**
- **Card**

### Lottery Process Display
**Description**: display format of candidate results during the lottery process

Preset formats (e.g., "Prize/Group-Name", "Number Prize/Group-Name") are available, or choose **Custom Display Format**.

### Custom Display Format
**Description**: set a custom display format for the lottery process, supporting the following format variables (tap a variable to insert):

| Variable | Description |
|----------|-------------|
| Number | member/prize number |
| Prize | prize info |
| Prize ID | prize ID |
| Prize Name | prize name |
| Member | member info |
| Member ID | member ID |
| Member Name | member name |
| Member Group | member group |
| Line Break | newline |

::: tip
Besides line breaks, other separators (space, `-`, `/`) can be typed directly.
:::

### Show Tags
**Description**: show member or prize tags in draw results

### Show Weight Transparency
**Description**: show weight transparency info in result display

---

## Member Avatar Settings

### Show Avatar
**Description**: show member avatars in draw results

### Avatar Position
**Description**: position of the member avatar relative to text

- Left / Top / Right / Bottom

::: tip
Use "Batch Set Avatars" to quickly set avatars for members/prizes.
:::

---

## Animation Settings

### Animation Mode
**Description**: set how the draw animation plays

| Option | Description |
|--------|-------------|
| **Manual Stop** | Click "Stop" to freeze the result |
| **Auto Play** | Auto-scroll candidates, freeze after reaching the count |
| **No Animation** | No animation; show the result directly |

### Animation Interval
**Description**: interval (ms) between each animation switch

### Auto Play Count
**Description**: number of candidate scrolls in auto play mode

### Animation Style
**Description**: unified animation effect for the draw process and final freeze

- **Direct Switch**: candidates switch directly
- **Fade-in Float Up**: candidates fade in and float up
- **Sway Left/Right**: candidates sway left and right

::: tip
Roll call, quick draw and lottery share the same animation style configuration; process animation and final result display stay consistent.
:::

---

## Color Settings

### Color Theme
**Description**: source of draw animation and result colors

| Option | Description |
|--------|-------------|
| **None** | no color theme |
| **Random** | random color per draw |
| **Fixed Color** | use the specified fixed color |

### Fixed Color
**Description**: used when the color theme is Fixed Color

---

## Reminder Text Settings

### Reminder Text
**Description**: hint text shown next to the result area of the drawing page

### Reminder Font Size
**Description**: reminder text size

### Reminder Text Color
**Description**: reminder text color

### Reminder Text Opacity
**Description**: reminder text opacity (0-100)

---

## Related Pages

- Notifications: see [Notification Settings](/en/doc/settings/notification)
- Voice broadcast: see [Voice & Music](/en/doc/settings/voice)
- Draw background music: see [Music Library](/en/doc/settings/music)
