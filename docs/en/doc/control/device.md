---
title: Device Settings
createTime: 2026/10/05 12:00:00
---

# Device Settings

> Location: **Settings → General → Control**. This page **exists on desktop only**: a phone cannot be a controlled device.

## The seven items on the page

| Item | Official description | Editable |
|---|---|---|
| **Allow remote control** | This machine's own switch; once off, nothing sent by the server is executed | Yes |
| **Group ID** | Provided after creating a group in the console | Yes (**required**) |
| **Node channel URL** | Uses the online node channel by default; plain `ws` is allowed only for loopback addresses | Yes (normally untouched) |
| **Node ID** | Generated at install time and stable; enter it in the console when registering | **Read-only** |
| **Display name** | The name shown in the console's node list; empty reports the host name | Yes (up to 64 characters) |
| **Connection status** | Reconnects with backoff after a drop; failures that retrying cannot fix stay here until corrected | Read-only (with **Reconnect now**) |
| **Drawing locked** | Set by the console; while locked this machine refuses to draw | Read-only |

::: tip Changes apply immediately
There is **no "Save" button**: every change is written to disk at once. An invalid address shows "node channel address invalid, not saved" and is never persisted.
:::

## Connection statuses

| Status | Meaning |
|---|---|
| **Disabled** | The local switch is off; no connection is made |
| **Waiting for sign-in or group ID** | Not signed in to a SECTL account, or the group ID is still empty |
| **Connecting** | Establishing the long connection |
| **Connected** | Handshake with the control service succeeded; the console can see this device |
| **Waiting to retry** | Disconnected and retrying with backoff (intervals grow to about a minute) |
| **Stopped retrying** | A failure that **retrying cannot fix**; it waits here for you to correct it, then click **Reconnect now** |

The note next to "stopped retrying" tells you the reason:

| Note | Cause | Fix |
|---|---|---|
| Not signed in to a SECTL account | This machine is not signed in | Sign in on the device |
| Group ID not entered yet | The group ID is empty | Copy the group ID from the console |
| Group not found, or the account is not a member | The signed-in account is not in that group | Invite the account, or sign in with a member account |
| No such node in this group — register it in the console first | Register-on-connect is disabled server-side | Ask an administrator to register this device's node ID |
| Malformed request — this is a client issue | Client/server protocol mismatch | Update the client, or report it |
| The server rejected this node's credentials… | This platform is not allowed to connect | Contact the vendor |
| Node channel address invalid | The address was edited into something unusable | Restore the default address |

::: warning Repeated credential rejection stops retrying
If node credentials are rejected several times in a row, the client **stops reconnecting** and stays at "stopped retrying" until you sign in again — this prevents an unreachable machine from hammering the server. **Reconnect now** wakes it up.
:::

## What "Allow remote control" governs

This is **the machine's own gate**, and the most important protection in the whole system:

- **Off means no connection at all**, so the console cannot even see it online;
- **Commands received anyway are refused**: the device replies that local remote control is disabled;
- **The server cannot turn it on for you**: no console interface writes this switch; it is only ever reported by the device;
- **It does not live in the normal settings file**: the switch and the applied lock state are stored in `data/config/control/node-state.json`, so **importing settings or restoring a backup never silently enables remote control**.

::: tip Turning the switch off also drops the drawing lock
The drawing lock only takes effect while **remote control is allowed locally**. Turning the switch off therefore also releases any "lock drawing" previously pushed by the console. Turning it back on makes the stored lock effective again.
:::

## About "Drawing locked"

- It is pushed by the console as a **desired state**: once set, it applies even while the device is offline and converges when it reconnects;
- While locked, **both local and remote drawing are blocked**;
- It is the console's decision, and different from "local remote disabled", which is the device's own switch and cannot be changed by the server.

## Device identity: node ID and display name

- The **node ID** is generated on first run (a random string), **stays stable**, and only changes on reinstall. It is the machine's unique identity in Control;
- The console uses it as the entry point to the detail page: **names can repeat and are lost on reinstall; only the node ID pins a machine**;
- The **display name** is set on that machine (for example "Class 301 podium PC"); empty reports the host name. The device is authoritative — the console only supplies an initial value for a device that has never connected;
- Because the audit keeps them long-term, avoid putting private information into the node ID or display name.

## Network and reconnection

- The device **dials out**, so machines behind NAT can join and no inbound port is normally needed;
- After a drop it retries with 1s → 2s → 4s → … backoff, up to about a minute, resetting after a successful handshake;
- Heartbeats run about every 25 seconds; the server marks a device offline after roughly 75 seconds without one, and the console follows;
- **Signing out closes the connection immediately**, and signing in reconnects it.

## Phone: a remote, not a controlled device

The phone has **no Control settings page** and never registers as a node. Its role is on the console side:

- Sign in with the same account and open **Draw → Remote draw**;
- Choose a group and device (online/offline shown), read the roster, pick conditions and count, then draw;
- **The draw actually happens on the classroom machine**; the result comes back to the phone, and the device's lock, rosters and local policies all still apply;
- Role thresholds match the Web console: reading rosters needs admin or above, sending a draw needs operator or above;
- Typical phone messages: "the device is offline, the command will be delivered when it reconnects", "the device has not acknowledged yet, check again later", "this machine has local remote control disabled / this machine's drawing is locked / it is class time, the device does not allow drawing".
