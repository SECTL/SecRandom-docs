# 下载与运行

<ArticleMetadata />

## 一、最低运行要求
在下载和运行SecRandom之前，请确保您的设备满足以下最低系统要求：

### 1.1 硬件要求
- <badge type="tip" text="处理器" /> 主频 1GHz 或更高
- <badge type="tip" text="内存" /> 至少 512 MB
- <badge type="info" text="存储" /> 至少 100MB 可用空间
- <badge type="warning" text="显示器" /> 最低分辨率 1024×768(px)

### 1.2 软件要求
- <badge type="tip" text="Windows 系统" /> Windows 7/8/10/11（32位或64位）
- <badge type="tip" text="Python 环境" />（源码运行）Python 3.8及以上版本，已安装 pip 包管理器

## 二、下载方式
SecRandom提供多种下载渠道，您可以根据需求选择最适合的方式：

### 2.1 官方GitHub仓库（推荐）
- 访问官方仓库：[SECTL/SecRandom](https://github.com/SECTL/SecRandom)
- 点击右上角的「Code」按钮，选择「Download ZIP」
- 或使用Git命令克隆仓库：`git clone https://github.com/SECTL/SecRandom.git`

### 2.2 发布页面下载
- 进入GitHub仓库的「Releases」页面
- 根据您的操作系统选择相应的发布版本
- 下载

## 三、文件验证
为确保下载文件的完整性和安全性，建议进行文件验证：

### 3.1 校验文件哈希值
1. 在发布页面找到对应版本的SHA256校验值
2. 在本地计算下载文件的哈希值：
3. 比较计算结果与发布页面提供的校验值是否一致

## 四、运行步骤
根据您下载的文件类型，选择以下相应的运行方式：

### 4.1 源码运行（适用于开发人员和高级用户）

1. 确保已安装Python 3.8+和Git
2. 打开命令提示符或PowerShell
3. 克隆仓库：`git clone https://github.com/SECTL/SecRandom.git`
4. 进入项目目录：`cd SecRandom`
5. 创建虚拟环境（可选但推荐）：
   ```
   python -m venv venv
   .\venv\Scripts\activate
   ```
6. 安装依赖：`pip install -r requirements.txt`
   > 若出现网络问题，可使用国内镜像：`pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`
7. 启动程序：`python main.py`

### 4.2 可执行文件运行（适用于普通用户）
1. 下载Windows版本的ZIP压缩包
2. 右键点击压缩包，选择「提取全部」，指定解压路径
3. 进入解压后的文件夹，找到`SecRandom.exe`文件
4. 双击运行程序（首次运行可能会有Windows Defender SmartScreen提示）：
   - 点击「更多信息」
   - 点击「仍要运行」
5. （可选）创建桌面快捷方式：右键`SecRandom.exe`，选择「发送到」→「桌面快捷方式」

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

如果您遇到任何未在此处列出的问题，请访问[问题反馈页面](https://github.com/SECTL/SecRandom/issues)提交详细描述。