---
title: Security Settings
createTime: 2026/01/11 12:42:47
---

> **Protect your system security**
>
> Through flexible security configuration, protect your system from unauthorized access. All settings are saved in real-time and take effect automatically.

## Verification Method

**Security Switch**: After enabling, all security operations require password verification
- On: Selected security operations all require password verification
- Off: Entering settings and other security operations do not require password verification

**Set/Change Password**: Set or change security verification password
- Click button to enter password setting interface
- Recommended to use strong password containing letters, numbers, and special characters

**TOTP Verification**: After enabling, TOTP verification can be used in security operations
- On: Support using TOTP as verification method
- Off: Do not use TOTP verification function

**Set TOTP**: Configure TOTP dynamic password verification (i.e., 2FA verification)
- Click button to enter TOTP key setting interface

**USB Drive Verification**: After enabling, USB drive verification can be used in security operations
- On: Support using USB drive as verification method
- Off: Do not use USB drive verification function

**Bind USB Drive**: Bind the USB drive device used for verification
- Insert USB drive and click button to complete binding
- After binding, the USB drive can be used as verification credential

**Unbind USB Drive**: Unbind USB drive device
- Click button to unbind the bound USB drive
- After unbinding, the USB drive is no longer used as verification credential

## Security Verification Steps

**Security Verification Steps**: Select security verification combination method
- Single-step verification (choose any one method): Select one from available verification methods to complete verification
- Only password/Only TOTP/Only USB drive: Only need to perform the selected verification method to complete verification
- Multi-step verification (combination verification method): Need to complete multiple verification methods

## Security Operations

**Settings Preview Switch**: Allow previewing settings when entering settings verification
:::tip
To use preview function, must first enable `Security Switch` and `Open Settings Verification` security operations.
:::
- On: Can preview settings content before verification, can modify settings after verification
- Off: Do not enable preview function

**Show/Hide Floating Window Verification**: After enabling, security verification is required when showing or hiding floating window
- On: Show/hide floating window operations require verification
- Off: Show/hide floating window operations do not require verification

**Restart/Exit Verification**: After enabling, security verification is required when exiting software
- On: Restart/exit software requires security verification
- Off: Restart/exit software does not require verification

**Open Settings Verification**: After enabling, security verification is required when opening settings window
- On: Opening settings window requires security verification
- Off: Opening settings window does not require verification

:::tip
Security settings recommendations:
1. Enable security switch to enhance system security
2. Set strong password and change regularly
3. Enable USB drive/TOTP verification as double protection according to needs
4. Enable verification for important operations (such as exiting software, opening settings)
:::
