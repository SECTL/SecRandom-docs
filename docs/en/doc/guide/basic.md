---
title: Basic Guide
createTime: 2025/11/29 12:58:02
---
# Basic Guide

> **Fair, Just, and Open Random Selection Mechanism** - Core functionality guide optimized for educational scenarios

## Quick Start

**Beginner's Must-Read** - Get started with SecRandom's core features in just 3 steps

### Prepare List
Create or import student/prize lists

### Select Mode  
Choose person selection mode or lottery mode

### Start Selection
Click the start button to perform random selection

## Feature Overview

| Feature Type | Applicable Scenarios | Core Features | Difficulty |
|--------------|---------------------|---------------|------------|
| **Person Selection** | Classroom roll call, activity selection, random grouping | List management, weight settings, grouping | ⭐⭐ |
| **Lottery** | Meeting lottery, activity awards, holiday lottery | Prize management, probability settings, multi-round lottery | ⭐⭐⭐ |

## Person Selection Details

### Complete List Management Process

#### Create/Import Lists

##### Manual List Creation

**Steps:**
1. **Open Settings** - Click the settings icon in the system tray
2. **Select Function** - Choose "Selection Settings" in the left navigation
3. **Switch Mode** - Select "Person List" at the top
4. **Create List** - Follow the on-screen prompts to set up

##### File Import Mode (Recommended)

**Supported Formats**
- **CSV Files**: One person per line, comma-separated fields
- **Excel Files**: XLSX/XLS format, first row is header
- **NamePicker Files**: Compatible with NamePicker software format

**Import Steps**
1. **Click Import** - Select "Quick Import Student List"
2. **Select File** - Browse and select the list file
3. **Configure Fields** - Match file columns with software fields
4. **Confirm Import** - Click "Import" to complete loading

#### List Editing and Management

| Operation Type | Specific Steps | Notes |
|----------------|----------------|-------|
| **Edit Info** | Double-click table row → Edit group/gender | Number and name cannot be edited |
| **Add Person** | Click "Add" button → Enter information | Supports batch adding |
| **Delete Person** | Select row → Click "Delete" | Supports batch selection and deletion |
| **Group Management** | Set groups → Extract by group | Supports weight settings |

## Lottery Details

### Complete Prize Management Process

#### Prize List Settings

##### Create Prize List

1. **Enter Settings** - Open system tray settings
2. **Select Mode** - Choose "Selection Settings" on the left
3. **Switch Type** - Select "Lottery List" at the top
4. **Create Prize** - Set prize information following prompts

##### Import Prize List

**Supported Formats**
- **CSV Format**: Prize name, quantity, weight
- **Excel Format**: First row header (Prize, Quantity, Probability)

**Import Process** - Same as person list import steps

#### Probability Setting System

##### Equal Probability Mode

**Applicable Scenario:** All prizes have similar value

**Calculation Formula:** (1/Total Prizes) × Prize Quantity

**Example:** 5 prizes, 1 each → 20% probability each

##### Unequal Probability Mode

**Applicable Scenario:** Large difference in prize values

**Weight Setting Method**

| Prize Type | Suggested Weight | Probability Impact |
|------------|------------------|-------------------|
| Grand Prize | Weight: 1 | Low probability |
| First Prize | Weight: 5 | Medium probability |
| Second Prize | Weight: 10 | Higher probability |
| Third Prize | Weight: 20 | High probability |

**Auto Calculation:** The software automatically calculates the winning probability for each prize based on weights

## Operation Flowchart

```
Prepare List → Select Mode → Set Parameters → Start Selection → View Results
```

## FAQ Quick Reference

| Problem Type | Solution | Quick Link |
|--------------|----------|------------|
| **List Import Failed** | Check file format and encoding | [Format Guide](#文件导入模式) |
| **Probability Calculation Error** | Verify weight settings and total | [Probability Settings](#概率设置系统) |
| **Interface Display Abnormal** | Adjust zoom ratio and font | [Interface Settings](/guide/interface.md) |
| **Duplicate Selection Results** | Check deduplication settings and history | [History Feature](/core-functions/history.md) |

## Best Practice Recommendations

### Teaching Scenarios
- **Pre-class Preparation**: Import student lists and set up groups in advance
- **Weight Settings**: Adjust weights based on student participation
- **Record Saving**: Export selection records after class for analysis

### Activity Scenarios
- **Prize Grading**: Set different prize levels and corresponding probabilities
- **Real-time Display**: Connect projector for large screen display
- **Interaction Enhancement**: Coordinate with sound effects and animations