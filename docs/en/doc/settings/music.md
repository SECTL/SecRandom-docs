---
title: Music Library
createTime: 2026/08/14 10:00:00
---

# Music Library (Personalized)

::: tip Version Notice
This document corresponds to the **v3** "Settings → Personalized → Music" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Draw soundtrack** - Manage draw background music to make every draw more atmospheric.

## Local Music Library

**Description**: Imported music is copied to the app data directory and can be selected for all draw scenarios

### Import Music
1. Click the **"Import Music"** button
2. Select music files (supports **MP3 / WAV / FLAC** formats)
3. Files are copied to the music library in the app data directory

### Music List
The music library list shows:
- **Track**: music filename
- **Format**: file format
- **Size**: file size
- **Actions**: Preview / Stop / Delete

### Preview
Click **"Preview"** to play the selected track; click **"Stop"** to stop playback.

### Delete Music
Click **"Delete"** to remove a track.

**Notes**:
- After deleting a track, the corresponding music references in global and per-draw records are cleaned up together
- The "Music" option in picking settings uses the same music library IDs (No Music / Random / Specific Track)

## Using Music in Draws

In **Picking Settings** or the additional settings of each draw type, you can configure music for draws:
- **No Music**: no music during draws
- **Random**: play a random track from the library
- **Specific Track**: select a particular track from the library

::: tip
Draw music and voice broadcast are independent and can be used together.
:::

## Related Pages

- Picking settings (music option): see [Picking Settings](/en/doc/settings/pick)
- Voice broadcast: see [Voice & Music](/en/doc/settings/voice)
