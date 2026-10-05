---
title: FAQ
createTime: 2026/10/05 12:00:00
---

# FAQ

## Getting started

### Do I need to install anything extra?

No dedicated "control agent" is needed. The console is a web page at [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn); each classroom machine only needs the **SecRandom v3 desktop client**, with the switch enabled under **Settings → General → Control**.

### What can the phone app do?

The phone is **not** a controlled device but a **remote**: sign in with the same account, open **Draw → Remote draw**, pick a device and roster, set conditions and send. The draw itself happens on the classroom machine. There is no "Control" settings page on the phone.

### Can one classroom machine belong to two groups?

No. The device has a single **Group ID** field; changing it switches the machine to another group (where it appears as that group's node).

### Where do I change the device's display name?

On **that device**: **Settings → General → Control → Display name**. The device is authoritative; the console can only show it (it may supply an initial name for a device that has never connected).

## Cannot connect / device missing

### My classroom machine is missing from the console. What should I check?

In order:

1. Is the device **signed in to a SECTL account**? (If the status is "waiting for sign-in or group ID" with "not signed in", it is not);
2. Is the **Group ID** correct? (Copy and paste it from the console);
3. Is **Allow remote control** on?
4. Is **the signed-in account a member of that group**? (Otherwise it is refused with "group not found, or the account is not a member").

::: tip There is no manual "register device" step
As long as the device signs in with a **member account**, has the correct group ID and the switch on, it **appears in the node list automatically** on first connect (register-on-connect). If it does not, one of the four items above is the cause.
:::

### The device says "stopped retrying". What now?

It hit a failure that retrying cannot fix. Read the note next to the status:

- "Not signed in to a SECTL account" → sign in;
- "Group ID not entered yet" → enter the group ID;
- "Group not found, or the account is not a member" → invite the account;
- "No such node in this group — register it in the console first" → ask an administrator to register this device's **node ID**;
- "The server rejected this node's credentials…" → contact the vendor.

Then click **Reconnect now**.

### The device flips between online and offline

The device keeps an outbound long connection with a heartbeat about every 25 seconds; the server marks it offline after roughly 75 seconds without one, and the console page refreshes every 10 seconds. Brief flapping is usually campus network jitter, and the device **reconnects automatically with backoff** — no manual action needed.

## Remote operations

### I clicked "Draw now" but nothing happened

Check the **receipt** first:

- **Queued** → the device is offline; the command is delivered when it reconnects, and **skipped if expired by then**;
- **Expired** → action commands are dropped when expired, never executed late; just resend;
- **Rejected** → follow the reason shown (local switch off / drawing locked / already drawing / local verification required / class-time restriction).

### Does "lock drawing" still count while the device is offline?

Yes. It is a **desired state**: once set it applies even while the device is offline and converges when it reconnects. Two caveats:

- A locked device **cannot draw locally either**;
- If the device **turns off its own "Allow remote control" switch**, the previously pushed lock no longer affects it — revoking remote control revokes every remote constraint.

### Why does it say "local remote disabled"?

**The device itself** turned the switch off. The console has no way to turn it back on; only the machine can. That is the design: the remote does not decide, the device does.

### Why can I not change settings or read rosters?

Check your role: **reading settings** needs operator or above; **changing settings**, **reading rosters** and **pushing rosters** need admin or above. Buttons are hidden or greyed out when your role is insufficient. Also:

- You must click **Read from device** before editing settings;
- **Security settings, Control's own settings, desktop integration (autostart / protocol registration), update settings, backup settings and proof retention** can **never** be changed remotely (shown but marked "not remotely writable").

### The announcement has no sound

Common causes:

- **The device's voice master switch is off** — the interface says so and admins and above can click **Enable voice** to fix it;
- The announcement volume was set to 0 this time: 0 means "mute" and is different from "do not change";
- The device is currently drawing, so the command was rejected.

### It says "too many commands"

The device rate limits itself (roughly 20 commands per 10 seconds by default) and reports the window and limit when refusing. Wait a moment and retry.

## Groups, invites and permissions

### The invite code expired, or someone already used it

Codes are **single-use and expire 72 hours after creation**; ask the inviter to generate a new one on the **Invites** tab. Revoked or expired codes do not affect members who already joined.

### How many groups can one account create?

**100** by default (the interface shows the progress). At the limit, transfer a group you no longer need.

### How do I remove someone from Control entirely?

**Remove that member** from the group's member list: the account immediately loses all permissions in the group. Note that **removing a node is not a ban** — it only clears the record, and the machine reappears if that member is still in the group.

### Can the owner be transferred or removed?

- It can be **transferred**: **both sides confirm**, nothing changes before that, and the request expires. After the transfer the previous owner becomes an admin;
- It **cannot be removed**: the owner is unique, cannot be removed and cannot be granted directly — only a transfer creates one.

## Data and open source

### Are student names uploaded?

Rosters are **not** uploaded continuously: the device returns a roster only when someone with **admin or above** clicks "Read device rosters". Announcement text is not written to logs, and the audit **never records student names**. Handle exported rosters and audit CSVs according to your school's personal-information rules.

### Is Control open source?

- **The server and Web console are not open source yet.** The public repository [SECTL/SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console) currently holds the license, the trust-boundary statement and onboarding notes; the console source and protocol specification are planned to be added there later.
- **The device-side implementation is public** with the client: [SECTL/SecRandom](https://github.com/SECTL/SecRandom) (GPL-3.0).

### Can I host my own control server?

Not for now. The protocol is public but the implementation is not, and **no self-hosting option is offered yet** — only the vendor-hosted service.

### How long are audit records kept?

**No retention period is promised.** Export CSV from the audit tab periodically if you need an archive (export is capped at 5000 rows; narrow the filter when truncated).

## Still stuck?

- [SecRandom issues](https://github.com/SECTL/SecRandom/issues)
- [SecRandom-Control-Console issues](https://github.com/SECTL/SecRandom-Control-Console/issues)
