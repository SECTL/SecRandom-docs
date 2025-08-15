# 界面介绍

<ArticleMetadata />

> 🎨 **直观易用的界面设计** - 专为教育场景优化的现代化交互体验

## 🎯 界面概览

SecRandom采用现代化的界面设计理念，通过清晰的层次结构和直观的操作流程，让每位用户都能快速上手。界面支持**智能适配**和**个性化定制**，完美适配不同使用场景。

## 🎨 主题与个性化

### 🌈 **预设主题方案**

#### ☀️ **浅色主题**
- **适用场景**：教室、办公室等明亮环境
- **配色特点**：白底黑字 + 蓝色主色调
- **护眼指数**：⭐⭐⭐
- **能耗优化**：⭐⭐⭐⭐

#### 🌙 **深色主题**
- **适用场景**：晚间使用、昏暗环境
- **配色特点**：黑底白字 + 深色主调
- **护眼指数**：⭐⭐⭐⭐⭐
- **专注模式**：减少眼部疲劳

## 🧭 主界面功能导航

### 🎯 **核心功能区**

#### 👥 **抽人模式**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon">👥</div>
  <div class="feature-info">
    <h4>抽人模式</h4>
    <p>智能随机选择学生，支持权重和分组</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">教育专用</span>
  <span class="feature-tag">权重算法</span>
  <span class="feature-tag">分组管理</span>
</div>
</div>

#### 🎁 **抽奖模式**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon">🎁</div>
  <div class="feature-info">
    <h4>抽奖模式</h4>
    <p>奖品抽取管理，支持多级奖项</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">奖品管理</span>
  <span class="feature-tag">多级奖项</span>
</div>
</div>

#### 📊 **历史记录**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon">📊</div>
  <div class="feature-info">
    <h4>历史记录</h4>
    <p>完整的抽取历史，支持导出分析</p>
  </div>
</div>
</div>

#### ℹ️ **关于信息**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon">ℹ️</div>
  <div class="feature-info">
    <h4>关于信息</h4>
    <p>版本信息、贡献者、开源协议</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">版本信息</span>
  <span class="feature-tag">开源协议</span>
  <span class="feature-tag">贡献者</span>
</div>
</div>

## 🧵 系统托盘菜单

### 🎛️ **快速操作面板**

#### 🎭 **界面控制**
<div class="tray-section">

| 功能图标 | 操作名称 | 功能描述 |
|----------|----------|----------|
| <span class="icon"><img src="./images/uiicon-1.png" alt="关于信息" style="width: 250px;"></span> | 关于信息 | 显示程序详细信息 |
| <span class="icon"><img src="./images/uiicon-2.png" alt="显示/隐藏主界面" style="width: 250px;"></span> | 显示/隐藏主界面 | 快速切换窗口显示状态 |
| <span class="icon"><img src="./images/uiicon-3.png" alt="显示/隐藏浮窗" style="width: 250px;"></span> | 显示/隐藏浮窗 | 控制浮窗显示，仅当前会话有效 |
| <span class="icon"><img src="./images/uiicon-4.png" alt="打开设置" style="width: 250px;"></span> | 打开设置 | 快速进入设置界面 |
| <span class="icon"><img src="./images/uiicon-5.png" alt="重启/退出" style="width: 250px;"></span> | 重启/退出 | 程序重启或安全退出 |

</div>

<style>
.feature-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.feature-icon {
  width: 48px;
  height: 48px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(52, 152, 219, 0.1);
}

.feature-info h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.feature-info p {
  margin: 5px 0 0 0;
  color: #5a6c7d;
  font-size: 0.9em;
}

.feature-details {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.feature-tag {
  background: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75em;
}

.tray-section {
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
}

.tray-section table {
  width: 100%;
  border-collapse: collapse;
}

.tray-section th,
.tray-section td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

@media (max-width: 768px) {
  .feature-header {
    flex-direction: column;
    text-align: center;
  }
  
  .feature-card {
    padding: 15px;
  }
}
</style>
