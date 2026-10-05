---
title: Security & Privacy
createTime: 2026/10/05 12:00:00
---

# Security & Privacy

> The control service is vendor-hosted and **not open source**. The right stance is therefore not "trust it", but **treat it as a component that may be compromised**, and keep the real boundary where you can see and touch it.

## The four design premises

The vendor lists these four as **design premises** of Control (not nice-to-haves):

1. **Power stays on the device** — any operation that changes device behaviour must be refusable by **local authorization on the device**; account permissions decide *who may send*, not *what the device must accept*.
2. **Delivered content must be signed** — policies and rosters are applied only after signature verification; "I am the server" is not itself trust.
3. **Commands must expire** — action commands carry an expiry time, are dropped when expired, and are **never executed late**.
4. **Disconnectable and auditable** — a device can disconnect locally with one switch, effective even offline; every remote operation leaves an audit record.

::: warning These are commitments, not something you can audit
The server is not open source, so you cannot verify that these premises are implemented without compromise. In practice, rely on **what you can verify**: the local switch, the device's behaviour, and the audit log.
:::

## Where the security boundary actually is

```
Console (UI)  →  Server (authorizes)  →  Device (final authority, may refuse)
```

- **Interface trimming is not a security boundary**: whether a button is shown is usability; the real role check happens on the server;
- **The server is not the final authority either**: it can refuse to deliver, but cannot force a device to execute;
- **The device is the final authority**: with the local switch off, nothing is executed no matter who sends it.

### The switch on the device cannot be changed by the server

"Allow remote control":

- Is **reported only by the device itself**; neither the console nor any interface can turn it on or off;
- When off, it **does not connect at all**, and any command frame received anyway is **refused**;
- **Does not live in the normal settings file** (it is in `data/config/control/node-state.json`), so **importing settings or restoring a backup never silently enables remote control**.

### "Desired state" versus "action command"

- **Lock / unlock drawing** is a **desired state**: it is stored, applies while the device is offline, and converges when it reconnects;
- **Draw now / announce / change settings / push roster** are **action commands**: they carry an expiry time and are dropped rather than executed late.

::: tip Turning the local switch off releases the previous lock too
The drawing lock only applies while remote control is allowed locally. This is intentional: **revoking remote control revokes every remote constraint as well**.
:::

## Accounts and sessions

- Control has **no separate account system**: identity comes entirely from the **SECTL account**; there is no separate registration or password;
- The console is browser + server-side session: **the browser only holds an opaque session identifier**, and SECTL access tokens stay on the server;
- The session is revalidated against SECTL periodically, so **signing out on the SECTL website also ends the console session** (after a revalidation interval, not instantly);
- **A group is the permission boundary**: outside a group, the console shows **nothing** — not even whether the group exists;
- **Role changes affect the next command immediately**: after a role change or removal, the next delivery is refused by the server; no notification to the device is needed.

### Dangerous operations are confirmed

- **Draw now**: the button requires **two clicks** (the first arms it, and it resets if you do nothing for a few seconds);
- **Remove node / bulk remove**: the confirmation spells out "this does not stop the machine from connecting again";
- **Remove member**: the confirmation explains that the account immediately loses all permissions in the group;
- **Announce**: nothing is sent directly; a "Broadcast options" dialog confirms text and volumes first.

## Audit: everyone is on the record

- Recorded events cover: group creation/rename, member invite/join/role change/removal, invite create/revoke, transfer request/confirm/reject/expire, node registration, policy delivery;
- Each record holds time, event, target, detail, **actor**, **source device** (browser session / app) and outcome;
- **Denied privilege attempts are recorded too** (outcome "denied");
- The audit is **visible to admins and above only**, filterable by event type, outcome, time range, source device, target device and actor, and **exportable as CSV**;
- The audit **never records credentials, tokens or student names**; details hold only publishable short strings such as role names or denial codes.

::: info Source device
The audit distinguishes "operated on a computer" from "operated on a phone" — a phone is the device most likely to be borrowed or unlocked, and that distinction matters in a post-mortem.
:::

## Data and privacy

### What a device reports

While connected, a device continuously reports **non-sensitive state**: node ID, group ID, platform, version, capabilities, local switch state, display name and the applied policy revision. **Class and lesson information is not reported.**

### Student names only travel when you read them

- Rosters are **not** continuously uploaded: only when someone with **admin or above** clicks "Read device rosters" does the device return the roster (including student names) for that operation;
- Reads **exclude disabled members by default**, so they are not mistaken for deleted ones;
- Draw receipts **carry only the member ID and name**, no other member fields;
- **The text of a remote announcement is not written to logs** — only its length is.

::: warning Handle exported rosters carefully
The console can export rosters as CSV. Once the file is on your computer it is outside Control — store and dispose of it according to your school's personal-information rules.
:::

### Two suggestions for administrators

- **Do not** put student names or full classroom names into **node IDs** or display names: the audit keeps them long-term. A display name such as "Class 301 podium PC" is enough;
- **Export the audit CSV periodically** if you need a long-term archive: no retention period is currently promised.

## Self-protection you can use

| You want to | How |
|---|---|
| **Revoke remote control immediately** | Turn off "Allow remote control" on that device (effective even offline) |
| **Keep an account out for good** | **Remove that member** from the group (removing a node only clears its record, it is not a ban) |
| **Revoke a device's sign-in** | Sign out of the SECTL account on the device, or on the SECTL website |
| **Hand the group to someone else** | The owner starts a **transfer**; it takes effect after both sides confirm |
| **Find out who did what** | Group page → **Audit log** (admin and above) |
| **Keep classrooms apart** | Use separate groups: groups cannot see each other |

## Misconceptions to avoid

- ❌ "The server is official, so it is trustworthy" — it is not open source and must be treated as **possibly compromised**; the real boundary is the local switch and group roles.
- ❌ "Clicking send means it ran" — wait for the **receipt**; a refusal comes with the reason.
- ❌ "Admin rights mean I can control devices" — roles decide *who may send*; the device can still refuse.
- ❌ "I can host my own server" — the protocol is public but the implementation is not, and **no self-hosting option is offered yet**.

## Reporting security issues

Report problems or questions via [SecRandom issues](https://github.com/SECTL/SecRandom/issues) or [SecRandom-Control-Console issues](https://github.com/SECTL/SecRandom-Control-Console/issues).
