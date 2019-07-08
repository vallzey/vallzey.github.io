---
title: logging的使用
tags:
  - python模块
categories:
  - python
date: 2018-07-04 09:03:14
updated: 2018-07-04 09:03:14
---

##### A simple example

- the default log of level is WARNING
```python
import logging
logging.warning('Watch out!')  # will print a message to the console
logging.info('I told you so')  # will not print anything
```

```
WARNING:root:Watch out!
```
##### Logging to a file

> 主要说明如何将日志打印到文件中,以及如何刷新日志(不保留原有的日志). 

```python
import logging
# set filename and log level
logging.basicConfig(filename='example.log',level=logging.DEBUG)
# If you want each run to start afresh, not remembering the messages from earlier runs, you can specify the filemode argument, 
# logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
```

##### Logging variable data
> 主要说明日志输出是可以使用变量的

```python
import logging
logging.warning('%s before you %s', 'Look', 'leap!')
```

##### Changing the format of displayed messages

> 主要说明如何改变日志输出格式以及是时间输出格式如何改变

```python
import logging
# you can use 'format=' to formulate what you want output
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
logging.debug('This message should appear on the console')
logging.info('So should this')
logging.warning('And this, too')

# detefmt can formulate format of date
logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
logging.warning('is when this event was logged.')
```

##### Configuring Logging

> 主要说明日志如何新建日志的实例对象以及如何配置日志文件

###### 建立日志对象
```python
import logging

# create logger
logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error('error message')
logger.critical('critical message')
```

###### 建立日志对象并且读取日志配置文件

```python
import logging
import logging.config

logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('simpleExample')

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error('error message')
logger.critical('critical message')
```
**logging.conf**
```
[loggers]
keys=root,simpleExample

[handlers]
keys=consoleHandler

[formatters]
keys=simpleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_simpleExample]
level=DEBUG
handlers=consoleHandler
qualname=simpleExample
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=
```
**another logging.conf**
```
[loggers]
keys=root,simple

[handlers]
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=simpleFmt

[logger_root]
level=DEBUG
handlers=consoleHandler
# handlers=fileHandler
# handlers=rotatingFileHandler

[logger_simple]
level=DEBUG
handlers=consoleHandler,fileHandler
qualname=simple
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFmt
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=simpleFmt
args=('test.log', 'w')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=DEBUG
formatter=simpleFmt
args=("python.log", "a", 20*1024*1024, 10)

[formatter_simpleFmt]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s - [%(filename)s:%(lineno)s]
datefmt=
```


















Level | Numeric value
---|---
CRITICAL | 50
ERROR | 40
WARNING | 30
INFO | 20
DEBUG | 10
NOTSET | 0


Format | Description
---|---
%(levelno)s | 打印日志级别的数值
%(levelname)s | 打印日志级别名称
%(pathname)s | 打印当前执行程序的路径，其实就是sys.argv[0]
%(filename)s | 打印当前执行程序名
%(funcName)s | 打印日志的当前函数
%(lineno)d | 打印日志的当前行号
%(asctime)s | 打印日志的时间
%(thread)d | 打印线程ID
%(threadName)s | 打印线程名称
%(process)d | 打印进程ID
%(message)s | 打印日志信息
















