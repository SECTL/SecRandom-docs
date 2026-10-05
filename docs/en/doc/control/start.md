---
title: Getting Started
createTime: 2026/10/05 12:00:00
---

# Getting Started

> Goal: get your first classroom machine into the console's node list **within ten minutes**, and run one remote operation on it.

## Before you start

| You need | Notes |
|---|---|
| **A SECTL account** | The console and the device use the same account system; no separate registration |
| **SecRandom v3 desktop client** | Installed on the classroom machine. A phone **cannot** be a controlled device, but it can act as a remote |
| **Network access** | The device dials out to the control service (outbound long connection), so no inbound port is normally required |

## Step 1: sign in on the classroom machine

1. Open SecRandom on the classroom machine and go to **Settings**.
2. In the account area of the settings page, click **Sign in** and finish the SECTL authorization in the browser.
3. Once signed in, the account area shows the avatar, display name and user ID.

::: tip Why sign in first
The device connects using **the account signed in on that machine**, and that account must be a member of the target group — otherwise the connection is rejected. If you use the same account on several machines, just sign in once per machine.
:::

## Step 2: create a group in the console

1. Open [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn), click **Sign in** and complete the SECTL authorization.
2. In the console, click **Create group** and give it a recognizable name, for example "Building 3, Floor 2" or "Class 1-3 · Podium PC". A "**class · location**" style name is easiest to pick out later.
3. You are now the **owner** of that group. The group page shows its **Group ID**, which you need in the next step.

::: info One group is one permission boundary
A group is roughly one management unit (a grade, a campus, a lab). If classrooms should not see each other, create separate groups. People outside a group **see nothing** in it.
:::

## Step 3 (optional): invite others

1. Open the group's **Invites** tab (admin or above) and click **New invite**.
2. Pick the role to grant (you can only invite roles **below your own**; the owner role only comes from a transfer).
3. Send the generated **invite link** or **invite code**. The recipient signs in, redeems it, and joins with the role you chose.

::: warning Keep invite codes private
An invite code is **single-use and expires 72 hours after creation** — do not post it in public chats. The recipient can paste the whole link into the join page; the code is extracted automatically. Revoking it invalidates it immediately; already redeemed codes are unaffected.
:::

## Step 4: enable Control on the device

On the classroom machine, open **Settings → General → Control** (desktop only):

| Field | What to enter |
|---|---|
| **Group ID** | Paste the **Group ID** from the console |
| **Node channel URL** | Keep the default (online node channel); normally no change needed |
| **Node ID** | Generated at install time and stable — **do not change** |
| **Display name** | Something like "Class 301 podium PC". If left empty, the host name is reported |
| **Allow remote control** | **Turn it on** |

Changes apply immediately; there is no "Save" button on this page.

::: tip What that switch means
"Allow remote control" is **the machine's own gate**. When it is on, group members with sufficient roles can operate it; when it is off, nothing sent by the server is executed. See [Device Settings](/en/doc/control/device).
:::

## Step 5: confirm it appears in the console

Open the group's **Nodes** tab and wait a moment — the list refreshes automatically once the device connects. You should see the machine marked **online**.

::: info No manual device registration
Control uses **register-on-connect**: once a classroom machine signs in with a member account, has the right group ID and the switch on, its first connection is registered in the node list. The **device name, capability list and local switch state are all reported by the device** and cannot be changed by the console.
:::

## Step 6: try one remote operation

Open the device's **detail page** (click its node ID):

- **Lock / unlock drawing** — a *desired state*: it still applies while the device is offline and converges when it comes back
- **Draw now** — an *action command*: the button requires **two clicks** (the first arms it, the second within a few seconds sends it) and carries an expiry time, so it is discarded rather than executed late
- **Announce a sentence** — spoken by that machine's own speech engine, up to 200 characters

You can also use the phone app as a remote: sign in with the same account and open **Draw → Remote draw**, pick a group, device and roster, then draw.

## Common blockers

| Symptom | Cause | Fix |
|---|---|---|
| Device status is **Waiting for sign-in or group ID** | Not signed in, or the group ID is empty | Sign in, then enter the group ID |
| Device says **not signed in to a SECTL account** | This machine is not signed in | Sign in on the device |
| Device says **group not found, or the account is not a member** | The signed-in account is not in the group | Invite that account with an invite code, or sign in with a member account |
| Device says **no such node in this group — register it in the console first** | The server has register-on-connect disabled, or the group ID is wrong | Double-check the group ID; otherwise ask the administrator |
| Device status is **stopped retrying** | A failure that retrying cannot fix (credentials / group / format) | Follow the note next to it, then click **Reconnect now** |
| The machine is missing from the node list | Not connected, or the account is not a member | Check the device-side status text first |

For deeper troubleshooting see the [FAQ](/en/doc/control/faq).
