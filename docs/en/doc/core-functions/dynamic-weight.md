---
title: Dynamic Weight
createTime: 2025/11/29 13:22:19
---
# Dynamic Weight System ⚖️

## 🎯 Fair Extraction - Introduction

> **Fair Extraction** is an intelligent random selection method that ensures each member's probability of being selected is inversely proportional to their historical selection frequency through a **dynamic weight algorithm**, achieving true fairness.
>
> Suitable for scenarios requiring fair random selection such as classroom questioning, task assignment, and activity participation.

::: tip Core Advantages
- **Intelligent Balance**: Avoid frequently selecting the same student
- **Dynamic Adjustment**: Weights change in real-time based on historical records
- **Multi-dimensional Consideration**: Comprehensively considers factors like total count, groups, gender, etc.
:::

## ⚙️ Dynamic Weight System

The dynamic weight system is the core engine of SecRandom's fair extraction, calculating real-time weights for each member through **5 key dimensions**:

| Dimension | Function | Weight Impact |
|-----------|----------|---------------|
| 📊 **Total Selection Count** | Prevent frequent selection of the same person | More selections, lower weight |
| 👥 **Group Balance** | Ensure equal opportunities for each group | Group selection count affects weight |
| ⚧️ **Gender Balance** | Maintain gender ratio balance | Gender selection count affects weight |
| 🎯 **Base Weight** | Provide basic fairness | Fixed base score |
| 🆕 **Cold Start Protection** | Protect newly added members | Weight protection for first 10 selections |

## 🔍 Detailed Algorithm Logic

### 📈 Weight Calculation Process

The system calculates the selection weight for each student through the following steps:

#### 1️⃣ Frequency Penalty Factor

The system calculates the frequency penalty factor based on the student's total selection count, adjusting weights through different mathematical functions:

* **Linear Function**: Weight decreases linearly as selection count increases.
* **Square Root Function**: Weight decreases by the square root of selection count.
* **Exponential Function**: Weight decreases exponentially.

#### 2️⃣ Group Balance Factor

Ensures each group has equal opportunities by considering the historical selection of the group the student belongs to. Students with more selections within their group receive appropriate weight penalties.

#### 3️⃣ Gender Balance Factor

Ensures gender ratio balance during selection based on historical selection count for each gender. If one gender is over-selected, students of that gender will be penalized.

#### 4️⃣ Cold Start Protection Mechanism

Provides special protection for newly added students, ensuring they won't be overlooked due to insufficient data during initial selections. Higher initial weights are given during the protection period.

#### 5️⃣ Time Factor

Considers the time when the student was last selected. Students who haven't been selected for a longer time will receive higher weights, increasing their chance of being selected.

### 🔄 Weight Synthesis and Adjustment

Weights from each dimension are weighted and synthesized according to configured proportions, ultimately generating the total weight for each student. The system ensures weights stay between set minimum and maximum values, avoiding extreme values that could affect fairness.

### 📊 Practical Application Example

Assume there are 30 students, including:

* Xiao Ming has been selected 15 times (high frequency)
* Xiao Hong has been selected 3 times (medium frequency)
* Xiao Gang is a new student (cold start)

Based on the above algorithm:

* **Xiao Ming**: Due to high frequency, the frequency penalty is heavy, resulting in lower weight.
* **Xiao Hong**: Moderate selection count, weight at normal level.
* **Xiao Gang**: Enjoys cold start protection, higher weight.

### 🎲 Selection Probability
The system calculates selection probability based on real-time weights, ensuring fairness in long-term statistics.
