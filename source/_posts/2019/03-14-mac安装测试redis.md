---
title: mac安装测试redis
tags:
  - redis
categories:
  - 数据库
date: 2019-03-14 08:49:40
---
### Redis简介
- Redis 是完全开源免费的，遵守BSD协议，是一个高性能的key-value数据库。
- Redis运行在内存中，同时支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
- Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

### Why Redis?

作为key-value型数据库，Redis:
- 性能极高(Redis能读的速度是110000次/s,写的速度是81000次/s)
- 丰富的数据类型
- 原子(Redis的所有操作都是原子性的)

### macOS上下载Redis

```
$ brew install redis
```

配置Redis
安装完成后redis默认的配置文件redis.conf位于/usr/local/etc

同时，redis-sentinel.conf也在这里。
> 如果启动时不指定配置文件,redis会使用程序中内置的默认配置.但是只有在开发和测试阶段才考虑使用内置的默认配置，正式环境最好还是提供配置文件，并且一般命名为redis.conf


启动Redis
```
redis-server /usr/local/etc/redis.conf
```
> redis服务器启动成功，并在监听6379端口的网络连接。

如果想要检测redis服务器是否启动，需要重新打开一个终端窗口，输入命令:

```
redis-cli ping

# PONG 说明正常
```

关闭Redis

1. 在执行启动命令的窗口使用ctrl+c
1. 在另外一个终端窗口执行：
```
$ redis-cli shutdown
```

### 配置

https://www.runoob.com/redis/redis-conf.html