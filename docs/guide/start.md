# 下载与运行

<ArticleMetadata />

<<<<<<< Updated upstream
## 一、系统要求与兼容性
在下载和运行SecRandom之前，请确保您的设备满足以下最低系统要求：

### 最低硬件要求
- <badge type="tip" text="处理器" /> 主频 1GHz 双核处理器
- <badge type="tip" text="内存" /> 2 GB
- <badge type="info" text="存储" /> 300MB 可用空间
- <badge type="warning" text="显示器" /> 1024×768(px)
- <badge type="tip" text="操作系统" />Windows 7

### 推荐系统配置
- **操作系统**：Windows 10/11 64位
- **处理器**：2.5GHz四核处理器或更高
- **内存**：4GB 或更高
- **硬盘空间**：500MB可用空间（含缓存和备份）
- **显示器**：1366×768(px)或更高  
- **其他**：互联网连接（仅用于更新服务和插件安装）

### 软件要求
以源码形式运行时，则还需满足以下要求：
- <badge type="tip" text="Python 环境" />Python 3.8.10及以上版本，已安装 pip 包管理器

### 10.1.3 操作系统兼容性
- **Windows**：支持Windows 7/10/11 的 32/64位版本
>**注意**  
32位操作系统不支持语音播报功能
- **macOS和Linux**：不支持
=======
## 一、最低运行要求
> [!TIP]
> 在下载和运行SecRandom之前，请确保您的设备满足以下最低系统要求：

### 1.1 硬件要求
- <badge type="tip" text="处理器" /> 主频 1GHz 或更高
- <badge type="tip" text="内存" /> 至少 4 GB
- <badge type="tip" text="存储" /> 至少 200MB 可用空间
- <badge type="tip" text="显示器" /> 最低分辨率 1024×768(px)

### 1.2 软件要求
- <badge type="tip" text="Windows 系统" /> Windows 7/10/11（32位或64位）
- <badge type="tip" text="Python 环境（以源码运行时）" />Python 3.8.10及以上版本，已安装 pip 包管理器
>>>>>>> Stashed changes

## 二、下载方式
SecRandom提供多种下载渠道，您可以根据需求选择最适合的版本和下载方式：

> ### 如何选择应该下载的文件：
> #### 第一步：选择系统架构  
> - **x64**：适用于64位Windows系统（推荐）  
> - **x86**：适用于32位Windows系统  
>
> #### 第二步：选择打包模式  
> - **目录模式**（文件名包含 `dir`）：  
>   - 体积相对较大  
>   - 支持重启功能  
>   - 适合需要频繁重启或对启动速度有要求的用户  
>
> - **单文件模式**（文件名包含 `onefile`）：  
>   - 体积较小  
>   - 不支持重启功能  
>   - 只有一个可执行文件，便于携带  
>   - 适合对文件大小敏感，不需要重启功能，希望进行简易更新（即使用新版资源直接覆盖原有资源以更新程序）~~或电脑配置较高~~的用户

### 2.1 Github 发布页面下载（推荐）
- 进入GitHub仓库的[「Releases」](https://github.com/SECTL/SecRandom/releases)页面
- 根据您的操作系统选择相应的发布版本
- 下载

<<<<<<< Updated upstream
### 2.2 官方GitHub仓库（源码下载）
- 访问官方仓库：[SECTL/SecRandom](https://github.com/SECTL/SecRandom)
=======
### 2.1 官方GitHub仓库（源码下载）
- 访问[官方仓库](https://github.com/SECTL/SecRandom)
>>>>>>> Stashed changes
- 点击右上角的「Code」按钮，选择「Download ZIP」
- 或使用Git命令克隆仓库：
```bash
git clone https://github.com/SECTL/SecRandom.git
```

### 2.3 第三方分流下载
::: info 官方分流
- 123云盘：[点我跳转](https://www.123684.com/s/9529jv-U4Fxh)
:::

### 第三步：下载对应文件
根据你的系统状况和网络环境选择，下载对应的 `.zip` 或 `.exe` 文件即可

## 三、文件验证
为确保下载文件的完整性和安全性，建议进行文件验证：

### 3.1 校验文件哈希值
1. 在[发布页面](https://github.com/SECTL/SecRandom/releases)找到对应版本的SHA256校验值
   ::: details 例如： v1.1.3.0-beta的校验值为
   |文件名|SHA256|
   |:----|:----|
   |SecRandom-Windows-v1.1.3.0-beta-x64-dir.zip|6fc0c2a839c35d817fc54aabc71b84c9c1ca1af27c13a4dfc6fee1113899d999|
   |SecRandom-Windows-v1.1.3.0-beta-x64-onefile.zip|a4d539e6fecb503b1b0918d534635ff5ebe8e3a78b9ee3c47f3d2dd65a5ff11d|
   |SecRandom-Windows-v1.1.3.0-beta-x86-dir.zip|	a3bcceb6a427d3a3a22fc9fd1a973dcb3da7b0df763411c10b5940133630360a|
   |SecRandom-Windows-v1.1.3.0-beta-x86-onefile.zip|48ba45f06660e55e9f356f35455e16b196508b2eae1f6a577a0a984379d43dea|
   :::
2. 在本地计算下载文件的哈希值：
3. 比较计算结果与发布页面提供的校验值是否一致

## 四、运行步骤
根据您下载的文件类型，选择以下相应的运行方式：

### 4.1 可执行文件运行（适用于普通用户）
1. 下载Windows版本的ZIP压缩包
2. 右键点击压缩包，选择「提取全部」，指定解压路径
3. 进入解压后的文件夹，找到`SecRandom.exe`文件
4. 双击运行程序（首次运行可能会有Windows Defender SmartScreen提示）：
   - 点击「更多信息」
   - 点击「仍要运行」
5. （可选）创建桌面快捷方式：右键`SecRandom.exe`，选择「发送到」→「桌面快捷方式」
<<<<<<< Updated upstream
=======

### 4.2 源码运行（适用于开发人员和高级用户）
>>>>>>> Stashed changes

### 4.2 源码运行（适用于开发人员和高级用户）

1. 确保已安装Python 3.8.10+（建议安装3.13+）和Git
2. 打开命令提示符或PowerShell
3. 克隆仓库：`git clone https://github.com/SECTL/SecRandom.git`
4. 进入项目目录：`cd SecRandom`
5. 创建虚拟环境（可选但推荐）：
   ```
   python -m venv venv
   .\venv\Scripts\activate
   ```
6. 安装依赖：`pip install -r requirements.txt`
   ::: details 若出现网络问题，可设置使用国内镜像：
   ```bash
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
   ```
7. 启动程序：`python main.py`

## 六、常见运行问题解决

### 6.1 Python环境相关问题
#### 问题：`python`命令未找到
**解决方法**：
- 确认已安装Python并添加到系统PATH
- 尝试使用`py`命令代替`python`
- 可尝试使用`python3`命令

#### 问题：依赖安装失败（如`No module named xxx`）
**解决方法**：
- 更新pip：`pip install --upgrade pip`
- 安装缺失的依赖：`pip install 缺失的模块名`
- 对于系统特定依赖，参考项目README中的系统依赖说明

### 6.2 图形界面相关问题
#### 问题：程序启动后无窗口显示
**解决方法**：
- 检查屏幕分辨率是否满足最低要求
- 尝试删除配置文件重置设置

#### 问题：界面显示异常或乱码
**解决方法**：
- 更新显卡驱动
- 调整系统显示缩放比例为100%
- 删除字体缓存

## 2.7 运行后验证
成功启动SecRandom后，请确认以下几点以确保程序正常运行：

1. **主界面完整性**：检查是否显示所有功能按钮（抽人、抽奖、设置等）
2. **资源加载**：确认界面图标、背景等资源显示正常
3. **基本功能测试**：点击各按钮，确认能正常切换界面
4. **版本信息**：进入「关于」页面，确认版本号与下载版本一致

如果您遇到任何未在此处列出的问题，请访问[问题反馈页面](https://github.com/SECTL/SecRandom/issues)提交issue，我们会尽快处理。