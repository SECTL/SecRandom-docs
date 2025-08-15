# 下载与运行

<ArticleMetadata />

> 🚀 **快速上手** - 三步完成SecRandom的下载、验证与运行

---

## 📋 系统要求检查表

### ✅ 最低配置要求
| 类别 | 要求 | 状态 |
|------|------|------|
| 💻 **处理器** | 主频 1GHz 或更高 | ✅ 推荐64位 |
| 🧠 **内存** | 至少 4 GB | ✅ 推荐8GB+ |
| 💾 **存储** | 200MB 可用空间 | ✅ 推荐SSD |
| 🖥️ **显示器** | 1024×768 分辨率 | ✅ 推荐1080p |

### 🎯 软件环境
| 使用方式 | 系统要求 | Python版本 |
|----------|----------|------------|
| 🏃 **可执行文件** | Windows 7/10/11 | 无需安装 |
| 🛠️ **源码运行** | Windows 7/10/11 | Python 3.8.10+ |

---

## 📥 下载方式对比

### 🏆 推荐方案

#### 🎯 **方案1：GitHub Releases（推荐）**
- ✅ **官方发布** - 经过完整测试的稳定版本
- ✅ **自动更新** - 内置版本检测功能
- ✅ **安全验证** - 提供SHA256校验值
- ✅ **多版本** - 支持x86/x64架构

**操作步骤：**
1. 访问 [GitHub Releases](https://github.com/SECTL/SecRandom/releases)
2. 选择最新版本（如 `v1.1.3.0-beta`）
3. 下载对应架构的文件：
   - `x64` - 64位系统推荐
   - `x86` - 32位系统专用

#### 🌟 **方案2：GitHub仓库（源码）**
- ✅ **最新代码** - 获取最新功能和修复
- ✅ **开发友好** - 支持二次开发
- ✅ **透明开源** - 完整源代码可见

**获取方式：**
```bash
# 方式1：直接下载ZIP
访问 [官方仓库](https://github.com/SECTL/SecRandom) → Code → Download ZIP

# 方式2：使用Git克隆
git clone https://github.com/SECTL/SecRandom.git
```

#### 📦 **方案3：第三方分流**
- ⚡ **高速下载** - 国内镜像加速
- 🎯 **官方认证** - 123云盘官方分流

**访问链接：** [123云盘下载](https://www.123684.com/s/9529jv-U4Fxh)

---

## 🔐 文件安全验证

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

### 🎯 **普通用户 - 可执行文件运行**

#### 📋 **快速启动清单**
- [ ] 下载Windows版本ZIP包
- [ ] 解压到指定文件夹
- [ ] 双击 `SecRandom.exe` 运行
- [ ] 创建桌面快捷方式（可选）

#### ⚡ **详细步骤**
1. **解压文件**
   - 右键ZIP包 → "提取全部" → 选择路径
   - 或使用7-Zip/WinRAR解压

2. **首次运行**
   - 双击 `SecRandom.exe`
   - 如出现Windows Defender提示：
     - 点击"更多信息" → "仍要运行"

3. **创建快捷方式**
   - 右键 `SecRandom.exe` → "发送到" → "桌面快捷方式"

### 🛠️ **开发者 - 源码运行**

#### 📋 **环境准备**
```bash
# 1. 安装Python 3.8.10+
# 2. 安装Git
# 3. 克隆项目
git clone https://github.com/SECTL/SecRandom.git
cd SecRandom

# 4. 创建虚拟环境（推荐）
python -m venv venv
.\venv\Scripts\activate  # Windows

# 5. 安装依赖
pip install -r requirements.txt

# 6. 启动程序
python main.py
```

#### 🌐 **国内镜像加速**
```bash
# 使用清华镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

---

## 🔧 常见问题速查表

### ❗ Python环境问题
| 问题现象 | 解决方案 |
|----------|----------|
| `python`命令未找到 | 使用 `py` 或 `python3` 命令 |
| 模块导入失败 | 更新pip: `pip install --upgrade pip` |
| 依赖安装超时 | 使用国内镜像源 |

### 🖥️ 界面显示问题
| 问题现象 | 解决方案 |
|----------|----------|
| 启动无窗口 | 检查分辨率 ≥1024×768 |
| 界面乱码 | 更新显卡驱动，缩放100% |
| 图标缺失 | 删除配置文件重置 |

---

## ✅ 运行验证清单

启动成功后，请确认以下功能正常：

- [ ] **主界面完整** - 抽人、抽奖、设置按钮齐全
- [ ] **资源加载** - 图标、背景显示正常
- [ ] **功能切换** - 各页面可正常跳转
- [ ] **版本确认** - 关于页面显示正确版本号

---

## 🆘 技术支持

### 📞 **问题反馈渠道**
- 🐛 [GitHub Issues](https://github.com/SECTL/SecRandom/issues)
- 💬 QQ交流群：833875216
- 📧 邮件反馈：查看项目README

### 📚 **相关文档**
- 📖 [快速入门指南](basic.md)
- ⚙️ [基础设置教程](interface.md)
- 🔧 [高级功能配置](../settings/advanced.md)

> 💡 **提示**：遇到问题先查看[故障排除](../trouble.md)页面，80%的常见问题都有解决方案！
