---
title: DataX实践
tags:
  - 大数据
categories:
  - 大数据
date: 2019-07-20 21:07:10
updated: 2019-07-20 21:07:10
---

# DataX

## 一、需求

> [原文](https://www.jianshu.com/p/c789711dc2fe)

## 二、选型

> 对象主要是 DataX 和 Sqoop

功能 | DataX | Sqoop
---|--- |--- 
运行模式 | 单进程多线程 | MapReduce
MySQL读写 | 单机压力大；读写粒度容易控制 | MapReduce 模式重，写出错处理麻烦
Hive读写 | 单机压力大 | 扩展性好
文件格式 | orc支持 | orc不支持，可添加
分布式 | 不支持，可以通过调度系统规避 | 支持
流控 | 有流控功能 | 需要定制
统计信息 | 已有一些统计，上报需定制 | 没有，分布式的数据收集不方便
数据校验 | 在core部分有校验功能 | 没有，分布式的数据收集不方便
监控 | 需要定制 | 需要定制
社区 | 开源不久，社区不活跃 | 一直活跃，核心部分变动很少

> DataX 主要的缺点在于单机运行，而这个可以通过调度系统规避，其他方面的功能均优于 Sqoop，最终我们选择了基于 DataX 开发。


## 三、模型
[原github地址](https://github.com/alibaba/DataX)

### 逻辑执行模型

插件开发者不用关心太多，基本只需要关注特定系统读和写，以及自己的代码在逻辑上是怎样被执行的，哪一个方法是在什么时候被调用的。在此之前，需要明确以下概念：

- `Job`: `Job`是DataX用以描述从一个源头到一个目的端的同步作业，是DataX数据同步的最小业务单元。比如：从一张mysql的表同步到odps的一个表的特定分区。
- `Task`: `Task`是为最大化而把`Job`拆分得到的最小执行单元。比如：读一张有1024个分表的mysql分库分表的`Job`，拆分成1024个读`Task`，用若干个并发执行。
- `TaskGroup`:  描述的是一组`Task`集合。在同一个`TaskGroupContainer`执行下的`Task`集合称之为`TaskGroup`
- `JobContainer`:  `Job`执行器，负责`Job`全局拆分、调度、前置语句和后置语句等工作的工作单元。类似Yarn中的JobTracker
- `TaskGroupContainer`: `TaskGroup`执行器，负责执行一组`Task`的工作单元，类似Yarn中的TaskTracker。

简而言之， **`Job`拆分成`Task`，在分别在框架提供的容器中执行，插件只需要实现`Job`和`Task`两部分逻辑**。

### 物理执行模型

框架为插件提供物理上的执行能力（线程）。`DataX`框架有三种运行模式：

- `Standalone`: 单进程运行，没有外部依赖。
- `Local`: 单进程运行，统计信息、错误信息汇报到集中存储。
- `Distrubuted`: 分布式多进程运行，依赖`DataX Service`服务。

{% asset_img plugin_dev_guide_1.png plugin_dev_guide_1.png %}

上图中，黄色表示`Job`部分的执行阶段，蓝色表示`Task`部分的执行阶段，绿色表示框架执行阶段。

相关类关系如下：

{% asset_img plugin_dev_guide_2.png plugin_dev_guide_2.png %}
