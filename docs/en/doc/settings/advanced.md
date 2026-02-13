---
title: Advanced Settings
createTime: 2026/02/13 22:20:38
---

> **Deeply Customize Program Experience**
>
> Here you can fine-tune SecRandom's core fairness algorithms, page elements, etc., to meet more complex extraction needs.

## ::lucide:scale:: Basic Fairness Settings

Configure the basic calculation methods for fairness extraction, determining which factors participate in the fairness calculation.

- **Fair Extraction by Total Count**: When enabled, the system dynamically adjusts weights based on each person's total number of times selected; fewer times means higher weight.
- **Fair Extraction by Group**: When enabled, the selection status of groups will participate in the fairness calculation to balance the winning opportunities of each group.
- **Fair Extraction by Gender**: When enabled, the selection status of genders will participate in the fairness calculation to balance the winning opportunities of different genders.
- **Fair Extraction by Time**: When enabled, time factors will be considered in the fairness calculation.

## ::lucide:cpu:: Core Fairness Mechanism

Includes frequency functions, mean difference protection, and other core algorithms for fine-grained control of weight calculation logic.

- **Frequency Penalty Function**: Select the calculation function type for frequency penalty.
  - **Linear**: Weight decreases linearly with the number of selections.
  - **Square Root**: Weight decreases with the square root of the number of selections (smoother change).
  - **Exponential**: Weight decreases exponentially with the number of selections (more drastic change).
- **Frequency Penalty Weight**: Adjust the proportion of frequency penalty in the total weight. Higher values mean the number of selections has a greater impact on the next selection probability.
- **Enable Mean Difference Protection**: When enabled, mean filtering and maximum gap protection will be applied to avoid extreme unevenness in selections.
- **Difference Threshold**: The maximum allowed difference in counts. When the difference between the maximum and minimum selection counts exceeds this threshold, the system will forcibly increase the probability for low-frequency individuals.
- **Minimum Candidates in Pool**: Set the minimum number of students in the candidate pool under the mean difference protection mechanism to prevent the pool from becoming too small and making the selection predictable.

## ::lucide:shield:: Extraction Protection Settings

Configure shielding rules after extraction to prevent repeated selection of the same person within a short time.

- **Enable Post-Extraction Shielding**: When enabled, students just selected will be "shielded" for a specified time and will not be selected again.
- **Shielding Time**: Set the duration of the post-extraction shielding.
- **Shielding Time Unit**: Select the time unit for the shielding time (seconds, minutes, hours).

## ::lucide:snowflake:: Cold Start Settings

Configure cold start rules for new classes or initial stages to help the algorithm quickly accumulate data.

- **Enable Cold Start Mode**: Use cold start mode for new classes or initial stages, where the algorithm will use a special weight strategy.
- **Cold Start Rounds**: Set the number of rounds for the cold start mode. After exceeding this number, it will automatically switch back to the normal fairness mode.

## ::lucide:bar-chart:: Advanced Weight Settings

Includes advanced adjustments such as weight range and balance weights for fine-tuning the influence of various factors.

- **Base Weight**: Set the base weight value for each option.
- **Minimum Weight Range**: Set the minimum weight value allowed during calculation.
- **Maximum Weight Range**: Set the maximum weight value allowed during calculation.
- **Group Balance Weight**: Adjust the proportion of the group balance factor in the total weight.
- **Gender Balance Weight**: Adjust the proportion of the gender balance factor in the total weight.
- **Time Factor Weight**: Adjust the proportion of the time factor in the total weight.

## ::lucide:music:: Music Settings

Configure background music and sound effects for different scenarios such as roll call and lottery.

- **Import Music**: Click to select local music files to import into the system.
- **Application Location**: Set independent music configurations for "Roll Call", "Flash Draw", and "Lottery".
- **Process Music**: Set the background music played during the extraction process.
- **Fade In/Out Duration**: Set the volume fade duration (in milliseconds) for the start and end of the process music to achieve smooth transitions.
- **Result Music**: Set the sound effect or music played when the extraction result is displayed.
- **Result Fade In/Out Duration**: Set the volume fade duration (in milliseconds) for the result music.
- **Volume**: Independently adjust the music volume for each scenario (0-100%).

## ::lucide:layout-dashboard:: Layout Management

Customize the layout and display content of the main interface and sidebar.

### Main Interface Sidebar
- **Extraction Panel Position**: Choose the display position of the extraction panel (Left/Right).
- **Function Position Configuration**: Independently set the display position (Top, Bottom, or Hidden) for "Roll Call", "Lottery", "Camera Preview", "History", and "Settings Icon" in the sidebar.
- **Quantity Label Format**: Set the format of the quantity label displayed in the sidebar (e.g., "Total/Groups").
- **Effective Mode**: Modifying the sidebar configuration usually requires **restarting the software** to take effect.

### Tray Management
- **Show/Hide Options**: Control which options are included in the system tray menu (e.g., "Show/Hide Main Interface", "Open Settings Window", "Restart App", "Exit App", etc.).
