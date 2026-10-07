---
title: Security & FAQ
createTime: 2026/10/06 10:00:00
---

# Security & FAQ

> The first half covers security and data; the second half is troubleshooting.

## Where the security boundary is

```
Console (UI) → Server (authorizes) → Device (decides, may refuse)
```

The vendor-hosted instance is run by us, so treat it as a component that **may be compromised** — the parts of it that are not public (operational configuration and keys) are not something you can verify either. What actually protects you is what you can see and touch:

- **A hidden button is not a security boundary**: roles are checked on the server;
- **The server cannot force a device**: it can only refuse to deliver;
- **The device decides**: with its switch off, nothing is executed no matter who sends it.

The vendor states four design premises for Control: **power stays on the device, delivered content must be signed, action commands must expire, and the device can disconnect and everything is audited**. Because these depend on server-side implementation you cannot verify them yourself — so in practice rely on **device behaviour, group roles and the audit log**.

## Student rosters and personal data

- Rosters are **not** uploaded continuously: the device returns one only when someone with **admin or above** clicks "Read device rosters";
- Reads **exclude disabled members** by default;
- Draw receipts carry only the member ID and name, and **the text of an announcement is never written to logs**;
- The audit holds **no names, passwords or tokens** — only who did what, on which device, and with what outcome;
- Advice: **do not put student names or other private data into display names or node IDs** (the audit keeps them long-term), and store or destroy exported rosters and CSV files according to your school's rules.

## Self-protection you can use

| You want to | How |
|---|---|
| **Revoke remote control immediately** | Turn off "Allow remote control" on that device (effective even offline) |
| **Keep an account out** | **Remove that member** from the group (removing a device is not a ban) |
| **Revoke a device's sign-in** | Sign out of the SECTL account on the device, or on the SECTL website |
| **Hand the group to someone else** | The owner starts a **transfer**; it takes effect once both sides confirm |
| **Find out who did what** | The group's **audit log** (admin and above; exportable — see [Console](/en/doc/control/console)) |
| **Keep two sets of people apart** | Use two groups: outside a group you see nothing in it |

## FAQ

### Do all classroom machines have to sign in with the same account?

**No.** Each machine can use its own SECTL account; the only requirement is that the account is **a member of the group** (a group you created, or one you were invited into). Enter the group ID, turn the switch on, and it joins as a node. If a machine cannot connect, first check whether the account signed in on it belongs to the group.

### My classroom machine is missing from the console

Check in order: is the device **signed in**, is the **Group ID** correct, is **Allow remote control** on, and is **the signed-in account a member of that group**? The connection status on the device tells you which step is failing.

### The device says "stopped retrying"

It hit a failure that retrying cannot fix; the note beside it says whether that is "not signed in", "no group ID", "not a member of that group", "no such node in this group" or "credentials rejected". Fix it and click **Reconnect now**.

### The device flips between online and offline

Online state comes from a long connection with periodic heartbeats. Brief network jitter shows as offline; the device **reconnects automatically** and needs no manual action.

### I clicked "Draw now" and nothing happened

Read the receipt: **queued** means the device is offline (it is delivered on reconnect and **dropped if expired**); **expired** means it took too long in transit — just send it again; **rejected** comes with the reason (switch off, locked, already drawing, local verification required, class time, …).

### Does "lock drawing" still apply while the device is offline?

Yes — it is a stored state and converges when the device comes back. Two caveats: a locked machine **cannot draw locally either**, and if the machine **turns its own switch off**, the lock no longer applies to it.

### I turned the device's switch off — how do I get it managed again?

Turn "Allow remote control" back on that machine: the connection returns and any stored lock applies again. The console has no way to turn that switch on for you.

### Why can I not change settings or read rosters?

**Changing settings, reading rosters and pushing rosters** need admin or above; **reading settings**, locking drawing and starting a draw need operator or above. Settings must also be read from the device before they can be edited, and security, desktop integration or update categories can never be changed remotely.

### Can I cancel a command sent while the device was offline?

A command that is still **queued and not yet delivered** can be revoked (two clicks on "Revoke"), so it will not run when the device reconnects. Once **delivered to the device** it cannot be recalled — you can only wait for it to finish. Revocations are recorded in the audit log.

### The announcement has no sound

Typical causes: the machine's **voice master switch is off** (the interface offers to turn voice on), this announcement's volume was set to 0 (mute), or the device is drawing and refused the command.

### It says "too many commands"

Devices rate limit consecutive commands; wait a moment instead of clicking repeatedly.

### The invite code expired or was already used

Codes are **single-use and expire 72 hours after creation** — ask the inviter to create a new one on the **Invites** tab. Expired codes do not affect members who already joined.

### How many groups can one account create?

**100** by default (the interface shows the progress). At the limit you can **transfer** or **dissolve** groups you no longer need.

### How do I remove someone from Control entirely?

**Remove that member** from the group's member list: they immediately lose all permissions in the group. Note that **removing a device is not a ban** — while that member is still in the group, the machine reappears when it reconnects.

### Can one device belong to two groups?

No. The device has a single **Group ID**; changing it switches the machine to another group.

### How do I hand over or rebuild a group?

Use **transfer ownership** for handovers (effective after both sides confirm). **Dissolving** is irreversible: all permissions, device registrations, command history and settings are deleted, and the rebuilt group is a different group (different group ID) whose ID devices must enter again — so do not use it as a cleanup tool.

### Can I host my own server? How long is the audit kept?

**You can deploy it yourself**: the server and Web console source are public, so you can run the server on your own machine — but **for now it is only good for a trial run**, because self-hosted sign-in (local accounts / Feishu / DingTalk) is still in development: the code today contains no identity source, and an instance you deploy cannot be signed into. See [Self-Hosting](/en/doc/control/self-host). The audit log is **kept for 30 days**; older records are cleaned up automatically, so export from the console if you need a long-term archive.
