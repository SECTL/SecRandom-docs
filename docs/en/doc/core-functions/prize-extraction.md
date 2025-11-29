---
title: prize-extraction
createTime: 2025/11/29 13:06:48
---
# Dynamic Weight System ⚖️

## 🎯 Fair Draw - Introduction

> **Fair Draw** is an intelligent random selection method that uses a **dynamic weight algorithm** to ensure each member's chance of being selected is inversely proportional to their past selection frequency, thus achieving true fairness.
>
> It is suitable for scenarios that require fair random selection, such as classroom questioning, task assignment, and activity participation.

::: tip Key Advantages

* **Smart Balancing**: Prevents frequent selection of the same student.
* **Dynamic Adjustment**: Weights change in real-time based on historical data.
* **Multi-dimensional Consideration**: Factors such as total times, group, and gender are all considered.
:::

## ⚙️ Dynamic Weight System

The Dynamic Weight System is the core engine of SecRandom for fair draws. It calculates the real-time weight of each member based on **5 key dimensions**:

| Dimension                    | Purpose                                       | Weight Impact                         |
| ---------------------------- | --------------------------------------------- | ------------------------------------- |
| 📊 **Total Draw Count**      | Prevent frequent selection of the same person | More draws result in lower weight     |
| 👥 **Group Balance**         | Ensure equal opportunities across groups      | Group draw frequency impacts weight   |
| ⚧️ **Gender Balance**        | Maintain gender proportion balance            | Gender draw frequency impacts weight  |
| 🎯 **Base Weight**           | Provide baseline fairness                     | Fixed baseline value                  |
| 🆕 **Cold Start Protection** | Protect new members                           | First 10 draws have weight protection |

## 🔍 Algorithm Logic Explanation

### 📈 Weight Calculation Formula

The system calculates the final weight based on historical data through the following **5 steps**:

#### 1️⃣ Frequency Penalty Factor

Weight adjustment based on the total number of draws for a person:

```python
frequency_factor = 1.0 / math.sqrt(student_history["total_number_of_times"] * 2 + 1)
```

**Example Calculation**:

* Student A was drawn 5 times → `1/√(5*2+1) = 1/√11 ≈ 0.302`
* Weight value: 0.302 (smaller values mean lower probability of being selected)

#### 2️⃣ Group Balance Factor

Ensures equal opportunities for all groups:

```python
group_factor = 1.0 / (group_history * 0.2 + 1)
```

**Trigger Condition**: At least 3 groups have recorded draws.

#### 3️⃣ Gender Balance Factor

Maintains gender ratio balance:

```python
gender_factor = 1.0 / (gender_history * 0.2 + 1)
```

**Trigger Condition**: At least 2 genders have recorded draws.

#### 4️⃣ Cold Start Protection Mechanism

Protects newly joined students:

```python
if current_round < COLD_START_ROUNDS:  # COLD_START_ROUNDS = 10
    frequency_factor = min(0.8, frequency_factor)
```

**Protection Effect**: New students enjoy a minimum weight protection of 0.8 for the first 10 draws.

#### 5️⃣ Final Weight Synthesis

The final weight is derived by combining all factors:

```python
student_weights = {
    'base': BASE_WEIGHT * 0.2,           # Base Weight (20%)
    'frequency': frequency_factor * 3.0,  # Frequency Penalty (60%)
    'group': group_factor * 0.8,        # Group Balance (10%)
    'gender': gender_factor * 0.8       # Gender Balance (10%)
}
```

::: warning Weight Range
The final weight is normalized to a reasonable range to prevent extreme values from impacting fairness.
:::

## 📊 Practical Application Effects

### Scenario Example

Assume a class of 30 students, where:

* Xiao Ming has been drawn 15 times (high frequency)
* Xiao Hong has been drawn 3 times (medium frequency)
* Xiao Gang is a new student (cold start)

**Weight Comparison**:

* Xiao Ming: Low weight (significant frequency penalty)
* Xiao Hong: Medium weight (normal level)
* Xiao Gang: Protected weight (cold start mechanism)

### 🎲 Draw Probability

The system calculates the draw probability based on real-time weight, ensuring long-term fairness in the statistics.
