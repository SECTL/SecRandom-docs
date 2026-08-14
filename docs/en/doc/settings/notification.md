---
title: Notification Settings
createTime: 2026/08/14 10:00:00
---

# Reminder Settings (Notification)

::: tip Version Notice
This document corresponds to the **v3** "Settings → Reminder Settings" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Instant feedback** - Configure notifications after draws so results are clear and perceptible.

## Reminder Settings Page

v3's reminder settings contain the following sub-pages:

| Page | Description |
|------|-------------|
| **Voice & Music** | Voice broadcast engine, voice, volume and draw music (see [Voice & Music](/en/doc/settings/voice)) |
| **Default Notification Settings** | Global default notification configuration |
| **Roll Call Notification Settings** | Notification configuration after roll call |
| **Quick Draw Notification Settings** | Notification configuration after quick draw |
| **Lottery Notification Settings** | Notification configuration after lottery |

All notification pages share the same configuration structure and support **"Enable Override"**: when enabled, that draw type uses its own configuration to override the default notification settings.

---

## Notification Service

### Notification Service Type
**Description**: choose how notifications are delivered

| Option | Description |
|--------|-------------|
| **SecRandom Built-in Notification** | use the built-in notification window to show results |
| **ClassIsland** | deliver via ClassIsland (requires the SecRandom4Ci plugin) |
| **Both** | use both built-in notifications and ClassIsland |

### Notification Service Failure Fallback
**Description**: automatically fall back to the built-in notification service when the selected service fails to send

- On: when the selected external service cannot deliver, the built-in service continues showing the notification
- Off: no notification shown when the external service fails

### Notification Display
**Description**: specify which display the notification window appears on; defaults to the primary display

---

## Default Notification Settings

### Enable Notification
**Description**: show a notification with the result after a draw

### Notification Animation
**Description**: play enter and exit animations when showing the notification

### Notification Position
**Description**: choose where the notification window appears

Options: Top-Left, Top, Top-Right, Left, Center, Right, Bottom-Left, Bottom, Bottom-Right

### Notification Offset
**Description**: horizontal and vertical offset of the notification window from its default position

### Notification Opacity
**Description**: opacity of the notification window

### Notification Display Duration
**Description**: seconds the notification service shows the result

### Use Main Window When Exceeding Threshold
**Description**: when the draw count exceeds the threshold, do not show a window notification; only show the result in the main window

### Notification Threshold
**Description**: above this count, results are shown in the main window

---

## Built-in Notification Window

### Window Display
**Description**: specify which display the built-in notification window appears on; defaults to the primary display

### Window Position
**Description**: choose the display position of the built-in notification window

### Window Offset
**Description**: horizontal and vertical offset of the built-in notification window from its default position

### Window Opacity
**Description**: opacity of the built-in notification window

### Window Close Time
**Description**: seconds the built-in notification window stays before auto-closing

---

## Per-Draw-Type Notifications

Roll call / quick draw / lottery each configure independently and can override the defaults:

| Setting | Roll Call | Quick Draw | Lottery |
|---------|-----------|------------|---------|
| Enable notification | ✓ | ✓ | ✓ |
| Notification animation | ✓ | ✓ | ✓ |
| Notification position | ✓ | ✓ | ✓ |
| Notification offset | ✓ | ✓ | ✓ |
| Notification opacity | ✓ | ✓ | ✓ |
| Notification duration | ✓ | ✓ | ✓ |
| Use main window when exceeding threshold | ✓ | ✓ | ✓ |
| Notification threshold | ✓ | ✓ | ✓ |

::: tip
The threshold meaning differs per draw type: roll call / quick draw use "draw count", lottery uses "prize count".
:::

## Related Pages

- Voice broadcast: see [Voice & Music](/en/doc/settings/voice)
- Notification window style (quick draw window): see [Floating Window Settings](/en/doc/settings/floating-window)
