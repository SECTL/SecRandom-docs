---
title: IPC & URL 协议
createTime: 2025/11/29 13:02:57
---
# SecRandom IPC & URL 协议完整列表

> **SecRandom IPC & URL 协议参考**
> 
> 本页面提供了SecRandom软件支持的完整IPC和URL协议列表，通过这些协议可以快速访问软件的各个功能模块和执行特定操作。

## 协议概述

SecRandom 支持两种协议方式：
- **URL 协议**：通过 `secrandom://` 协议调用，适用于外部应用和浏览器
- **IPC 协议**：进程间通信，适用于编程集成和自动化脚本

## 主界面页面命令

### 点名界面
<div class="config-card highlight">

- **URL**: `secrandom://main/roll`
- **IPC**: `main/roll`
- **功能**: 打开点名界面

</div>

### 抽奖界面
<div class="config-card highlight">

- **URL**: `secrandom://main/lottery`
- **IPC**: `main/lottery`
- **功能**: 打开抽奖界面

</div>

### 主界面
<div class="config-card highlight">

- **URL**: `secrandom://main`
- **IPC**: `main`
- **功能**: 打开主界面

</div>

## 设置页面命令

### 基础设置
<div class="config-card">

- **URL**: `secrandom://settings/basic`
- **IPC**: `settings/basic`
- **功能**: 打开基础设置界面

</div>

### 名单设置
<div class="config-card">

- **URL**: `secrandom://settings/list`
- **IPC**: `settings/list`
- **功能**: 打开名单管理设置界面

</div>

### 抽取设置
<div class="config-card">

- **URL**: `secrandom://settings/extraction`
- **IPC**: `settings/extraction`
- **功能**: 打开抽取相关设置界面

</div>

### 浮窗设置
<div class="config-card">

- **URL**: `secrandom://settings/floating`
- **IPC**: `settings/floating`
- **功能**: 打开浮窗设置界面

</div>

### 通知设置
<div class="config-card">

- **URL**: `secrandom://settings/notification`
- **IPC**: `settings/notification`
- **功能**: 打开通知设置界面

</div>

### 安全设置
<div class="config-card">

- **URL**: `secrandom://settings/safety`
- **IPC**: `settings/safety`
- **功能**: 打开安全设置界面

</div>

### 自定义设置
<div class="config-card">

- **URL**: `secrandom://settings/custom`
- **IPC**: `settings/custom`
- **功能**: 打开自定义设置界面

</div>

### 语音设置
<div class="config-card">

- **URL**: `secrandom://settings/voice`
- **IPC**: `settings/voice`
- **功能**: 打开语音设置界面

</div>

### 历史记录设置
<div class="config-card">

- **URL**: `secrandom://settings/history`
- **IPC**: `settings/history`
- **功能**: 打开历史记录设置界面

</div>

### 更多设置
<div class="config-card">

- **URL**: `secrandom://settings/more`
- **IPC**: `settings/more`
- **功能**: 打开更多设置界面

</div>

### 更新设置
<div class="config-card">

- **URL**: `secrandom://settings/update`
- **IPC**: `settings/update`
- **功能**: 打开更新设置界面

</div>

### 关于设置
<div class="config-card">

- **URL**: `secrandom://settings/about`
- **IPC**: `settings/about`
- **功能**: 打开关于信息界面

</div>

### 设置主界面
<div class="config-card">

- **URL**: `secrandom://settings`
- **IPC**: `settings`
- **功能**: 打开设置主界面

</div>

## 托盘功能命令

### 切换显示
<div class="config-card">

- **URL**: `secrandom://tray/toggle`
- **IPC**: `tray/toggle`
- **功能**: 切换主界面显示状态

</div>

### 打开设置
<div class="config-card">

- **URL**: `secrandom://tray/settings`
- **IPC**: `tray/settings`
- **功能**: 通过托盘打开设置

</div>

### 浮窗控制
<div class="config-card">

- **URL**: `secrandom://tray/float`
- **IPC**: `tray/float`
- **功能**: 切换浮窗显示状态

</div>

### 重启程序
<div class="config-card warning">

- **URL**: `secrandom://tray/restart`
- **IPC**: `tray/restart`
- **功能**: 重启SecRandom程序

</div>

### 退出程序
<div class="config-card warning">

- **URL**: `secrandom://tray/exit`
- **IPC**: `tray/exit`
- **功能**: 退出SecRandom程序

</div>

## 数据获取命令（只读）

### 获取点名名单
<div class="config-card theme">

- **URL**: `secrandom://data/roll_call_list`
- **IPC**: `data/roll_call_list`
- **功能**: 获取当前点名名单数据

</div>

### 获取抽奖名单
<div class="config-card theme">

- **URL**: `secrandom://data/lottery_list`
- **IPC**: `data/lottery_list`
- **功能**: 获取当前抽奖名单数据

</div>

### 获取点名历史
<div class="config-card theme">

- **URL**: `secrandom://data/roll_call_history`
- **IPC**: `data/roll_call_history`
- **功能**: 获取点名历史记录

</div>

### 获取抽奖历史
<div class="config-card theme">

- **URL**: `secrandom://data/lottery_history`
- **IPC**: `data/lottery_history`
- **功能**: 获取抽奖历史记录

</div>

## 使用示例

<div class="tip-box">

### URL 协议使用

**快捷方式创建**
1. 右键桌面 → 新建 → 快捷方式
2. 输入URL协议（如 `secrandom://main`）
3. 命名快捷方式并完成创建

**批处理脚本**
```batch
@echo off
echo 正在启动SecRandom主界面...
start secrandom://main
```

**浏览器调用**
```html
<a href="secrandom://main">打开SecRandom</a>
```

### IPC 协议使用

**Python 示例**
完整的 Python 使用示例请参考：[secrandom_ipc_send_url.py](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.py)

**JavaScript 示例**
完整的 JavaScript 使用示例请参考：[secrandom_ipc_send_url.js](https://github.com/SECTL/SecRandom/blob/master/secrandom_ipc_send_url.js)

### 注意事项

1. **协议注册**：确保SecRandom已正确注册URL协议
2. **安全考虑**：只使用官方文档中列出的协议
3. **参数验证**：使用参数时确保参数值正确
4. **错误处理**：建议在使用协议时添加错误处理机制
5. **IPC通信**：IPC协议需要程序在运行状态才能使用

### 故障排除

**协议无法打开**
- 检查SecRandom是否正确安装
- 重新安装软件以修复协议注册
- 检查系统安全软件是否阻止了协议调用
- 如以上因素均排除，则向开发者反馈bug

**IPC通信失败**
- 确认SecRandom程序正在运行
- 检查IPC服务是否正常启动
- 查看软件日志获取详细错误信息

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