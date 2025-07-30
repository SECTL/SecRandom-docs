---
author:
  - name: 本新同学
    url: https://github.com/yuanbenxin/
  - name: 黎泽懿
    url: https://github.com/lzy98276
order: 1
---
# 核心功能
在本章，我们将向您介绍SecRandom的核心功能及其基本原理，其中包括我们引以为傲的**动态权重系统**([跳转到该节](./DynamicWeightSystem.md))

你将详细了解到这个宝藏软件所包含的两大基本功能*抽人*和*抽奖*，我们还将向您介绍所谓动态权重是如何运作的，以及如何使用它来提高抽取的公平性，正如在我们的[Github](https://github.com/SECTL/SecRandom)中的那样：
****
>公平抽取是一种随机抽取方式，它确保每个成员被抽取的权重由系统决定，从而避免不公平的结果。 这种方式适用于需要随机且公平的抽取学生回答问题或进行其他需要公平分配的场景。 SecRandom的公平抽取的实现基于动态权重系统，通过多个方面来进行权重的计算。