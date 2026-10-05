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

1. **Sign in on the classroom machine**: use that machine's own SECTL account — **the machines do not need to share one account**.
2. **Create a group in the console**: [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn). Name it by **area**, such as "Building 3, Floor 2" or "Lab A" — one group per area covers every classroom machine there.
3. (Optional) **Invite others**: generate an invite link; they sign in and join with the role you choose, and their classroom machines can join this group too.
4. **Enter the group ID on the machine** and turn on "Allow remote control" (Settings → General → Control).
5. **Check the node list in the console**: the device appears and shows as online once it connects.
6. **Try it out**: on the device page, click "Draw now" or "Lock drawing".

::: tip The key point: the account on the machine only has to be *in the group*
The machines do **not** have to share one account. **Each machine can use its own account** — as long as that account is **already a member of this group** (either the group you created or one you were invited into), entering the group ID and turning the switch on makes it join as a node.

Conversely, if the account signed in on that machine is **not in the group**, the connection is refused — invite that account into the group and try again.
:::

::: tip No manual device registration
Once a device joins, it appears in the node list automatically — there is no "add device" step in the console. If it is missing, read the connection status and message on the device first.
:::

## One principle

> The remote does not decide — **the device does**.

Every classroom machine keeps its own switch. Once it is off, no remote operation is accepted; a stolen account or a mistaken admin does not by itself mean a controlled classroom. See [Security & FAQ](/en/doc/control/security).

## Open source and feedback

- The **server and Web console are not open source yet**. The public repository [SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console) currently holds the license and notes only; console source and the protocol specification are planned to follow.
- The **device-side implementation is public**: [SECTL/SecRandom](https://github.com/SECTL/SecRandom) (GPL-3.0).
- Only the **vendor-hosted** service exists today; self-hosting is not supported yet.
- Feedback: [SecRandom issues](https://github.com/SECTL/SecRandom/issues).
