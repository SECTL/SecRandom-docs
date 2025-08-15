# SecRandom 插件系统
<ArticleMetadata />

> 🚀 **SecRandom 插件系统** - 通过插件扩展实现无限可能的教育场景应用

## 🎯 核心特性

- 🔌 **即插即用** - 简单安装，立即扩展功能
- 🎯 **教育定制** - 专为教育场景优化的插件生态
- 👥 **社区共享** - 开放源代码，社区共同贡献

## 📖 快速导航

### 🔰 新用户入门
- [📥 获取插件](#获取插件) - 3种方式获取插件
- [⚙️ 插件管理](#插件管理) - 轻松配置和管理

### 🔧 开发者指南
- [🚀 开发环境](#开发环境准备) - 5分钟搭建开发环境
- [💻 插件开发](#插件开发基础) - 从零开始创建插件
- [📦 发布分享](#发布与分享) - 贡献到社区

## 🎯 使用插件

### 📥 获取插件

#### 🏛️ **官方插件仓库**
访问 [SecRandom 官方插件仓库](https://github.com/SECTL/SecRandom-plugins) 获取经过审核的高质量插件。

#### 👥 **社区贡献插件**
通过以下方式获取社区分享的插件：
- [GitHub Issues](https://github.com/SECTL/SecRandom/issues) - 提交插件需求
- QQ群 **833875216** - 加入社区获取最新插件

#### 📁 **手动安装插件**
1. 下载插件文件（`.zip` 或文件夹格式）
2. 解压插件文件（如果是 `.zip` 格式）
3. 放入 `app/plugins` 文件夹
4. 重启 SecRandom
5. 在设置中启用插件

### ⚙️ 插件管理

#### 🎛️ **管理界面**
**访问路径：** 设置 → 插件

**功能特性：**
- 📋 **插件列表** - 查看所有已安装插件
- 🔄 **启用/禁用** - 一键控制插件状态
- ⚙️ **参数配置** - 自定义插件行为
- 🗑️ **安全卸载** - 彻底移除插件

## 🚀 开发插件

### 🛠️ 开发环境准备

#### 💻 **系统要求**
| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 7/10/11 (64位推荐) |
| 开发工具 | VS Code / PyCharm / 任意编辑器 |
| 运行环境 | 已安装 SecRandom 软件 |

#### 📚 **开发资源**
- 📖 [官方示例代码](https://github.com/SECTL/SecRandom)
- 👥 [QQ群交流](https://qm.qq.com/cgi-bin/qm/qr?k=833875216)
- 🐛 [问题反馈](https://github.com/SECTL/SecRandom/issues)

### 📁 插件开发基础

#### 🏗️ **项目结构**
```
my-plugin/
├── 📄 plugin.json      # 插件清单文件
├── 🐍 main.py         # 插件主程序
├── ⚙️ config.json     # 配置文件（可选）
├── 🖼️ assets/         # 资源文件夹
└── 📖 README.md       # 使用说明文档
```

#### 📋 **配置文件 (plugin.json)**
```json
{
  "name": "智能班级管理器",
  "version": "v1.2.0",
  "description": "为 SecRandom 添加智能班级分组和成绩权重功能",
  "author": "教育技术团队",
  "url": "https://github.com/eduteam/class-manager-plugin",
  "entry_point": "main.py",
  "background_service": "service.py",
  "min_app_version": "v1.0.0.0",
  "dependencies": ["pandas", "openpyxl"],
  "enabled": true,
  "autostart": false
}
```

**关键字段说明：**
- `name` - 插件显示名称
- `url` - GitHub仓库链接（必选！用于插件对比）
- `dependencies` - 自动安装的依赖库

## 📚 实用插件示例

### 📤 **数据导出插件**
**难度：⭐**

**功能特性：**
- 📊 Excel格式导出
- 📈 图表生成
- 🔄 批量处理
- 📧 邮件发送

**导出功能：**
```python
def export_to_excel(self, records):
    """导出抽奖记录"""
    df = pd.DataFrame(records)
    df.to_excel(f'draw_records_{date.today()}.xlsx', index=False)
```

## 📦 发布与分享

### 🚀 **发布流程**

#### 📦 **打包插件**
1. **准备发布文件**
   - ✅ `plugin.json`
   - ✅ `main.py`
   - ✅ `service.py` (可选)
   - ✅ `README.md`
   - ✅ `icon.png` (可选)

2. **创建压缩包**
   ```bash
   # Windows
   zip -r my-plugin-v1.0.0.zip my-plugin/
   
   # 或使用 Windows 压缩工具
   右键 → 发送到 → 压缩文件夹
   ```

#### 🌐 **社区分享**

**GitHub 分享**
1. Fork [SecRandom-plugins](https://github.com/SECTL/SecRandom-plugins)
2. 创建插件目录
3. 提交 Pull Request 至 [SecRandom-market](https://github.com/SECTL/SecRandom-market)
4. 等待审核合并

**QQ群分享**
- **群号**：833875216
- **分享格式**：插件名 + 版本 + 简介

### 📋 **发布清单**
- [ ] ✅ 插件功能完整测试
- [ ] ✅ README.md 文档完整
- [ ] ✅ 配置文件格式正确
- [ ] ✅ 错误处理机制完善
- [ ] ✅ 开源协议声明

## 🎯 技术支持与资源

### 📚 **官方资源**
| 资源 | 链接 | 描述 |
|------|------|------|
| 🏠 项目主页 | [GitHub](https://github.com/SECTL/SecRandom) | 完整的项目文档和代码 |
| 🔌 开发示例 | [SecRandom-plugins](https://github.com/SECTL/SecRandom-plugins) | 插件开发完整示例 |
| 🛒 插件市场 | [SecRandom-market](https://github.com/SECTL/SecRandom-market) | 社区插件集合 |
| 🐛 问题反馈 | [GitHub Issues](https://github.com/SECTL/SecRandom/issues) | 提交bug和功能需求 |

### 👥 **社区支持**
- 💬 **QQ交流群**：833875216
- 📖 **技术文档**：完整的开发文档
- 🔄 **更新日志**：关注 GitHub Releases

---

> **📝 重要提醒**：SecRandom 基于 GNU GPLv3 协议开源，开发的插件建议同样使用开源协议，共同促进教育工具的开放发展。
>
> **💡 开发建议**：使用内置库避免依赖冲突，遵循 PEP 8 代码规范，为教育场景优化用户体验。

