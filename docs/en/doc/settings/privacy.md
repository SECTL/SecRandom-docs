---
title: Privacy Settings
createTime: 2026/08/14 10:00:00
---

# Privacy Settings (General)

::: tip Version Notice
This document corresponds to the **v3** "Settings → General → Privacy" page. v3 is in Alpha stage; settings may change with versions, please refer to the actual interface.
:::

> **Privacy under control** - Understand and manage the software's network reporting. All options are enabled by default and can be changed anytime.

## Sentry Telemetry

**Enable Sentry Telemetry**: When enabled, uploads crashes, logs, traces and performance analysis data to diagnose issues and improve stability

**Notes**:
- This option does **not** control online status statistics
- After disabling, subsequent telemetry network requests stop
- The privacy policy is presented in the setup flow on first launch

## Online Status Statistics

**Online Status**: Choose how to report online status

| Option | Description |
|--------|-------------|
| **Normal Reporting** | Participates in online user counting and includes approximate location derived from the public IP |
| **Anonymous Reporting** | Only counts online users; does not upload IP or region info |
| **Stop Reporting** | Does not participate in online status statistics |

**Notes**:
- The app only makes corresponding network requests when the option is enabled
- After disabling, subsequent requests stop

## Privacy Policy Highlights

- **Local Data**: Lists, prizes, history and settings are stored locally by default; make sure imported data sources are legal, accurate and authorized
- **Choice & Change**: The privacy options above are enabled by default and can be changed anytime on this page or in the setup flow
- **Network Requests**: The app only makes telemetry or online-status network requests when the corresponding option is enabled
- **Updates & Termination**: Material privacy policy changes raise the policy version and require re-confirmation

## Related Pages

- Privacy confirmation in the first-launch setup: see [Software Setup Guide](/en/doc/guide/software-guide)
- Security settings: see [Security Settings](/en/doc/settings/security)
