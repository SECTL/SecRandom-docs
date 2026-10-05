---
title: Console
createTime: 2026/10/06 10:00:00
---

# Console

> Address: [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn) — sign in with your SECTL account.

## Signing in

Clicking **Sign in** takes you to SECTL for authorization and back. No account token is stored in the browser; **signing out on the SECTL website also ends the console session**, so you will need to sign in again.

## A group is the permission boundary

A group is roughly one management unit (a grade, a campus, a lab). **People outside a group see nothing in it**, so use separate groups when two sets of people should not see each other.

- Whoever creates a group becomes its **owner**, and the **Group ID** shown on the group page is the value devices enter to join;
- An account may own up to 100 groups; at the limit you can **transfer** or **dissolve** groups you no longer need — both release the quota;
- Name groups by **area or venue**, such as "Building 3, Floor 2" or "Lab A": one group per area covers all the classroom machines in it. Naming by class also works, but you will end up with many more groups.

### Dissolving a group (irreversible)

Only the **owner** can dissolve a group. The entry sits in the group's danger zone, and you must **type the group name** in the confirmation dialog. Afterwards:

- **Every member loses access immediately**;
- Invite codes, device registrations, command history and drawing settings are **deleted and cannot be restored**;
- Online classroom machines are disconnected and then fail to reconnect with "group not found or not a member";
- The group you create next is **a different group** (different group ID), so devices must enter the new ID.

::: warning Export the audit before dissolving
Once the group is gone, its audit page is gone too — and the log itself is only kept for 30 days. Export the CSV beforehand if you need a record.
:::

## Members and four roles

| Role | What it can do |
|---|---|
| **Viewer** | See status only: device list, online state, device information |
| **Operator** | Also remote control: lock / unlock drawing, start a draw, reset the round, announce; can read device settings |
| **Admin** | Also change settings, read and push rosters and prize pools, manage members and device registration, view the audit log, rename the group |
| **Owner** | Everything, and the only role that can transfer or dissolve the group |

Two hard rules:

- **You can only invite or manage people below your own rank**; you cannot promote yourself or modify anyone at your rank or above;
- **The owner is unique**: it cannot be removed or granted directly, only produced by a **transfer**.

If a button is missing, your role is usually the reason; buttons for a device are also hidden when that device does not support the operation.

## Inviting others

On the group's **Invites** tab, create an invite, choose the role, and send the **link or code** — the recipient signs in and redeems it.

- A code is **single-use and expires 72 hours after creation** — do not post it in public chats;
- The role they get is exactly the one you picked;
- Unredeemed invites can be revoked; **redeemed ones are unaffected**;
- Once they join, **their classroom machine signs in with their own account**, enters this group ID and joins as a node — no need to share your account.

## Transferring ownership

The owner starts a transfer: pick a member → they confirm in their own session → you become an admin. **Nothing changes before that confirmation**; a rejection or timeout cancels it and you can start again. Use transfers for handovers, not dissolving and rebuilding.

## Device list

Each device shows: online state, device name, node ID, platform and version, whether drawing is locked, whether the local switch is off, and when it last reported. Expanding a row also shows **which operations it supports**.

- Filter by "online only" or "locked only";
- Select devices to **bulk** lock / unlock drawing or announce; bulk actions are sent device by device and the interface reports any failures;
- **Removing a device only deletes its registration, it is not a ban**: as long as that member is still in the group, the machine reappears when it reconnects. To keep someone out, **remove the member**.

## Audit log

Visible to **admins and above**. It records group creation / rename / **dissolution**, member invite / join / role change / removal, invite creation / revocation, transfers, device registration, every push and **revoked queued command**, plus **denied privilege attempts** — each with time, actor, source device (browser or phone) and outcome.

- Filter by time, event, outcome, device or actor;
- **Export CSV** (exports the current filter, up to 5000 rows);
- The audit **never records passwords, tokens or student names**.

::: warning Kept for 30 days only
The audit log is **kept for 30 days**, after which older records are cleaned up automatically. Export the CSV regularly if you need a long-term archive.
:::
