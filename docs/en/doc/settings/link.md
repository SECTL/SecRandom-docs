---
title: Link Settings
createTime: 2026/01/17 21:52:27
---

> **Set up schedule integration features**
>
> Through flexible schedule integration configuration, achieve exclusive functions for class and break times. All settings are saved in real-time and take effect automatically.

## ::lucide:database:: Data Source Selection

**Data Source Selection**: Select the schedule data source
- Do not use data integration: Use the system completely independently
- Use CSES schedule data: Use schedule data from CSES
- Use Classisland data source: Use schedule data from Classisland (requires installing the integration plugin in Classisland)

## ::lucide:file-input:: CSES Schedule Import

**Schedule Import**: Import CSES schedule
- Import from file: Import CSES schedule through file
- View current configuration: View existing CSES schedule configuration

## ::lucide:settings:: Break Time Disable Settings

**Break Time Disable Function**: Require security verification when drawing during break times
- On: Drawing during break times requires security verification
- Off: Drawing during break times does not require security verification

**Verification Process Function**: When triggered during non-class time, a security verification will pop up; if disabled, the component will be directly disabled
- On: Triggering during non-class time requires security verification
- Off: During non-class time, related components are directly disabled (not hidden)

**Unlock Time Before Class**: Set the automatic unlock time before class starts
- The larger the value, the earlier the unlock time; the smaller the value, the later the unlock time
- Setting to 0 means unlocking on time

## ::lucide:settings:: Pre-class Reset Settings

**Pre-class Reset Function**: Automatically clear temporary records and interface results within a specified number of seconds before class starts
- On: Automatically clear temporary records and interface results within a specified number of seconds before class
- Off: Do not perform automatic clearing

**Pre-class Reset Time**: Set the time to automatically clear temporary records and interface results before class (1-1440 seconds)
- The larger the value, the earlier the clearing time
- The smaller the value, the later the clearing time
- Setting to 0 means clearing on time

## ::lucide:history:: Subject History Filter

**Subject History Filter**: Only use history records of the current subject when calculating weights
- On: Only use history records generated during current subject class time to calculate weights
- Off: Use all history records to calculate weights

:::tip
Link settings recommendations:
1. Choose the appropriate data integration method according to actual needs
2. Regularly import the latest schedule data to ensure accuracy
3. Reasonably set break time disable and pre-class reset functions to improve classroom management efficiency
4. Configure subject history filter function according to teaching needs
:::

## ::lucide:bell:: ClassIsland Notification Service

**Notification Service Type**: Select notification service type
- SecRandom: Use SecRandom notification window to send notifications
- ClassIsland: Send notifications through ClassIsland via integration plugin
- SecRandom + ClassIsland: Use both SecRandom and ClassIsland to send notifications

:::warning
Before using ClassIsland service, you need to install ClassIsland plugin and .NET 8 runtime in ClassIsland first.
:::

**Notification Display Duration**: Set ClassIsland notification display duration (seconds)
- Control the display time of ClassIsland notifications to ensure you have enough time to view the notification content
