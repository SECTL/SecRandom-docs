---
title: 下载与运行
createTime: 2025/11/23 19:46:59
---

> **快速上手** - 三步完成SecRandom的下载、验证与运行

---

## ::lucide:settings:: 系统要求检查表

### 最低配置要求
| 类别 | 要求 | 推荐 |
|------|------|------|
| **处理器** | 主频 1GHz 或更高 | 64位 4核心及以上 |
| **内存** | 至少 4 GB | 8GB+ |
| **存储** | 300MB 可用空间 | 推荐SSD |
| **显示器** | 1024×768 分辨率 | 推荐1080p |

### 软件环境
| 使用方式 | 系统要求 | Python版本 |
|----------|----------|------------|
| **可执行文件** | Windows 10/11 & Linux | 无需安装 |
| **源码运行** | Windows 10/11 & Linux | Python 3.13 |

---

## ::lucide:download:: 下载方式

### 推荐方案

#### **方案1：官网下载页面**
- **官方发布** - 经过完整测试的稳定版本
- **最新版本** - 提供最新正式版下载

**操作步骤：**
1. 访问 [官方下载页面](https://secrandom.netlify.app/download)
2. 选择适合您系统的版本下载

#### **方案2：GitHub Releases**
- **安全验证** - 提供SHA256校验值
- **版本选择** - 支持正式版和测试版

**操作步骤：**
1. 访问 [GitHub Releases](https://github.com/SECTL/SecRandom/releases)
2. 选择最新版本（如 `v1.2.5.6`）
3. 下载对应平台的文件

#### **方案3：第三方网盘分流**
- **国内加速** - 提供国内下载链接
- **123云盘下载**：[点击下载](https://www.123684.com/s/9529jv-U4Fxh)

#### **方案4：GitHub镜像加速**
- **ghfast.top** - 快速镜像下载
- **gh-proxy.com** - 备用镜像下载

---

## ::lucide:checksum:: 文件完整性验证

### SHA256校验流程

#### **校验值获取**
每个版本的发布页面都会提供 SHA256 校验值，格式如下：

| 文件名 | SHA256校验值 |
|--------|--------------|
| SecRandom-Windows-Portable-v1.2.5.6-x64.zip | `示例校验值` |
| SecRandom-Windows-Setup-v1.2.5.6-x64.exe | `示例校验值` |
| SecRandom-linux-Setup-v1.2.5.6-amd64.deb | `示例校验值` |

#### **Windows校验步骤**
1. **打开PowerShell**
2. **计算文件哈希值**：
   ```powershell
   Get-FileHash 文件名.zip -Algorithm SHA256
   ```
3. **对比结果**：与发布页面提供的校验值完全一致

#### **Linux校验步骤**
1. **打开终端**
2. **计算文件哈希值**：
   ```bash
   sha256sum 文件名.zip
   ```
3. **对比结果**：与发布页面提供的校验值完全一致

---

## ::lucide:rocket:: 运行指南

### Windows系统

#### **快速启动清单**
- 下载Windows版本ZIP包或EXE安装程序
- 解压ZIP包或运行安装程序
- 运行 `SecRandom.exe`
- 创建桌面快捷方式（可选）

#### **详细步骤**

**方式一：便携版运行**

1. **解压文件**
   - 右键ZIP包 → "全部解压缩" → 选择路径
   - 或使用7-Zip/WinRAR等解压缩软件解压

2. **首次运行**
   - 进入解压后的文件夹
   - 双击运行 `SecRandom.exe`
   - 如出现Windows Defender提示：
     - 点击"更多信息" → "仍要运行"

3. **创建快捷方式**
   - 右键 `SecRandom.exe` → "发送到" → "桌面快捷方式"

**方式二：安装程序运行**

1. **运行安装程序**
   - 双击 `SecRandom-Windows-Setup-xxx-x64.exe`
   - 按照安装向导完成安装

2. **启动程序**
   - 从开始菜单找到 SecRandom
   - 或双击桌面快捷方式

### Linux系统

#### **快速启动清单**
- 下载Linux版本DEB安装包
- 安装DEB包
- 从应用菜单启动SecRandom

#### **详细步骤**

1. **安装DEB包**
   ```bash
   sudo dpkg -i SecRandom-linux-Setup-xxx-amd64.deb
   sudo apt-get install -f  # 修复依赖问题（如有）
   ```

2. **启动程序**
   - 从应用菜单找到 SecRandom
   - 或在终端运行 `SecRandom`

---

## ::lucide:life-buoy:: 技术支持

### ::lucide:circle-help:: **问题反馈渠道**
- [GitHub Issues](https://github.com/SECTL/SecRandom/issues)
- [QQ交流群](https://qm.qq.com/q/iWcfaPHn7W)
- [QQ频道](https://pd.qq.com/s/4x5dafd34?b=9)
- 邮件反馈：lzy98276@sectl.com

> **提示**：遇到问题先查看`常见问题`页面，80%的常见问题都有解决方案！
