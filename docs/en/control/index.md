---
title: Control Overview
createTime: 2026/10/05 12:00:00
---

# Control Overview

> **Control** is the centralized management side of SecRandom: for deployments with many machines across many classrooms, one Web console lets you see device status, push draw policies and rosters, and run remote operations without walking to each machine.

::: tip Version notice
Control ships with **SecRandom v3** and is still being refined; the interface and wording may change between versions — please refer to the actual interface.
:::

## Three parts

| Part | Description |
|---|---|
| **Device (controlled side)** | The SecRandom **desktop client** installed on a classroom machine. It dials out, reports its own status, and **keeps a local switch** so it can always refuse remote control |
| **Web console** | The page you open in a browser: [secrandom-control.sectl.cn](https://secrandom-control.sectl.cn) |
| **Control service** | The officially hosted server that handles accounts, groups, command delivery and auditing |

Control **does not change** how SecRandom works on a single machine: you can use the app without ever joining a group. Control simply adds a layer that can be managed remotely — and can opt out at any time.

## What you can do

- **See**: whether each classroom machine is online, its device name, platform, version, last heartbeat and capability list
- **Organize**: split permissions by **group**, invite colleagues, assign roles
- **Act**: lock/unlock drawing, trigger a draw, announce a sentence, change device settings remotely, push rosters and prize pools
- **Audit**: a log of who did what, on which device, when, and with what result

## Account: sign in with your SECTL account

Control has **no separate account system**. Sign in with your **SECTL (思拓创联) account**; no registration needed, and the console never stores a token in your browser.

## One principle: the device has the final say

Every classroom machine keeps its own "allow remote control" switch. Once it is off, **nothing sent by the server will be executed** — a stolen account or a mistaken admin does not by itself mean a controlled classroom. See [Security & Privacy](/en/control/security).

## Get started

| Page | Content |
|---|---|
| [Getting Started](/en/control/start) | Connect your first classroom machine in ten minutes |
| [Using the Console](/en/control/console) | Groups, members, roles, invites, audit |
| [Capabilities & Limits](/en/control/capabilities) | What each operation requires, and when it is refused |
| [Device Settings](/en/control/device) | The **Control** page on the classroom machine |
| [Security & Privacy](/en/control/security) | Design premises, data boundaries, self-protection |
| [FAQ](/en/control/faq) | Cannot connect, missing device, no response |

## Open source and feedback

- **The server and Web console are not open source yet.** The public repository [SECTL/SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console) currently contains the license, the trust-boundary statement and onboarding notes; the console source and the protocol specification are planned to be published there later, conditions permitting.
- **The device-side implementation is public** with the client ([SECTL/SecRandom](https://github.com/SECTL/SecRandom), GPL-3.0).
- Only the **officially hosted** service is available; there is no self-hosting option yet.

::: warning Before you start
The server is hosted by the vendor and is not open source, so treat it as a component that **may be compromised**. The real security boundary is the device switch plus group roles — which is exactly why "the device can veto any remote operation" is listed as a core design premise.
:::
