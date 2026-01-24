---
title: Interface Guide
createTime: 2025/11/29 12:58:02
---
# Interface Guide

> **Intuitive and Easy-to-Use Interface Design** - Modern interaction experience optimized for educational scenarios

## Interface Overview

SecRandom adopts modern interface design philosophy, enabling every user to get started quickly through clear hierarchy and intuitive operation flow. The interface supports **smart adaptation** and **personalization**, perfectly adapting to different usage scenarios.

## Themes and Personalization

### **Preset Theme Options**

#### **Light Theme**
- **Applicable Scenarios**: Classrooms, offices, and other bright environments
- **Color Characteristics**: White background with black text
- **Eye Protection Rating**: ⭐⭐⭐
- **Energy Efficiency**: ⭐⭐⭐⭐

#### **Dark Theme**
- **Applicable Scenarios**: Evening use, dim environments
- **Color Characteristics**: Black background with white text
- **Eye Protection Rating**: ⭐⭐⭐⭐⭐
- **Focus Mode**: Reduces eye fatigue

## Main Interface Navigation

### **Core Function Area**

#### **Roll Call**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon"><img src="./images/ic_fluent_people_24_color.svg"></div>
  <div class="feature-info">
    <h4>Roll Call</h4>
    <p>Smart random student selection with weight and grouping support</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">Education Specialized</span>
  <span class="feature-tag">Weight Algorithm</span>
  <span class="feature-tag">Group Management</span>
</div>
</div>

#### **Lottery**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon"><img src="./images/ic_fluent_gift_24_color.svg"></div>
  <div class="feature-info">
    <h4>Lottery</h4>
    <p>Prize selection management with multi-level awards</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">Prize Management</span>
  <span class="feature-tag">Multi-level Awards</span>
</div>
</div>

#### **History**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon"><img src="./images/ic_fluent_history_24_color.svg"></div>
  <div class="feature-info">
    <h4>History</h4>
    <p>Complete selection history with export and analysis support</p>
  </div>
</div>
</div>

#### **Settings**
<div class="feature-card">
<div class="feature-header">
  <div class="feature-icon"><img src="./images/ic_fluent_settings_24_color.svg"></div>
  <div class="feature-info">
    <h4>Settings</h4>
    <p>Enter settings interface</p>
  </div>
</div>
<div class="feature-details">
  <span class="feature-tag">Selection Settings</span>
  <span class="feature-tag">List Management</span>
  <span class="feature-tag">About Information</span>
</div>
</div>

## System Tray Menu

### **Quick Operation Panel**

#### **Interface Control**
<div class="tray-section">

| Function Icon | Operation Name | Function Description |
|---------------|----------------|---------------------|
| <span class="icon"><img src="./images/uiicon-1.png" alt="About Information" style="width: 250px;"></span> | About Information | Display detailed program information |
| <span class="icon"><img src="./images/uiicon-2.png" alt="Show/Hide Main Interface" style="width: 250px;"></span> | Show/Hide Main Interface | Quickly toggle window display status |
| <span class="icon"><img src="./images/uiicon-3.png" alt="Show/Hide Floating Window" style="width: 250px;"></span> | Show/Hide Floating Window | Control floating window display, valid only for current session |
| <span class="icon"><img src="./images/uiicon-4.png" alt="Open Settings" style="width: 250px;"></span> | Open Settings | Quickly enter settings interface |
| <span class="icon"><img src="./images/uiicon-5.png" alt="Restart/Exit" style="width: 250px;"></span> | Restart/Exit | Program restart or safe exit |

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