---
title: Download & Run
createTime: 2026/08/14 10:00:00
---

> **Quick Start** - Complete SecRandom download, verification, and running in three steps

::: danger Alpha Version Warning
The **v3 version is currently in Alpha stage** and should not be used in production. It may contain unknown bugs and is intended for user experience only.
:::

---

## ::lucide:list:: System Requirements Checklist

### ::lucide:clipboard-check:: Minimum Requirements
| Category | Requirements | Recommended |
|----------|--------------|-------------|
| **Processor** | 1GHz or higher | 64-bit 4 cores or more |
| **Memory** | At least 4 GB | 8GB+ |
| **Storage** | 300MB available space | Recommended SSD |
| **Display** | 1024×768 resolution | Recommended 1080p |

### Software Environment
| Usage Method | System Requirements | Runtime |
|--------------|---------------------|---------|
| **Executable** | Windows 10/11, Linux, macOS | No installation required |
| **Source Code** | Windows 10/11, Linux, macOS | .NET 10 SDK |

::: tip Cross-Platform
Starting from v3, SecRandom is rebuilt with **C#/.NET + Avalonia**, officially supporting **Windows, Linux, macOS, and mobile platforms (Android/iOS)**.
:::

::: warning Windows Version Notice
SecRandom has stopped support for Windows 7 and 32-bit systems. We strongly recommend using Windows 10 or higher.
:::

---

## ::lucide:download:: Download Methods

### Recommended Solutions

#### **Solution 1: Official Download Page**
- **Official Release** - Stable version after complete testing
- **Latest Version** - Provides the latest official version download

**Steps:**
1. Visit [Official Download Page](https://secrandom.sectl.cn/download)
2. Select and download the version suitable for your system

#### **Solution 2: GitHub Releases**
- **Security Verification** - Provides SHA256 checksum values
- **Version Selection** - Supports official and preview versions

**Steps:**
1. Visit [GitHub Releases](https://github.com/SECTL/SecRandom/releases)
2. Select the latest version (e.g., `v3.0.0-alpha.2`)
3. Download the file for your platform

---

## File Integrity Verification

### SHA256 Verification Process

#### **Getting Checksum Values**
Each version's release page provides SHA256 checksum values in the following format:

| Filename | SHA256 Checksum |
|----------|-----------------|
| SecRandom-Windows-Portable-v3.0.0-alpha.2-x64.zip | `Example checksum` |
| SecRandom-Windows-Setup-v3.0.0-alpha.2-x64.exe | `Example checksum` |
| SecRandom-linux-Setup-v3.0.0-alpha.2-amd64.deb | `Example checksum` |

#### **Windows Verification Steps**
1. **Open PowerShell**
2. **Calculate file hash**:
   ```powershell
   Get-FileHash filename.zip -Algorithm SHA256
   ```
3. **Compare results**: Should match exactly with the checksum provided on the release page

#### **Linux Verification Steps**
1. **Open terminal**
2. **Calculate file hash**:
   ```bash
   sha256sum filename.zip
   ```
3. **Compare results**: Should match exactly with the checksum provided on the release page

---

## Running Guide

### Windows System

#### **Quick Start Checklist**
- Download Windows version ZIP package or EXE installer
- Extract ZIP package or run installer
- Run `SecRandom.exe`
- Create desktop shortcut (optional)

#### **Detailed Steps**

**Method 1: Portable Version**

1. **Extract files**
   - Right-click ZIP package → "Extract All" → Select path
   - Or use 7-Zip/WinRAR or other extraction software

2. **First run**
   - Navigate to the extracted folder
   - Double-click to run `SecRandom.exe`
   - If Windows Defender prompt appears:
     - Click "More info" → "Run anyway"

3. **Create shortcut**
   - Right-click `SecRandom.exe` → "Send to" → "Desktop (create shortcut)"

**Method 2: Installer Version**

1. **Run installer**
   - Double-click `SecRandom-Windows-Setup-xxx-x64.exe`
   - Follow the installation wizard to complete installation

2. **Launch program**
   - Find SecRandom in Start menu
   - Or double-click desktop shortcut

### Linux System

#### **Quick Start Checklist**
- Download Linux version DEB installation package
- Install DEB package
- Launch SecRandom from application menu

#### **Detailed Steps**

1. **Install DEB package**
   ```bash
   sudo dpkg -i SecRandom-linux-Setup-xxx-amd64.deb
   sudo apt-get install -f  # Fix dependency issues (if any)
   ```

2. **Launch program**
   - Find SecRandom in application menu
   - Or run `SecRandom` in terminal

### macOS System

1. Download the macOS package for your architecture (Apple Silicon / Intel)
2. Open the downloaded `.dmg` or `.zip` and drag SecRandom to Applications
3. If "unidentified developer" prompt appears: right-click → **Open** → **Open** again to allow first launch

---

## First Launch Guide

The first launch will run an **8-step setup wizard** (OOBE):
1. **Welcome** - Welcome and feature introduction
2. **Verifiable Drawing Notice** - Understand the draw verification capabilities
3. **Privacy Policy** - Confirm privacy policy
4. **GPLv3 License** - Confirm open source license
5. **Basic Settings** - Configure basic behavior
6. **List Management** - Create your first member list
7. **Enhanced Features** - Optional features (e.g., linkage, verification)
8. **Complete** - Finish and enter the main interface

See [Software Guide](/en/doc/guide/software-guide) for details.

---

## ::lucide:life-buoy:: Technical Support

### **Problem Feedback Channels**
- ::simple-icons:github:: [GitHub Issues](https://github.com/SECTL/SecRandom/issues)
- ::simple-icons:qq:: **QQ Group**：[833875216](https://qm.qq.com/q/PCqYgev4Em)
- ::simple-line-icons:envolope:: **Mail Feedback**：[lzy98276@sectl.com](mailto:lzy98276@sectl.com)

> **Tip**: If you encounter problems, check the `FAQ` page first. 80% of common problems have solutions!
