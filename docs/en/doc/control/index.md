---
title: Overview
createTime: 2026/10/06 10:00:00
---

# Control Overview

> Control is the centralized management side of SecRandom: when classroom machines are spread across rooms, you can watch every device and operate them all from a browser in your office.

## What it gives you

- Open the console and see **which machines are online**, what they are called, their version and when they last reported;
- Remotely **lock drawing, start a draw, reset the current round, or play an announcement**;
- **Change settings and update rosters or prize pools** without walking to each machine;
- Every action on every machine is **recorded in the audit log**.

Without Control, SecRandom works exactly as before — joining just adds a layer that can be managed remotely and can opt out at any time.

## What you need

| | |
|---|---|
| **Account** | A SECTL account. Control has no separate accounts: the console and the device use the same one |
| **Devices** | SecRandom v3 desktop client on the classroom machine. A **tablet can be both a remote and a managed device**; a phone can only be a remote |
| **Network** | The device only needs outbound internet access, so campus network rules usually need no changes |

## Set up in six steps

1. **Sign in on the classroom machine** with your SECTL account (account area of the settings page).
2. **Create a group in the console**: [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn). Pick a name you will recognise, such as "Class 1-3 · Podium PC".
3. (Optional) **Invite others**: generate an invite link; they sign in and join with the role you choose.
4. **Enter the group ID on the machine** and turn on "Allow remote control" (Settings → General → Control).
5. **Check the node list in the console**: the device appears and shows as online once it connects.
6. **Try it out**: on the device page, click "Draw now" or "Lock drawing".

::: tip No manual device registration
As long as the device signs in with a **member account**, has the right group ID and the switch on, it appears in the list automatically. If it does not, read the connection status and message on the device itself.
:::

## One principle

> The remote does not decide — **the device does**.

Every classroom machine keeps its own switch. Once it is off, no remote operation is accepted; a stolen account or a mistaken admin does not by itself mean a controlled classroom. See [Security & FAQ](/en/doc/control/security).

## Open source and feedback

- The **server and Web console are not open source yet**. The public repository [SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console) currently holds the license and notes only; console source and the protocol specification are planned to follow.
- The **device-side implementation is public**: [SECTL/SecRandom](https://github.com/SECTL/SecRandom) (GPL-3.0).
- Only the **vendor-hosted** service exists today; self-hosting is not supported yet.
- Feedback: [SecRandom issues](https://github.com/SECTL/SecRandom/issues).
