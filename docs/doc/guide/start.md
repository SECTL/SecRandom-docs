---
title: 下载与运行
createTime: 2025/11/23 19:46:59
---

> 🚀 **快速上手** - 三步完成SecRandom的下载、验证与运行

---

## 📋 系统要求检查表

### ✅ 最低配置要求
| 类别 | 要求 | 推荐 |
|------|------|------|
| 💻 **处理器** | 主频 1GHz 或更高 | ✅ 64位 4核心及以上 |
| 🧠 **内存** | 至少 4 GB | ✅ 8GB+ |
| 💾 **存储** | 300MB 可用空间 | ✅ 推荐SSD |
| 🖥️ **显示器** | 1024×768 分辨率 | ✅ 推荐1080p |

### 🎯 软件环境
| 使用方式 | 系统要求 | Python版本 |
|----------|----------|------------|
| 🏃 **可执行文件** | Windows 7(旧版本)/10/11 & Linux | 无需安装 |
| 🛠️ **源码运行** | Windows 10/11 | Python 3.13 |

---

## 📥 下载方式

### 🏆 推荐方案

#### 🌟 **方案1：官网下载页面**
- ✅ **官方发布** - 经过完整测试的稳定版本
- ✅ **最新版本** - 提供最新正式版下载


**操作步骤：**
1. 访问 [下载页面](../../download.md)
2. 下载文件

#### 🎯 **方案2：GitHub Releases**
- ✅ **安全验证** - 提供SHA256校验值
- ⚠️ **访问提示** - 中国大陆网络环境速度较慢

**操作步骤：**
1. 访问 [GitHub Releases](https://github.com/SECTL/SecRandom/releases)
2. 选择最新版本（如 `v1.2.5.6`）
3. 下载文件

#### 📦 **方案3：第三方网盘分流**
[123云盘下载](https://www.123684.com/s/9529jv-U4Fxh)

---

## 🔐 文件完整性验证

### 🛡️ SHA256校验流程

#### 📊 **校验值示例（v1.1.3.0-beta）**
| 文件名 | SHA256校验值 |
|--------|--------------|
| SecRandom-Windows-v1.1.3.0-beta-x64-dir.zip | `6fc0c2a839c35d817fc54aabc71b84c9c1ca1af27c13a4dfc6fee1113899d999` |
| SecRandom-Windows-v1.1.3.0-beta-x64-onefile.zip | `a4d539e6fecb503b1b0918d534635ff5ebe8e3a78b9ee3c47f3d2dd65a5ff11d` |

#### 🔍 **Windows校验步骤**
1. **打开PowerShell**
2. **计算文件哈希值**：
   ```powershell
   Get-FileHash 文件名.zip -Algorithm SHA256
   ```
3. **对比结果**：与发布页面提供的校验值完全一致

---

## 🚀 运行指南

### 📋 **快速启动清单**
- 下载Windows版本ZIP包
- 解压到特定文件夹
- 运行 `SecRandom.exe` 运行
- 创建桌面快捷方式（可选）

### ⚡ **详细步骤**
1. **解压文件**
   - 右键ZIP包 → "全部解压缩" → 选择路径
   - 或使用7-Zip/WinRAR等解压缩软件解压

2. **首次运行**
   - 运行 `SecRandom.exe`
   - 如出现Windows Defender提示：
     - 点击"更多信息" → "仍要运行"

3. **创建快捷方式**
   - 右键 `SecRandom.exe` → "发送到" → "桌面快捷方式"

---

## 🆘 技术支持

### 📞 **问题反馈渠道**
- 🐛 [GitHub Issues](https://github.com/SECTL/SecRandom/issues)
- 💬 [QQ交流群](https://qm.qq.com/q/PCqYgev4Em)
- 📧 邮件反馈：查看项目README

### 📚 **相关文档**
- 📖 [快速入门指南](basic.md)
- ⚙️ [用户界面介绍](interface.md)
- 🔧 [软件设置教程](../settings/basic.md)

> 💡 **提示**：遇到问题先查看`常见问题`页面，80%的常见问题都有解决方案！
