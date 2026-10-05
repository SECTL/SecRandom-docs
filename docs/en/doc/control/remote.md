---
title: Remote Operations & Devices
createTime: 2026/10/06 10:00:00
---

# Remote Operations & Devices

> This page covers two things: what you can do to a classroom machine, and how the switch on that machine works.

## What you can do remotely

On a device's page you can:

| Operation | Minimum role | Notes |
|---|---|---|
| **Lock / unlock drawing** | Operator | Applies **even while the device is offline** and converges when it reconnects; a locked machine cannot draw locally either |
| **Draw now** | Operator | Makes that machine draw once — see below |
| **Reset round** | Operator | Clears this round's progress so it starts over |
| **Announce** | Operator | Spoken by that machine's own speech engine |
| **Change settings** | Admin | Only the items the device allows remotely |
| **Read / push rosters** | Admin | Both roll-call rosters and prize pools |

::: tip "Do it once" actions are never executed late
**Draw now**, **announce** and **reset round** carry an **expiry time**: while the device is offline they queue up and are delivered on reconnect — but if they have expired by then, they are dropped.

If you change your mind, **a queued command can be revoked** (two clicks on "Revoke"), so it will not run when the device reconnects; once delivered to the device it can no longer be recalled. The **Draw now** and **Reset round** buttons also require **two clicks** before they are sent.
:::

### Three ways to draw

| Mode | Description |
|---|---|
| **Quick draw** | No conditions: the device draws 1 from its own default roster |
| **Roll call** | Specify roster, gender, group and count |
| **Prize pool** | Draw N prizes from a chosen pool; lottery does not filter by gender or group |

- Roster and pool options come from **data you read back from the device**, so you never type names;
- The drawable count is bounded by matching members in a roster, and by the remaining stock in a prize pool; exceeding it is refused with the actual range;
- The result comes back to the console: who was drawn, or how many prizes.

### Reset round

Use it when a round should start over — for example at the end of a lesson.

- It clears only **this round's progress** (who has already been drawn, which prizes are gone); **history is untouched**;
- The previous result on the classroom machine's screen is cleared too, back to "nothing drawn yet";
- You can target roll call (default), quick draw or lottery, and optionally a single roster;
- It needs one confirmation (two taps on the phone); the device refuses it **while it is drawing**, so wait for the round to finish.

### Announce

- Spoken by **that machine's own speech engine**, up to 200 characters;
- Optionally show the quick-draw window and temporarily adjust system or announcement volume; **volumes are restored afterwards** — note that "do not change" and "set to 0 (mute)" are different things;
- If the device's voice master switch is off there will be no sound, and the interface offers a way to turn voice on.

### Change settings

- You must **read from the device first**; changes take effect immediately, with no device restart;
- **Security, Control's own settings, desktop integration (autostart, protocol registration), updates, backup and proof retention** can never be changed remotely — they are marked "not remotely writable";
- If any single item in a batch is invalid, **the whole batch is not applied**.

### Rosters and prize pools

- Reading rosters requires **admin or above**, because they contain student names;
- Edit rows in the console, **import a spreadsheet** (`.xlsx`, `.xls`, `.csv`, …) or export CSV;
- Importing only changes the console-side draft; click **push** to write it to the device;
- Two push modes: **merge (default)** deletes nobody, while **replace all** **deletes everyone not included** — for large rosters the interface tells you not to use it;
- Pushing **does not switch** the roster the device is currently using, and does not interrupt a class in progress.

## When a request is refused

Even with a sufficient role, a device may refuse; the interface explains why:

- **Local switch is off** — only the machine itself can turn it back on;
- **Drawing is locked** — unlock it first;
- **The device is drawing** — wait for the round to end;
- **Local verification required** — that machine uses password / TOTP / USB protection, and a remote command cannot raise the prompt;
- **Class-time restriction** — the device has course linkage enabled;
- **Unsupported** — for example lottery is switched off, or there is no speech;
- **Command expired** — simply send it again;
- **Too many commands** — wait a moment.

Every refusal explains itself, and some messages carry an error code; passing that code on when you report a problem makes it much faster to diagnose.

## The switch on the device

On the classroom machine: **Settings → General → Control**.

| Item | Description |
|---|---|
| **Allow remote control** | The master switch. When off, the device **does not connect and executes nothing**, and the console cannot turn it on for you |
| **Group ID** | Copied from the console |
| **Node channel URL** | Usually leave the default |
| **Node ID** | Generated at install time and stable; read-only |
| **Display name** | The name shown in the console; empty uses the host name |
| **Connection status** | Connected / waiting to retry / stopped retrying, with a **Reconnect now** button |

- Changes apply immediately — there is no "Save" button;
- After a network drop the device reconnects on its own;
- **Turning the switch off is the same as leaving Control**: the connection closes and any previously pushed "lock drawing" no longer applies;
- The switch and the applied lock state are stored separately, so **importing settings or restoring a backup never turns remote control on**;
- Phones do not show this page; **tablets support both roles** (managed and remote).

## Phones and tablets

| Device | What it can do |
|---|---|
| **Phone** | Remote only: pick a device and roster in **Remote draw** at the bottom of the navigation, switch between **roll call / lottery**, then draw or **reset the round** |
| **Tablet** | Both: remote draw from the main interface, and managed remotely (it has a Control page in Settings) |

Phone permissions match the console: reading rosters needs admin or above, sending a draw needs operator or above. The draw itself **happens on the classroom machine**, and the result is sent back to the phone.
