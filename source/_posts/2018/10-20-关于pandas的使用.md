---
title: 关于pandas的使用
tags:
  - python模块
categories:
  - python
date: 2018-10-20 08:58:58
updated: 2018-10-20 08:58:58

---

##### 初始化数据

```python
df = pd.DataFrame(list(project_info.find()))
```
##### 删除字段

```python
del df['_id']
```

##### 选择需要显示的字段

```python
df = data[['aear','cate','subcate','name','maxmoney','minmoney','time']]
```

##### 显示前n条记录
```python
df.head(n)
```

##### 使用groupby实现数据分组
```python
# 这个时候并不是DataFrame类型,可以根据某个字段分组
group = df.groupby('name')

# 可以使用size()记录分组数量,并且用sort_values(ascending=False)降序
sort_group = group.size().sort_values(ascending=False)

# sorted_series.keys()表示取出所有的keys,sorted_series存储的为values
# 可以使用iteritems()遍历
for userid, length in sort_group.iteritems():
    print('%d:%d' % (userid, length))
```

##### pandas.Series.diff

> 计算Series元素与Series中另一个元素的差异（默认值为上一行中的元素）。

###### Syntax:

```
Series.diff(periods=1)

Parameters:
periods : int, default 1.Periods to shift for calculating difference, accepts negative values.
```
###### Code:
```python
s = pd.Series([1, 1, 2, 3, 5, 8])
s.diff()
```
###### Output:
```python
0    NaN
1    0.0
2    1.0
3    1.0
4    2.0
5    3.0
```

##### pandas.DataFrame.apply

> 沿DataFrame的轴应用函数。。

###### Syntax:

```
DataFrame.apply(func, axis=0, broadcast=None, raw=False, reduce=None, result_type=None, args=(), **kwds)

Parameters:
func : function.Function to apply to each column or row.
axis : {0 or ‘index’, 1 or ‘columns’}, default 0
        Axis along which the function is applied:
        0 or ‘index’: apply function to each column.
        1 or ‘columns’: apply function to each row.
```
###### Code:
```python
>>> df = pd.DataFrame([[4, 9],] * 3, columns=['A', 'B'])
>>> df
   A  B
0  4  9
1  4  9
2  4  9
>>> df.apply(np.sum, axis=0)
A    12
B    27
dtype: int64
>>> df.apply(np.sum, axis=1)
0    13
1    13
2    13
dtype: int64
```

> 筛选

###### Code:
```python
# 1 用于筛选某一列在list中存在数据
df = pd.read_csv(file_path)
l = ['a','b']
df = df[df['name'].isin(l)]

```
















