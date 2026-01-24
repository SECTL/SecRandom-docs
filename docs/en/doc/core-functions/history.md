---
title: History
createTime: 2025/11/29 13:02:19
---
# History Management 📊

History management is the **data hub** of SecRandom, completely recording every random selection operation, providing data support for fairness analysis and teaching management.

## 📈 Function Overview

### 🎯 Core Features
- **📋 Complete Recording**: Full recording of time, type, and results for each selection
- **🔍 Smart Filtering**: Multi-dimensional filtering for quick historical data location
- **📊 Data Analysis**: Automatically generates statistical tables to reveal selection patterns
- **💾 Data Security**: Local JSON encrypted storage, privacy guaranteed

## 📋 History Overview

### 📝 Recorded Content
History records include the following core information, ensuring complete traceability of every random selection operation:

- **🔑 Basic Information**: Operation timestamp, operation type (person selection/prize draw)
- **🎲 Selection Information**: Records information about selected options
- **📄 More Content**: ......

### 💾 Storage Method
- **📄 Data Format**: Uses JSON storage, ensuring data integrity and query efficiency
- **📂 Storage Location**: By default located in the software's corresponding data directory under `[Class Name/Prize Pool Name].JSON` file

### 🖥️ History Interface
The history management interface consists of the following key areas:

- **🔍 Filter Panel**: Area for setting multi-dimensional filter conditions
- **📋 Record List**: Displays history record summary information in table format
- **📊 Detail Panel**: Detailed information area displayed after selecting a record

## 👀 Viewing History

### 📖 Basic Browsing
- **📊 View Selection Count**: View each student's information and total selection count, table includes the following columns:
  - 🆔 Student ID: Unique student number
  - 🧑 Name: Student name
  - 🚻 Gender: Student gender
  - 👥 Group: Belonging group
  - 🔢 Selection Count: Cumulative count of times the student has been selected
- **View by Time**: View history records in chronological order, table includes the following columns:
  - ⏰ Timestamp: Specific date and time when the operation occurred
  - 🏷️ Selection Mode: Selection mode when the record occurred

- **🔄 Sorting Methods**: Supports sorting by timestamp, student ID, name and other fields
