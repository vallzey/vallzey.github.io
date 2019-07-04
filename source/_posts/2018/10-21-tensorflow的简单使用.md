---
title: tensorflow的简单使用
tags:
  - python模块
categories:
  - python
date: 2018-10-21 08:58:58
---

### TensorFlow基础使用

---
##### 启发
先提一个启发性的问题，假设你有一个损失函数`$J_w$`需要最小化:

```math
J_w=w^2-10w+25
```
你只有这个函数，我们来看一下怎样用TensorFlow将其最小化，因为一个非常类似的程序结构可以用来训练神经网络。

```python
import numpy as np
import tensorflow as tf


# 接下来，让我们定义参数w，在TensorFlow中，你要用tf.Variable()来定义参数
w = tf.Variable(0, dtype=tf.float32)

# 然后我们定义损失函数 Jw = w^2-10*w+25：
# cost = tf.add(tf.add(w**2, tf.multiply(-10., w), 25))
cost = w**2-10*w+25


# (让我们用0.01的学习率，目标是最小化损失)。
train = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

# 最后下面的几行是惯用表达式:

init = tf.global_variables_initializer()
session = tf.Session()  # 这样就开启了一个TensorFlow session。
session.run(init)   # 来初始化全局变量。
session.run(w)  # 然后让TensorFlow评估一个变量，我们要用到:

# 上面的这一行将w初始化为0，并定义损失函数，我们定义train为学习算法，它用梯度下降法优化器使损失函数最小化，
# 但实际上我们还没有运行学习算法，所以#上面的这一行将w初始化为0，并定义损失函数，我们定义train为学习算法，
# 它用梯度下降法优化器使损失函数最小化，但实际上我们还没有运行学习算法，所以session.run(w)评估了w，让我：：
print(session.run(w))
for i in range(1000):
    session.run(train)
    print(session.run(w))

```
##### 对于`$x$`可变的处理
TensorFlow还有一个特点，我想告诉你，那就是这个例子将`$w$`的一个固定函数最小化了。如果你想要最小化的函数是训练集函数又如何呢？不管你有什么训练数据`$x$`，当你训练神经网络时，训练数据`$x$`会改变，那么如何把训练数据加入TensorFlow程序呢？

训练数据有`$x$`和`$y$`，但这个例子中只有`$x$`，把定义为：
```python
# 此函数可以理解为形参，用于定义过程，在执行的时候再赋具体的值
x = tf.placeholder(tf.float32,[3,1])
```
使用如下代码：

```python
coefficient = np.array([[1.], [-20.], [100.]])
x = tf.placeholder(dtype=tf.float32, shape=(3, 1))
# 接下来，让我们定义参数w，在TensorFlow中，你要用tf.Variable()来定义参数
w = tf.Variable(0, dtype=tf.float32)

# 然后我们定义损失函数 Jw = w^2-10*w+25：
# cost = tf.add(tf.add(w**2, tf.multiply(-10., w), 25))
cost = x[0][0] * w ** 2 + x[1][0] * w + x[2][0] * 1

# (让我们用0.01的学习率，目标是最小化损失)。
train = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

# 最后下面的几行是惯用表达式:

init = tf.global_variables_initializer()
with tf.Session() as session:
    # session = tf.Session()  # 这样就开启了一个TensorFlow session。
    session.run(init)  # 来初始化全局变量。
    session.run(w)  # 然后让TensorFlow评估一个变量，我们要用到:

    # 上面的这一行将w初始化为0，并定义损失函数，我们定义train为学习算法，它用梯度下降法优化器使损失函数最小化，
    # 但实际上我们还没有运行学习算法，所以#上面的这一行将w初始化为0，并定义损失函数，我们定义train为学习算法，
    # 它用梯度下降法优化器使损失函数最小化，但实际上我们还没有运行学习算法，所以session.run(w)评估了w，让我：：
    print(session.run(w))
    for i in range(1000):
        session.run(train,feed_dict={x: coefficient})
    print(session.run(w))
```
