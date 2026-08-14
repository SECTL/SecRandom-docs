---
title: 'Program Cannot Start'
createTime: 2026/08/14 10:00:00
---
# ::lucide:circle-help:: Program Cannot Start

::: tip Version Notice
This document applies to **v3** (C#/.NET + Avalonia). v3 is in Alpha stage; if you encounter startup issues, try the solutions below first and report to the developer.
:::

## **Symptom 1**: Program cannot start after changing settings

**Solutions**:
- 1. Close the program (check system tray or Task Manager to make sure it fully exits)
- 2. Reset configuration: choose reset config in **safe mode / recovery page**, or delete the config directory (`data directory/config`)
- 3. Restart the program
- 4. Reconfigure in Settings
- 5. If you believe this is a bug, send the problematic config file to the developer for diagnosis.

::: tip v2 Users
The old (v2) config directory was `program directory/app/Settings`. v3 uses a new data directory structure (lists, history, proofs, config). Old v2 config is not auto-migrated; you need to reconfigure.
:::

## **Symptom 2**: Program stuck at "Register URL Protocol" then crashes (v1.3.x historical issue)

**Solutions**:
- 1. If this happens on first launch, try restarting the computer and check whether SecRandom auto-starts. If auto-start succeeds, the problem should not recur
- 2. If it does not auto-start (a DLL error window may pop up), try [downloading here](https://aka.ms/vc14/vc_redist.x64.exe) and installing the VC++ runtime
- 2. Restart the computer
- 3. Restart the program
- 4. If the problem persists, report to the developer

::: warning v3 Note
v3 is built on .NET 10 and no longer depends on the VC++ runtime; for URL protocol registration issues, check system permissions or antivirus interception.
:::

## **Symptom 3**: v3 prompts missing .NET runtime at startup

**Solutions**:
- v3 installer versions are usually **self-contained**; no extra runtime needed
- For source or slim portable builds, install the [.NET 10 runtime](https://dotnet.microsoft.com/download)
- Check system architecture (x64 / arm64) matches the package

## **Symptom 4**: v3 cannot start normally after a crash

**Solutions**:
- v3 has built-in **crash recovery**: on next launch a recovery page shows (with error info); choose auto-restart or view logs
- Choose the recovery method in **Settings → General → Basic → Crash Recovery**
- Check the crash cause via the **Log Viewer** or log directory, and report to the developer
