---
title: Voice & Music
createTime: 2026/08/14 10:00:00
---

# Voice & Music (Reminder Settings)

::: tip Version Notice
This document corresponds to the **v3** "Settings → Reminder Settings → Voice & Music" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Audio feedback** - Configure the voice broadcast engine, voice, volume and broadcast content so draw results are instantly audible.

## Voice Broadcast

### Enable Voice Broadcast
**Description**: master switch for all draw voice broadcasts; each draw type can separately control whether to broadcast

- On: broadcasts the result after a draw
- Off: no broadcast

### Voice Engine
**Description**: choose the voice engine used for broadcasting

| Option | Description |
|--------|-------------|
| **System Voice** | uses the OS built-in speech synthesis |
| **Edge TTS** | uses Microsoft Edge TTS online synthesis (richer voices) |

### Voice
**Description**: shows available voices based on the current engine

- System voice: shows system voices
- Edge TTS: uses Edge TTS voice names (e.g. `zh-CN-XiaoxiaoNeural`)

### Refresh Voices
Click **"Refresh Voices"** to refresh the available voice list (fetches from the service when online).

### Preview
Click **"Preview"** to broadcast a test voice with the current settings ("This is a voice broadcast test").

## Volume & Speed

### Voice Volume
**Description**: set the broadcast volume

### Speed
**Description**: set the broadcast speed percentage

## System Volume Control

### Enable System Volume Control
**Description**: automatically adjust the system volume before broadcasting

- On: automatically sets the system volume to the configured value when broadcasting
- Off: uses the current system volume

### System Volume Level
**Description**: the system volume used during voice broadcast

## Broadcast Content

### Broadcast Number
**Description**: include the number in results

### Broadcast Name
**Description**: include the name in results

## Playback Behavior

### Wait for Broadcast to Finish
**Description**: wait for the current broadcast to finish before allowing the next draw

- On: the next draw cannot start during a broadcast
- Off: the next draw can start anytime (broadcast may be interrupted)

---

## Draw Music

Draw background music is managed in the **Music Library** (Settings → Personalized → Music) and selected in picking settings or the additional settings of each draw type:

- **No Music**: no music during draws
- **Random**: play a random track from the library
- **Specific Track**: select a particular track from the library

::: tip
Draw music and voice broadcast are independent and can be used together.
:::

## Related Pages

- Music library management: see [Music Library](/en/doc/settings/music)
- Notification settings: see [Notification Settings](/en/doc/settings/notification)
- Draw display settings: see [Picking Settings](/en/doc/settings/pick)
