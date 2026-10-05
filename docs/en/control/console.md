---
title: Using the Console
createTime: 2026/10/05 12:00:00
---

# Using the Console

> Console address: [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn) — sign in with your **SECTL account**.

## Sign-in and sessions

- Clicking **Sign in** takes you to SECTL for authorization and back to the console; when already signed in, the home page offers **Enter console**.
- **The browser only holds an opaque session identifier.** SECTL access tokens stay on the server and never reach browser scripts.
- The session is revalidated against SECTL periodically, so **signing out on the SECTL website also ends the console session** — you will need to sign in again.
- Opening a console URL from outside revalidates the session once; navigation inside the console does not bounce you around.
- If the service is temporarily unavailable, the sign-in page says so and **does not** push you to the authorization page; just retry.

## Home: my groups

| Area | Description |
|---|---|
| **My groups** | Groups where you are the **owner** (transferring one releases its quota) |
| **Joined groups** | Groups you were invited into |
| **Create group** | Create a group and become its owner; "class · location" is a good naming style |
| **Join with code** | Paste an invite link or an invite code |
| **Ordering** | Group order is an account preference stored on the server, so it follows you across machines |

::: info Group quota
An account may **own** up to **100 groups** by default; the interface shows used / limit. When you hit the limit, transfer a group you no longer need before creating another.
:::

## Group page

The header shows **total nodes, online, locked, members** and the **Group ID**. Below are four tabs:

| Tab | Who can see it | Description |
|---|---|---|
| **Nodes** | all members | Device list, filters, bulk operations |
| **Members** | all members (actions trimmed by role) | Member list, role changes, removal |
| **Invites** | admin and above | Invite codes and links |
| **Audit log** | admin and above | Operation trail and export |

Admins and above can also **rename the group** (non-empty, up to 64 characters). The owner can start a **transfer**.

## Members and roles

Four single-layer roles, higher rank means more power:

| Role | What it can do |
|---|---|
| **Viewer** | See status and summaries only (node list, online state, device info) |
| **Operator** | Viewer + remote control: lock/unlock drawing, trigger a draw, announce; can **read** device settings |
| **Admin** | Operator + change settings, change rosters (including reading them) + manage members + manage node registration + view audit + rename the group |
| **Owner** | Everything, including transferring the group; exactly one per group |

Minimum role per capability:

| Capability | Meaning | Minimum role |
|---|---|---|
| `node.status.read` | Read status | Viewer |
| `proof.list` | Read proof list | Viewer |
| `draw.lock` | Lock / unlock drawing | Operator |
| `draw.trigger` | Trigger one draw | Operator |
| `media.play` | Show result / announce | Operator |
| `settings.read` | Read settings | Operator |
| `settings.write` | Change settings | Admin |
| `roster.read` | Read rosters | Admin |
| `roster.write` | Change rosters | Admin |

Four membership rules (dropping any one opens a privilege-escalation path):

1. You can only invite members **below your own rank**;
2. You cannot modify or remove members at **your rank or above**;
3. You cannot promote yourself;
4. The **owner is unique**: it cannot be removed, cannot be granted directly, and only comes from a transfer.

::: tip Interface trimming is not the security boundary
Buttons you are not allowed to use are hidden or greyed out — but the real check always happens on the server. The same applies to devices: **operations are trimmed by the capabilities each device declares**, so unsupported buttons simply do not appear and never "do nothing".
:::

## Inviting people

1. Open the **Invites** tab (admin and above) and click **New invite**.
2. Choose the **role to grant** — only roles below your own, never owner; the default is Operator.
3. Copy the **link** (`…/join?code=…`) or just tell the person the **invite code**.
4. The list shows the code, role, creator, expiry and status (pending / redeemed / expired / revoked); pending ones can be **revoked**.

Rules and notes:

- The code is **single-use** and **expires 72 hours after creation** — never post it in a public chat;
- The recipient must sign in to SECTL first; the code survives that sign-in round-trip;
- The redeemed role is **exactly the role picked when the invite was created**;
- Revoking invalidates the code immediately, and **does not affect invites already redeemed**.

## Transferring ownership

The owner can hand ownership to another member; **both sides must confirm**:

1. The owner picks a member and clicks **Send transfer request**;
2. **Nothing changes yet** — the recipient sees "someone wants to transfer ownership to you" in their own session;
3. When the recipient clicks **Accept and become owner**, the previous owner becomes an **Admin**;
4. Rejection or expiry (server-configured, 48 hours by default; the interface shows the exact deadline) cancels the request with no permission change — you can start again.

## Nodes tab

Each device row shows:

| Field | Description |
|---|---|
| **Online / offline** | Decided by the server from the last heartbeat; the page refreshes every 10 seconds and presence changes are pushed immediately |
| **Device name** | Set and reported by the device; if unset it shows as unnamed (set it on that client) |
| **Node ID** | The device's unique identity, and the link to its detail page. **Names can repeat and are lost on reinstall; only the node ID pins a machine** |
| **Platform / version** | For example Windows / 3.x.y |
| **Locked** | The *desired state* **sent by the console** |
| **Local remote disabled** | The switch state **reported by the device**; the console cannot change it |
| **Capabilities** | Visible when the row is expanded; decides which operations are available |
| **Last heartbeat / first registered** | Useful to spot a replaced machine or a long-lost device |

Filters and bulk operations:

- Filters: **online only**, **locked only**, clearable at any time;
- Selection applies only to the **current filter result**, is not stored, and is dropped on refresh;
- Bulk operations (Operator and above): **lock drawing**, **unlock drawing**, **announce** (up to 200 characters, spoken by each machine's own engine; machines that are drawing refuse);
- Bulk removal (Admin and above): sent **device by device** — there is deliberately no "whole group in one click" button, which would be the easiest way to disturb an entire floor;
- Selected devices that lack the capability are explicitly skipped and counted, for example "N device(s) skipped because they did not declare lock/unlock";
- Bulk results distinguish "completed / partially completed / failed" and **list the failing device IDs**.

::: warning Removing a node is not a ban
Removing a node only **clears the registration record**; it does not stop that machine from connecting again. As long as the member is still in the group, the machine reappears the next time it connects. To ban someone, **remove the member**.
:::

## Device detail page

The header always shows device name, online state, **locked**, **local remote disabled**, node ID, platform, version, last heartbeat, first registration and capabilities. Then four tabs:

### Overview

- **Status summary**: connection, draw switch (console-issued), local remote control, most recent command;
- **Draw switch (desired state)**: shows the `revision` and whether it was delivered; offline devices show "saved and will converge when it comes online";
- **Actions**: lock / unlock drawing, draw now, remove node (Admin and above), announce;
- **Draw options** (collapsed by default): "Quick draw (device default roster)" or "Roll call", the latter taking roster, gender, group and count — **only for this one request, it does not change the device's defaults**; the console also runs a **local pre-check** against the roster it has read;
- **Receipt panel**: shows the status, command ID and the device's reason, translated, with the next step where possible (for example an "Enable voice" button when the device's voice master switch is off);
- **Latest draw**: who was drawn, from which roster, how many.

### Settings

- **You must click "Read from device" before editing** — until then the controls are disabled (visible but not editable);
- Setting names and descriptions come from the client's own settings pages and are shown in the console language; **current value, range and whether it is remotely writable come from the device**;
- Three row states matter: **not remotely writable**, **not read yet**, and **pending** (you changed a draft but have not submitted);
- Four areas are **never remotely writable**: **security settings, Control's own settings, desktop integration (autostart, protocol registration), update settings** — the device refuses anything outside the whitelist on purpose (remotely enabling autostart or loosening security would hand over device ownership);
- Submission is **all or nothing**: only changed and writable items are sent, and one invalid item rejects the whole command;
- After a successful push the console **reads the device again** and reports that the view matches the device;
- There is no rollback/restore for settings, so double-check before pushing.

### Rosters

- **Roll-call rosters** and **lottery pools** are two sections of the same page, **each with its own draft** that survives switching;
- Start with **Read device rosters** (Admin and above): this is the **most sensitive read channel** in Control because rosters contain student names;
- You can then edit rows, add rows, **import a file** (`.xlsx / .xls / .xlsm / .csv / .tsv / .txt`, with sheet, header row, row range, column mapping and a preview) and **export CSV**;
- **Import only changes the console-side draft**; click **Push draft** to write it to the device;
- Two push modes:
  - **Merge (default)**: updates only the members you changed, deletes nothing;
  - **Replace all**: **people missing from the payload are deleted** — the confirmation says so explicitly;
- When a roster is large the device returns only part of it and marks it **truncated**; the interface then tells you to use "merge", because "replace all" would delete everyone who was not returned;
- An import is limited by row count (currently 2000 rows) and larger files are rejected;
- Pushing a roster **does not switch the roster the device is currently using** (so it does not interrupt a class);
- Before writing, the device **backs up the previous roster** to its local `data/backup/roster/` folder.

### Command history

Only commands sent by you **since this page was opened**, newest first; reloading the page clears it. The real trail lives in the **audit log**.

## Receipts: read the status, not "sent"

"Sending succeeded" and "execution succeeded" are different things:

| Status | Meaning |
|---|---|
| **Queued** | The device is offline; it will be delivered when it reconnects (and skipped if expired by then) |
| **Delivered** | The command reached the device; no result yet |
| **Accepted** | The device is executing it |
| **Completed** | Success |
| **Rejected** | A configuration matter (switch off, capability not declared, setting not remotely writable) — not a runtime failure |
| **Failed** | Accepted, then failed while executing |

Common reasons (each is explained in the interface):

- "This machine's local switch is off (the device turned it off; the console cannot change it)" — enable it on the device;
- "The device is rate limiting: at most M commands per N seconds, please retry later" — do not hammer the button;
- "This command expired before the device received it. Action commands are discarded, never executed late — please resend";
- "The device rejected this command: setting … is not remotely writable" — see the whitelist above.

## Audit log

- **Admin and above only**: the audit contains member and device information;
- Recorded events cover: group creation/rename, member invite/join/role change/removal, invite create/revoke, transfer request/confirm/reject/expire, node registration, policy delivery;
- Each record has time, event, target, detail, actor, **source device** (browser session / app) and outcome (success / denied / failed);
- **Denied privilege attempts are recorded too** (outcome "denied");
- Filter by event type, outcome, time range, source device, target device and actor; filtering runs on the server;
- **Export CSV** (exports the current filter, up to 5000 rows, with a hint to narrow the filter when truncated);
- The audit **never records credentials, tokens or student names** — details hold only publishable short strings such as role names or denial reasons.

::: warning Retention
No retention period is currently promised. Export CSV regularly if you need a long-term archive.
:::
