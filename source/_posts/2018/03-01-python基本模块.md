---
title: python基本模块
tags:
  - python模块
categories:
  - python
date: 2018-03-01 08:58:58
updated: 2018-03-01 08:58:58
---

##### Enumerate()

> 很多时候，在处理迭代器时，我们还需要保持迭代次数。 Python通过为此任务提供内置函数enumerate（）来简化程序员的任务。

###### Syntax:
```
enumerate(iterable, start=0)

Parameters:
Iterable: any object that supports iteration
Start: the index value from which the counter is 
              to be started, by default it is 0 
```
###### Code:
```python
# Python program to illustrate 
# enumerate function in loops 
l1 = ["eat","sleep","repeat"] 
  
# printing the tuples in object directly 
for ele in enumerate(l1): 
    print ele 
print 
# changing index and printing separately 
for count,ele in enumerate(l1,100): 
    print count,ele 
```
###### Output:
```python
(0, 'eat')
(1, 'sleep')
(2, 'repeat')

100 eat
101 sleep
102 repeat
```

##### getattr()
> getattr() 函数用于返回一个对象属性值。

###### Syntax:
```
getattr(object, name[, default])

Parameters:
object -- 对象。
name -- 字符串，对象属性。
default -- 默认返回值，如果不提供该参数，在没有对应属性时，将触发 AttributeError。
```
###### Code:
```python
>>>class A(object):
...     bar = 1
... 
>>> a = A()
>>> getattr(a, 'bar')        # 获取属性 bar 值
1
>>> getattr(a, 'bar2')       # 属性 bar2 不存在，触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'A' object has no attribute 'bar2'
>>> getattr(a, 'bar2', 3)    # 属性 bar2 不存在，但设置了默认值
3
```

##### zip()
> zip() 函数用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表。
>
> 如果各个迭代器的元素个数不一致，则返回列表长度与最短的对象相同，利用 * 号操作符，可以将元组解压为列表。
>
> zip 方法在 Python 2 和 Python 3 中的不同：在 Python 3.x 中为了减少内存，zip() 返回的是一个对象。如需展示列表，需手动 list() 转换。

###### Syntax:
```
zip([iterable, ...])

Parameters:
iterabl -- 一个或多个迭代器;
```
###### Code:
```python
>>>a = [1,2,3]
>>> b = [4,5,6]
>>> c = [4,5,6,7,8]
>>> zipped = zip(a,b)     # 打包为元组的列表
[(1, 4), (2, 5), (3, 6)]
>>> zip(a,c)              # 元素个数与最短的列表一致
[(1, 4), (2, 5), (3, 6)]
>>> zip(*zipped)          # 与 zip 相反，*zipped 可理解为解压，返回二维矩阵式
[(1, 2, 3), (4, 5, 6)]
```

##### filter()
> filter() 函数用于过滤序列，过滤掉不符合条件的元素，返回由符合条件元素组成的新列表。
>
> 该接收两个参数，第一个为函数，第二个为序列，序列的每个元素作为参数传递给函数进行判，然后返回 True 或 False，最后将返回 True 的元素放到新列表中。
>
> 注意: Pyhton2.7 返回列表，Python3.x 返回迭代器对象，

###### Syntax:
```
filter(function, iterable)

Parameters:
function -- 判断函数。
iterable -- 可迭代对象。
```
###### Code:
```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 过滤出1~100中平方根是整数的数： 
import math
def is_sqr(x):
    return math.sqrt(x) % 1 == 0
 
newlist = filter(is_sqr, range(1, 101))
print(newlist)
```
###### Output:
```python
[1, 3, 5, 7, 9]
```
