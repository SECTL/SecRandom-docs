---
title: URL协议
createTime: 2025/11/29 13:02:57
---
# SecRandom URL协议完整列表

> 🔗 **SecRandom URL协议参考**
> 
> 本页面提供了SecRandom软件支持的完整URL协议列表，通过这些URL可以快速访问软件的各个功能模块和执行特定操作。

## 基础界面URL

### 1. 主界面
<div class="config-card">

- **URL**: `secrandom://main`
- **功能**: 打开SecRandom主界面，自动显示并激活窗口

**使用场景**：
- 从外部应用快速启动SecRandom
- 桌面快捷方式直接访问主界面
- 其他程序调用SecRandom主功能

</div>

### 2. 设置界面
<div class="config-card">

- **URL**: `secrandom://settings`
- **功能**: 打开设置界面，让用户可以调整各种设置

**使用场景**：
- 快速访问设置选项
- 批量部署时预配置设置
- 外部工具调用设置界面

</div>

### 3. 抽人界面
<div class="config-card">

- **URL**: `secrandom://pumping`
- **功能**: 打开抽人界面，让用户可以开始随机选择

**使用场景**：
- 课堂快速开始抽人
- 会议随机选择发言人
- 活动随机选择参与者

</div>

### 4. 抽奖界面
<div class="config-card">

- **URL**: `secrandom://reward`
- **功能**: 打开抽奖界面，让用户可以开始抽奖活动

**使用场景**：
- 活动抽奖环节
- 年会抽奖活动
- 营销活动抽奖

</div>

### 5. 历史记录界面
<div class="config-card">

- **URL**: `secrandom://history`
- **功能**: 打开历史记录界面，让用户查看过往记录，自动加载数据

**使用场景**：
- 查看历史抽取记录
- 统计分析历史数据
- 导出历史记录

</div>

### 6. 浮窗界面
<div class="config-card">

- **URL**: `secrandom://floating`
- **功能**: 打开浮窗界面，切换悬浮窗口的显示状态

**使用场景**：
- 快速切换浮窗显示
- 多任务时保持浮窗可见
- 演示时使用浮窗模式

</div>

### 7. 关于界面
<div class="config-card">

- **URL**: `secrandom://about`
- **功能**: 打开关于界面，查看软件版本和作者信息

**使用场景**：
- 查看软件版本信息
- 获取技术支持信息
- 了解软件作者和贡献者

</div>

### 8. 闪抽界面
<div class="config-card">

- **URL**: `secrandom://direct_extraction`
- **功能**: 打开闪抽界面，快速进行抽取操作，并会在设定的时间后自动关闭。(关闭时间可在设置中进行调整)

**使用场景**：
- 需要快速完成单次抽取操作
- 课堂或会议中进行快速随机选择
- 活动中需要短时间内完成抽取并自动结束

</div>

## 带Action参数的URL

### 抽人相关操作
<div class="config-card highlight">

#### 开始抽人
- **URL**: `secrandom://pumping?action=start`
- **功能**: 自动切换到抽人界面并开始抽选操作

#### 停止抽人
- **URL**: `secrandom://pumping?action=stop`
- **功能**: 自动切换到抽人界面并停止当前的抽人操作

#### 重置抽人
- **URL**: `secrandom://pumping?action=reset`
- **功能**: 自动切换到抽人界面并清空当前的抽选结果

**使用示例**：
```batch
# 批处理文件示例
start secrandom://pumping?action=start
timeout /t 5
start secrandom://pumping?action=stop
```

</div>

### 抽奖相关操作
<div class="config-card warning">

#### 开始抽奖
- **URL**: `secrandom://reward?action=start`
- **功能**: 自动切换到抽奖界面并开始抽奖操作

#### 停止抽奖
- **URL**: `secrandom://reward?action=stop`
- **功能**: 自动切换到抽奖界面并停止当前的抽奖操作

#### 重置抽奖
- **URL**: `secrandom://reward?action=reset`
- **功能**: 自动切换到抽奖界面并清空当前的抽奖结果

**使用示例**：
```batch
# 自动化抽奖脚本
start secrandom://reward?action=start
timeout /t 10
start secrandom://reward?action=stop
```

</div>

### 关于界面相关操作
<div class="config-card theme">

#### 打开捐赠支持对话框
- **URL**: `secrandom://about?action=donation`
- **功能**: 自动切换到关于界面并打开捐赠支持对话框

#### 打开贡献者对话框
- **URL**: `secrandom://about?action=contributor`
- **功能**: 自动切换到关于界面并打开贡献者对话框

**使用场景**：
- 快速访问捐赠页面
- 查看项目贡献者信息
- 支持软件发展

</div>

### 插件设置相关操作
<div class="config-card">

#### 打开插件页面
- **URL**: `secrandom://plugin_settings?action=open`
- **功能**: 打开插件页面，让用户可以管理和配置插件

**使用场景**：
- 快速访问插件管理界面
- 批量配置插件设置
- 外部工具调用插件功能

</div>

### 闪抽相关操作
<div class="config-card highlight">

#### 使用闪抽
- **URL**: `secrandom://direct_extraction`
- **功能**: 自动切换到闪抽界面并开始抽取操作，当到达设定时间会自动关闭。

**使用示例**：
```batch
# 批处理文件示例
start secrandom://direct_extraction
```

</div>

## 💡 URL协议使用指南

<div class="tip-box">

### 🎯 推荐使用方式

**快捷方式创建**
1. 右键桌面 → 新建 → 快捷方式
2. 输入URL协议（如 `secrandom://main`）
3. 命名快捷方式并完成创建

**批处理脚本**
```batch
@echo off
echo 正在启动SecRandom抽人功能...
start secrandom://pumping?action=start
```

**第三方应用调用**
```python
# Python示例
import subprocess
subprocess.run(['start', 'secrandom://settings'])
```

### ⚠️ 注意事项

1. 🔐 **协议注册**：确保SecRandom已正确注册URL协议
2. 🛡️ **安全考虑**：只使用官方文档中列出的URL协议
3. 🔄 **参数验证**：使用action参数时确保参数值正确
4. 📝 **错误处理**：建议在使用URL协议时添加错误处理机制

### 🔧 故障排除

**URL协议无法打开**
- 检查SecRandom是否正确安装
- 重新安装软件以修复协议注册
- 检查系统安全软件是否阻止了协议调用  
- 如以上因素均排除，则向开发者反馈bug

**Action参数无效**
- 确认参数拼写正确
- 检查软件版本是否支持该action
- 查看软件日志获取详细错误信息

</div>

## 🤝 软件联动与集成

<div class="config-card highlight">

### 💻 编程语言集成示例

#### Python 集成
```python
import subprocess
import os

class SecRandomController:
    def __init__(self):
        self.base_url = "secrandom://"
    
    def open_main(self):
        """打开主界面"""
        os.system(f"start {self.base_url}main")
    
    def start_pumping(self):
        """开始抽人"""
        os.system(f"start {self.base_url}pumping?action=start")
    
    def stop_pumping(self):
        """停止抽人"""
        os.system(f"start {self.base_url}pumping?action=stop")
    
    def open_settings(self):
        """打开设置界面"""
        os.system(f"start {self.base_url}settings")

    def open_direct_extraction(self):
        """使用闪抽"""
        os.system(f"start {self.base_url}direct_extraction")

# 使用示例
controller = SecRandomController()
controller.open_main()
```

#### JavaScript/Node.js 集成
```javascript
const { exec } = require('child_process');

class SecRandomController {
    constructor() {
        this.baseUrl = "secrandom://";
    }
    
    async openMain() {
        return new Promise((resolve, reject) => {
            exec(`start ${this.baseUrl}main`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
    
    async startPumping() {
        return new Promise((resolve, reject) => {
            exec(`start ${this.baseUrl}pumping?action=start`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
    
    async stopPumping() {
        return new Promise((resolve, reject) => {
            exec(`start ${this.baseUrl}pumping?action=stop`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }

    async openDirectExtraction() {
        // 使用闪抽
        return new Promise((resolve, reject) => {
            exec(`start ${this.baseUrl}direct_extraction`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
}

// 使用示例
const controller = new SecRandomController();
controller.openMain().catch(console.error);
```

#### C# 集成
```csharp
using System;
using System.Diagnostics;

class SecRandomController
{
    private const string BaseUrl = "secrandom://";
    
    public void OpenMain()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = BaseUrl + "main",
            UseShellExecute = true
        });
    }
    
    public void StartPumping()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = BaseUrl + "pumping?action=start",
            UseShellExecute = true
        });
    }
    
    public void StopPumping()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = BaseUrl + "pumping?action=stop",
            UseShellExecute = true
        });
    }
    
    public void OpenSettings()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = BaseUrl + "settings",
            UseShellExecute = true
        });
    }

    public void OpenDirectExtraction()
    {
        // 使用闪抽
        Process.Start(new ProcessStartInfo
        {
            FileName = BaseUrl + "direct_extraction",
            UseShellExecute = true
        });
    }
}

// 使用示例
var controller = new SecRandomController();
controller.OpenMain();
```

#### Java 集成
```java
import java.awt.Desktop;
import java.net.URI;

class SecRandomController {
    private static final String BASE_URL = "secrandom://";
    
    public void openMain() {
        try {
            Desktop.getDesktop().browse(new URI(BASE_URL + "main"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void startPumping() {
        try {
            Desktop.getDesktop().browse(new URI(BASE_URL + "pumping?action=start"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void stopPumping() {
        try {
            Desktop.getDesktop().browse(new URI(BASE_URL + "pumping?action=stop"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void openSettings() {
        try {
            Desktop.getDesktop().browse(new URI(BASE_URL + "settings"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void openDirectExtraction() {
        // 使用闪抽
        try {
            Desktop.getDesktop().browse(new URI(BASE_URL + "direct_extraction"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// 使用示例
SecRandomController controller = new SecRandomController();
controller.openMain();
```

</div>

### 🎯 实际应用场景

<div class="config-card theme">

#### 教育软件集成
**课堂管理系统 + SecRandom**
```python
# 课堂管理系统中的集成示例
import time
from secrandom_controller import SecRandomController

class ClassroomManager:
    def __init__(self):
        self.secrandom = SecRandomController()
    
    def start_random_selection(self):
        """开始随机选择学生"""
        print("开始随机选择学生...")
        self.secrandom.start_pumping()
        time.sleep(5)  # 运行5秒
        self.secrandom.stop_pumping()
        print("选择完成！")
    
    def open_class_settings(self):
        """打开班级设置"""
        self.secrandom.open_settings()
```

#### 会议软件集成
**会议系统 + SecRandom**
```javascript
// 会议系统中的集成示例
const MeetingSystem = {
    async selectSpeaker() {
        console.log("正在随机选择发言人...");
        await controller.startPumping();
        
        // 10秒后自动停止
        setTimeout(async () => {
            await controller.stopPumping();
            console.log("发言人选择完成！");
        }, 10000);
    },
    
    async openRewardSystem() {
        await controller.openMain();
    }
};
```

#### 办公软件集成
**Office 插件 + SecRandom**
```vba
' Excel VBA 集成示例
Sub StartRandomSelection()
    Dim shell As Object
    Set shell = CreateObject("WScript.Shell")
    
    ' 开始抽人
    shell.Run "secrandom://pumping?action=start"
    
    ' 等待5秒后停止
    Application.Wait Now + TimeValue("0:00:05")
    shell.Run "secrandom://pumping?action=stop"
    
    MsgBox "随机选择完成！", vbInformation
End Sub
```

</div>

### 🔧 高级集成技巧

<div class="config-card warning">

#### 批处理自动化
```batch
@echo off
:: 自动化演示脚本
echo SecRandom 自动化演示
echo ========================

echo 1. 打开主界面
start secrandom://main
timeout /t 2 >nul

echo 2. 切换到抽人界面
start secrandom://pumping
timeout /t 2 >nul

echo 3. 开始抽人
start secrandom://pumping?action=start
timeout /t 5 >nul

echo 4. 停止抽人
start secrandom://pumping?action=stop
timeout /t 2 >nul

echo 5. 打开设置界面
start secrandom://settings
timeout /t 2 >nul

echo 6. 使用闪抽
start secrandom://direct_extraction
timeout /t 2 >nul

echo 演示完成！
pause
```

#### PowerShell 脚本
```powershell
# PowerShell 集成示例
function Invoke-SecRandom {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Action,
        
        [string]$Parameters = ""
    )
    
    $url = "secrandom://$Action"
    if ($Parameters) {
        $url += "?$Parameters"
    }
    
    Start-Process $url
}

# 使用示例
Invoke-SecRandom -Action "main"
Invoke-SecRandom -Action "pumping" -Parameters "action=start"
Invoke-SecRandom -Action "settings"
Invoke-SecRandom -Action "direct_extraction"
```

#### Web 应用集成
```html
<!-- Web 页面中的集成示例 -->
<button onclick="openSecRandom('main')">打开SecRandom</button>
<button onclick="startPumping()">开始抽人</button>
<button onclick="stopPumping()">停止抽人</button>
<button onclick="openDirectExtraction()">使用闪抽</button>

<script>
function openSecRandom(action, params = '') {
    const url = `secrandom://${action}${params ? '?' + params : ''}`;
    window.location.href = url;
}

function startPumping() {
    openSecRandom('pumping', 'action=start');
}

function stopPumping() {
    openSecRandom('pumping', 'action=stop');
}

function openDirectExtraction() {
    // 使用闪抽
    openSecRandom('direct_extraction');
}
</script>
```

</div>

<style>
.config-card {
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.config-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px var(--vp-c-shadow-1);
}

.highlight {
  background: var(--vp-c-blue-soft);
  border-left: 4px solid var(--vp-c-blue-1);
}

.warning {
  background: var(--vp-c-yellow-soft);
  border-left: 4px solid var(--vp-c-yellow-1);
}

.theme {
  background: var(--vp-c-purple-soft);
  border-left: 4px solid var(--vp-c-purple-1);
}

.tip-box {
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin: 2rem 0;
  background: var(--vp-c-tip-soft);
  border-left: 4px solid var(--vp-c-tip-1);
}
</style>