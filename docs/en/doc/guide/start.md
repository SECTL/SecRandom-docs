---
title: Download & Run
createTime: 2025/11/23 19:46:59
---

> **Quick Start** - Complete SecRandom download, verification, and running in three steps

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
| Usage Method | System Requirements | Python Version |
|--------------|---------------------|----------------|
| **Executable** | Windows 10/11 & Linux | No installation required |
| **Source Code** | Windows 10/11 & Linux | Python 3.13 |

---

## ::lucide:download:: Download Methods

### Recommended Solutions

#### **Solution 1: Official Download Page**
- **Official Release** - Stable version after complete testing
- **Latest Version** - Provides the latest official version download

**Steps:**
1. Visit [Official Download Page](https://secrandom.netlify.app/download)
2. Select and download the version suitable for your system

#### **Solution 2: GitHub Releases**
- **Security Verification** - Provides SHA256 checksum values
- **Version Selection** - Supports official and test versions

**Steps:**
1. Visit [GitHub Releases](https://github.com/SECTL/SecRandom/releases)
2. Select the latest version (e.g., `v1.2.5.6`)
3. Download the file for your platform

#### **Solution 3: Third-party Cloud Mirror**
- **Domestic Acceleration** - Provides domestic download links
- **123 Cloud Disk Download**: [Click to Download](https://www.123684.com/s/9529jv-U4Fxh)

#### **Solution 4: GitHub Mirror Acceleration**
- **ghfast.top** - Fast mirror download
- **gh-proxy.com** - Backup mirror download

**Windows Download Links:**
- Installer: [ghfast.top](https://ghfast.top/https://github.com/SECTL/SecRandom/releases/latest/download/SecRandom-Windows-Setup-latest-x64.exe)
- Portable: [ghfast.top](https://ghfast.top/https://github.com/SECTL/SecRandom/releases/latest/download/SecRandom-Windows-Portable-latest-x64.zip)

**Linux Download Links:**
- Installation Package: [ghfast.top](https://ghfast.top/https://github.com/SECTL/SecRandom/releases/latest/download/SecRandom-linux-Setup-latest-amd64.deb)

---

## File Integrity Verification

### SHA256 Verification Process

#### **Getting Checksum Values**
Each version's release page provides SHA256 checksum values in the following format:

| Filename | SHA256 Checksum |
|----------|-----------------|
| SecRandom-Windows-Portable-v1.2.5.6-x64.zip | `Example checksum` |
| SecRandom-Windows-Setup-v1.2.5.6-x64.exe | `Example checksum` |
| SecRandom-linux-Setup-v1.2.5.6-amd64.deb | `Example checksum` |

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

---

## ::lucide:life-buoy:: Technical Support

### **Problem Feedback Channels**
- [GitHub Issues](https://github.com/SECTL/SecRandom/issues)
- [QQ Group](https://qm.qq.com/q/iWcfaPHn7W)
- [QQ Channel](https://pd.qq.com/s/4x5dafd34?b=9)
- [Discord Server](https://discord.gg/PmE7nPbha)
- Email feedback: lzy98276@sectl.com

> **Tip**: If you encounter problems, check the `FAQ` page first. 80% of common problems have solutions!
