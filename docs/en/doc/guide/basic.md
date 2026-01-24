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
| **Person Selection** | Classroom roll call, activity selection, random grouping | List management, fair algorithm, filtering | ⭐⭐ |
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

**Smart Features**
- **Background Loading**: Import process supports background loading to avoid interface freezing
- **Data Preview**: Preview data before import to ensure accuracy
- **Column Mapping**: Automatically identify fields like name, student ID, gender, etc.

#### List Editing and Management

| Operation Type | Specific Steps | Notes |
|----------------|----------------|-------|
| **Edit Info** | Double-click table row → Edit group/gender | Number and name cannot be edited |
| **Add Person** | Click "Add" button → Enter information | Supports batch adding |
| **Delete Person** | Select row → Click "Delete" | Supports batch selection and deletion |
| **Group Management** | Set groups → Extract by group | Supports weight settings |
| **Batch Operations** | Multi-select rows → Batch modify group/gender | Improve editing efficiency |

**Smart Features**
- **File Monitoring**: Automatically refresh interface when list file is modified externally
- **List Statistics**: Display total class size, group sizes, and other statistics

### Selection Feature Details

#### Filtering Conditions

| Filter Type | Function Description | Usage Scenarios |
|-------------|---------------------|-----------------|
| **Class Filter** | Select target class from multiple classes | Multi-class teaching scenarios |
| **Group Filter** | Select specific group within a class | Group teaching scenarios |
| **Gender Filter** | Filter by gender (Male/Female/Unknown) | Gender-specific activities |
| **Range Filter** | Specify selection range (All/Selected/Unselected) | Control selection pool |

#### Selection Control

- **Count Setting**: Adjust selection count via +/- buttons, supports long-press for continuous adjustment
- **Reset Results**: One-click reset selection results to start over
- **View Remaining**: Real-time view of remaining unselected list
- **Voice Announcement**: Supports voice announcement of selection results

#### Fair Selection Algorithm

**Core Mechanism** - Ensures equal opportunity for every student

| Algorithm Feature | Function Description | Technical Principle |
|-------------------|---------------------|-------------------|
| **Average Protection** | Ensures each student's selection count approaches average | Based on historical record statistics of selection frequency |
| **Gap Protection** | Limits the gap in selection counts between students | Dynamically adjusts selection weights |
| **History Records** | Calculates selection frequency based on historical records | Smart balancing algorithm |

**How to Enable**
- Enable fair selection algorithm in settings
- System automatically balances selection counts
- Prevents certain students from being selected frequently

### Quick Selection Features

#### Floating Window Selection

- **Quick Launch**: Select without opening main window
- **Convenient Operation**: Floats on desktop, always available
- **Mode Switching**: Supports switching between person selection and lottery modes

#### Shortcut Key Selection

- **Custom Shortcuts**: Configure personal shortcuts in settings
- **One-Click Selection**: Press shortcut key to immediately start selection
- **Efficient Operation**: Suitable for frequently used scenarios

## Lottery Details

### Complete Prize Management Process

#### Prize List Settings

##### Create Prize List

1. **Enter Settings** - Open system tray settings
2. **Select Mode** - Choose "Selection Settings" on the left
3. **Switch Type** - Select "Lottery List" at the top
4. **Create Prize** - Set prize information following prompts

**Smart Features**
- **Multiple Prize Pools**: Supports creating multiple prize pools, each managed independently
- **Pool Naming**: Can set prize pool names for easy distinction of different activities
- **Batch Management**: Supports batch adding, editing, and deleting prizes

##### Import Prize List

**Supported Formats**
- **CSV Format**: Prize name, quantity, weight
- **Excel Format**: First row header (Prize, Quantity, Probability)

**Import Process**
1. Select "Quick Import Prize List"
2. Browse and select prize file
3. Configure field mapping
4. Preview data to confirm
5. Complete import

**Smart Features**
- **Column Mapping**: Automatically identify prize name, weight, and other fields
- **Data Validation**: Validate data format before import
- **Background Loading**: Avoid interface freezing

#### Probability Setting System

##### Equal Probability Mode

**Applicable Scenario:** All prizes have similar value

**Calculation Formula:** (1/Total Prizes) × Prize Quantity

**Example:** 5 prizes, 1 each → 20% probability each

**Features:**
- All prizes have the same selection probability
- Suitable for scenarios with similar prize values and fair distribution
- System automatically calculates selection probability for each prize

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

**Features:**
- Supports setting different weights for each prize
- Higher weight means higher selection probability
- Suitable for scenarios with different prize values and controlled winning rates
- Supports precise control of each prize's winning probability

### Selection Feature Details

- **Count Setting**: Supports setting selection count
- **Prize Pool Selection**: Supports selecting from specified prize pools
- **History Records**: Supports viewing selection history
- **Result Display**: Supports winning result display and statistics
- **Animation Effects**: Uses animation effects to display winning results, enhancing activity atmosphere

## Operation Flowchart

```
Prepare List → Select Mode → Set Parameters → Start Selection → View Results → History Records
    ↓          ↓          ↓          ↓          ↓          ↓
Create/Import   Person/Lottery   Count/Filter   Click Start   Animation   Statistics
```

## FAQ Quick Reference

| Problem Type | Solution | Quick Link |
|--------------|----------|------------|
| **List Import Failed** | Check file format and encoding | [Format Guide](#文件导入模式) |
| **Probability Calculation Error** | Verify weight settings and total | [Probability Settings](#概率设置系统) |
| **Interface Display Abnormal** | Adjust zoom ratio and font | [Interface Settings](/guide/interface.md) |
| **Duplicate Selection Results** | Check deduplication settings and history | [History Feature](/core-functions/history.md) |
| **Unfair Selection** | Enable fair selection algorithm | [Fair Algorithm](#公平抽取算法) |
| **How to Quick Select** | Use floating window or shortcuts | [Quick Selection](#快速抽取功能) |

## Best Practice Recommendations

### Teaching Scenarios
- **Pre-class Preparation**: Import student lists and set up groups in advance
- **Weight Settings**: Adjust weights based on student participation
- **Record Saving**: Export selection records after class for analysis
- **Fairness Assurance**: Enable fair selection algorithm to avoid frequent selection of certain students
- **Classroom Questions**: Use person selection mode, set count to 1-2, ensure every student has opportunity
- **Post-class Summary**: View history records, count student selection times

### Activity Scenarios
- **Prize Grading**: Set different prize levels and corresponding probabilities
- **Real-time Display**: Connect projector for large screen display
- **Interaction Enhancement**: Coordinate with sound effects and animations
- **Prize Settings**: Set different weights based on prize value, high-value prizes have lower weights
- **Multi-round Lottery**: Create multiple prize pools for different lottery rounds
- **Result Display**: Use animation effects to display winning results, enhance activity atmosphere
- **Data Backup**: Regularly backup lottery data to avoid data loss
