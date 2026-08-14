---
title: Verifiable Drawing
createTime: 2026/08/14 10:00:00
---

# Verifiable Drawing

::: tip Version Notice
This document corresponds to the **v3** "Settings → General → Draw Verification" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Results you can re-check** - Every draw automatically saves a proof record file. You can optionally let the server witness the draw process and re-check draw results through official channels.

## Verifiable Drawing Modes

### Normal Mode (Offline Replayable)
- **Local Immediate Draw**: draws can still complete offline and save a local replayable proof
- **Background Replay Signing**: when online, the app only submits one replay signing request in the background to `fair.sectl.cn` for **newly completed** normal draws
- **Manual Re-upload**: historical proofs saved offline or failed to submit are not auto-re-uploaded; you can manually upload them to the verification website when online
- **Tamper-proof**: the verification signature binds to the proof content, detecting later file tampering

**Can prove**: submitted proof files can be replayed; post-signature file tampering can be detected

**Cannot prove**: that the local program, real list or random seed was not modified before the draw; nor can it rule out trial-and-error selection before the draw

### Formal Notarization Mode (Server Witness)
- **Server Lock-in**: first locks this draw's anonymous candidate pool, weights and rules to `fair.sectl.cn`
- **Server Computation**: the server generates random material, computes the final result and saves an immutable official proof
- **No Substitute Result**: if network fluctuation, disconnection, service unavailability, device failure or other force majeure prevents obtaining the server completion proof, this formal notarization **produces no local substitute result** and does not automatically switch to normal mode
- **Immutable Flow**: after the server confirms the lock-in, the candidate pool, weights, rules, random material and result cannot be replaced, re-drawn or recomputed during the flow; any new draw is only another independent notarization

**Can prove**: prevents local draw code, random seed and result files from being replaced in the locked flow

**Cannot prove**: that the real-world list itself is complete and authentic, or that the pool was not manually filtered before submission

## Switching Modes

Switching the verifiable drawing mode requires reading and confirming the mode explanation:
- Switching to Normal Mode: read the normal mode limitations and confirm
- Switching to Formal Notarization Mode: read the formal notarization mode explanation and confirm

::: warning Note
Formal notarization mode depends on network connectivity. If the network is unavailable, Normal Mode is recommended.
:::

## Draw Proof Files

### Proof Folder
**Description**: proofs are automatically saved as `.srproof.json` files by date

- Click **"Open Proof Folder"** to view local proof files
- Upload `.srproof.json` files to the **verification website** to re-check draw results

### Local Proof Storage Limit
**Description**: when new proofs are generated, if the limit is exceeded the oldest proof files are automatically deleted

Options: 16 MB / 32 MB / 64 MB (default) / 128 MB / 256 MB / 512 MB / 1 GB

### Local Proof Retention Period
**Description**: set the retention period for local proof files; proofs older than the period are cleaned up

::: tip
Proof files are the key to re-checking draw results. It is recommended to regularly upload important proofs to the verification website for safekeeping.
:::

## Verification Website

Official verification website: access via the **"Open Verification Website"** button in the software (fair.sectl.cn related entry).

## Verification Boundaries Summary

| Mode | Can do | Cannot prove |
|---|---|---|
| Offline proof | Re-check a completed draw | Not a pre-draw server witness; cannot prove the local program or real-world list was not tampered with |
| Online witness | Protect the draw flow after server lock-in | Cannot prove the list is authentic, complete, or not filtered before submission |

## Related Pages

- Verifiable drawing notice in the first-launch setup: see [Software Setup Guide](/en/doc/guide/software-guide)
- Security settings: see [Security Settings](/en/doc/settings/security)
- Draw records: see [History](/en/doc/settings/history)
