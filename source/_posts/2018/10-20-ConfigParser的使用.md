---
title: ConfigParser的使用
tags:
  - python模块
categories:
  - python
date: 2018-10-20 08:58:58
updated: 2018-10-20 08:58:58
---

##### 配置文件格式

```
# 注释

[Section1]
an_int = 15
a_bool = true
a_float = 3.1415
baz = fun
bar = Python
foo = %(bar)s is %(baz)s!

#:和=都可以用与赋值
[My Section]
foodir: %(dir)s/whatever
dir=frob
# : 的fishier可以换行
long: this value continues
   in the next line
```
##### 读取文件方法
```python
import ConfigParser

config = ConfigParser.RawConfigParser()
config.read('test.cfg')

# getfloat() raises an exception if the value is not a float
# getint() and getboolean() also do this for their respective types
a_float = config.getfloat('Section1', 'a_float')
an_int = config.getint('Section1', 'an_int')
print a_float + an_int
```

##### 读取并且赋值
```python
import ConfigParser
config = ConfigParser.ConfigParser()
config.read('test.cfg')

# Set the third, optional argument of get to 1 if you wish to use raw mode.
print config.get('Section1', 'foo', 0)  # -> "Python is fun!"
print config.get('Section1', 'foo', 1)  # -> "%(bar)s is %(baz)s!"

# The optional fourth argument is a dict with members that will take
# precedence in interpolation.
print config.get('Section1', 'foo', 0, {'bar': 'Documentation',
                                        'baz': 'evil'})
```

##### 写入文件
```python
import ConfigParser

config = ConfigParser.RawConfigParser()

# When adding sections or items, add them in the reverse order of
# how you want them to be displayed in the actual file.
# In addition, please note that using RawConfigParser's and the raw
# mode of ConfigParser's respective set functions, you can assign
# non-string values to keys internally, but will receive an error
# when attempting to write to a file or when you get it in non-raw
# mode. SafeConfigParser does not allow such assignments to take place.
config.add_section('Section1')
config.set('Section1', 'an_int', '15')
config.set('Section1', 'a_bool', 'true')
config.set('Section1', 'a_float', '3.1415')
config.set('Section1', 'baz', 'fun')
config.set('Section1', 'bar', 'Python')
config.set('Section1', 'foo', '%(bar)s is %(baz)s!')

# Writing our configuration file to 'example.cfg'
with open('example.cfg', 'wb') as configfile:
    config.write(configfile)
```
