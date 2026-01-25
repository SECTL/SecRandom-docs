---
title: 'Program Cannot Start'
createTime: 2025/12/13 10:56:49
---
# ❓ Program Cannot Start

## **Symptom 1**: Program cannot start after modifying settings

**Solution**:
- 1. Close the program (check system tray or task manager to ensure complete exit)
- 2. Delete all configuration files: `Program Directory/app/Settings` folder
- 3. Restart the program
- 4. Reconfigure in tray icon → settings
- 5. If you are sure this is a bug, you can report the problematic configuration file to developers to help locate the issue.

## **Symptom 2**: Program crashes after getting stuck on "Registering URL Protocol" (especially in version 1.3.x.x)

**Solution**:
- 1. If you encounter this problem on first startup, try restarting your computer first to see if SecRandom starts automatically. If auto-startup succeeds, this problem will not occur in the future.
- 2. If it does not start automatically (a DLL error window may pop up), try [clicking here](https://aka.ms/vc14/vc_redist.x64.exe) to download and install the VC runtime library
- 2. Restart your computer
- 3. Restart the program
- 4. If the problem persists, please report it to developers
