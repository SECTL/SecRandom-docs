---
title: Capabilities & Limits
createTime: 2026/10/05 12:00:00
---

# Capabilities & Limits

> This page answers two questions: **what each remote operation requires**, and **why it may be refused**.

## Capability list

Control operations are organized around **capabilities**: a device declares what it supports when it connects, the console trims its buttons accordingly, the server authorizes, and the device decides whether to execute.

| Capability | Label in the interface | Minimum role | Notes |
|---|---|---|---|
| `node.status.read` | Read status | Viewer | Online state, platform, version, device name; declared by every platform |
| `proof.list` | Read proof list | Viewer | Defined by the protocol, but **not declared by the current desktop client**, so it never appears |
| `draw.lock` | Lock / unlock drawing | Operator | A *desired state*: applies offline and converges on reconnect |
| `draw.trigger` | Trigger one draw | Operator | An *action command*: draws once, with an expiry time |
| `media.play` | Show result / announce | Operator | Voice announcement, optionally preceded by showing the result window on the device (see "What an announcement can carry" below) |
| `settings.read` | Read settings | Operator | Read-only; returns the setting catalog and current values, **never credentials** |
| `settings.write` | Change settings | Admin | Only for items the device marks remotely writable |
| `roster.read` | Read rosters | Admin | **The most sensitive read channel**: rosters contain student names |
| `roster.write` | Change rosters | Admin | Push a roll-call roster or a prize pool |

::: info Why reading settings requires a lower role than writing
Seeing is not the same as changing: operators should be able to inspect their own machine's configuration, while changing it is an administrator's decision.
:::

::: warning There is no remote restart
A remote restart was once planned and has been **explicitly rejected**: restarting a classroom machine interrupts an ongoing lesson and cannot be undone remotely, so the cost of a mistake far outweighs the benefit. **No interface exposes a restart button.**
:::

## Three kinds of commands, three behaviours

| Kind | Examples | Expiry and offline behaviour |
|---|---|---|
| **Desired state** | Lock / unlock drawing | Not "do it once" but "this is how it should be": it **applies while the device is offline** and converges when it reconnects. The latest change wins |
| **Action command** | Draw now, announce, push roster, change settings | Carries an **expiry time** (a couple of minutes by default, handled automatically). While the device is offline the command is queued and delivered on reconnect; **if it has expired by then it is dropped and never executed late** |
| **Query** | Read settings, read rosters | Very short lifetime (tens of seconds); answering late is useless — "which rosters exist" three minutes later means nothing |

::: tip "Sent" is not "executed"
After the console hands a command to the server it still has to wait for the device's receipt. Check the **receipt** status: queued / delivered / accepted / completed / rejected / failed. When a command is rejected, the interface explains the device's reason and the next step.
:::

## The device can refuse too

Even with sufficient role and a valid command, a device may refuse — by design:

| Device-side refusal | Meaning | What to do |
|---|---|---|
| **Local switch off** | The console shows "local remote disabled" | Enable it on that machine; the console cannot |
| **Drawing locked** | A "lock drawing" state was pushed; both local and remote draws are blocked | Click **Allow drawing** on the device detail page |
| **Device is drawing** | Changing settings, pushing rosters or drawing again is refused (mismatched results and proofs) | Wait for the current draw to finish |
| **Local verification required** | The device requires password / TOTP / USB confirmation, and **a remote command cannot raise that prompt** (nobody may be at the machine) | Operate the device itself, or change its security settings |
| **Class-time restriction** | The device has course linkage enabled and considers it class time | A local policy, decided by the device |
| **Capability not declared** | The device does not support that operation | The interface usually hides the button |
| **Too many commands** | The device applies its own rate limit (roughly 20 commands per 10 seconds by default; the exact numbers are reported) | Retry later instead of clicking repeatedly |
| **Command expired** | It took too long in transit, or expired while the device was offline | Send it again |

## Settings that can never be changed remotely

The following are **never** on the remote whitelist and the device refuses them outright — remotely enabling autostart or loosening security would hand over device ownership:

- **Security settings** (password / TOTP / USB, per-action verification)
- **Control's own settings** (local switch, group ID, node identity) — these do not even live in the normal settings, so the console can neither read nor write them
- **Desktop integration**: autostart, background residency, startup window, URL protocol registration
- **Update settings**
- **Backup settings**, **proof retention**
- Window top-most mode, and the "accepted version" markers for the various agreements

What can be changed remotely is mainly **drawing and notification related** settings (default draw, roll call, quick draw, lottery, voice, notification, appearance, floating window, linkage, more), as marked by each device.

::: tip Two markers, easily confused
- **Not remotely writable**: the device explicitly says this item cannot be changed; the control is greyed out;
- **Not read yet**: the device has not reported a value for this item — it does not mean it cannot be changed.

Settings delivery is also **all or nothing**: one non-writable item rejects the whole command.
:::

## Data and size limits

Remote payloads have to fit into a single frame:

- Large rosters are returned **partially** and marked **truncated** (reads are also capped: at most 50 rosters/pools, 500 members each, and there is no paging). The interface then tells you to use "merge", because "replace all" would delete the members that were not returned;
- An import is capped by row count (currently 2000 rows) and larger files are rejected with a message;
- Very large setting catalogs are **read category by category**; if even a single category does not fit, the console says so explicitly;
- Announcement text is **at most 200 characters**, and the device may impose a stricter local limit (reported when refused).

## What a remote draw can carry

| Draw mode | Description |
|---|---|
| **Quick draw** | No parameters: the device draws 1 from its own quick-draw default roster |
| **Roll call** | May specify roster, gender, group and count — **only for this one request; it does not change the device's defaults** |

- The gender and group options come **from the members the console read back**, never from hard-coded lists;
- The count limit is decided by **how many members match in the roster**; exceeding it gets refused with the actual range;
- The console runs a **local pre-check** against the roster it has to catch "nobody to draw", "condition not present" and "count out of range" early;
- The result comes back with the receipt (who was drawn, roster, count) and appears under "Latest draw".

## What an announcement can carry

| Parameter | Description |
|---|---|
| **Text** | Up to 200 characters, spoken by **that machine's own speech engine**; the text is not written to logs |
| **Show quick-draw window** | A toggle, off by default |
| **System volume / announcement volume** | 0–100, with two states: **"do not change"** (leave it alone this time) or **"set to"** (changed temporarily and restored afterwards). Note that `0` means "mute" and is a real change |

Bulk announcements are sent device by device; machines that are drawing refuse, and the interface reports the failing devices.
