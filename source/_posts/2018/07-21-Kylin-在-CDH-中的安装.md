---
title: Kylin 在 CDH 中的安装
tags:
  - 大数据
categories:
  - 大数据
date: 2018-07-21 21:07:10
updated: 2018-07-21 21:07:10
top: true
---

# Apache Kylin
中文名麒（shen）麟（shou） 是Hadoop动物园的重要成员。Apache Kylin是一个开源的分布式分析引擎，最初由eBay开发贡献至开源社区。它提供Hadoop之上的SQL查询接口及多维分析（OLAP）能力以支持大规模数据，能够处理TB乃至PB级别的分析任务，能够在亚秒级查询巨大的Hive表，并支持高并发。

## 安装
### 环境
- CDH 5.10.0
- apache-kylin-1.6.0-cdh5.7-bin
> 官网建议 CDH 5.10 安装 Kylin 2.0 ，尝试后发现部分查询有问题，后又换成 1.6.0 版本

### 下载并解压到 /opt 目录

```
tar zvxf apache-kylin-1.5.2.1-cdh5.7-bin.tar -C /opt
mv /opt/apache-kylin-1.6.0-cdh5.7-bin /opt/kylin-1.6.0
```

### 赋予权限
- kylin 运行用户必须有，hdfs,hive,hbase 操作权限
- /opt/kylin-1.6.0 以下目录，当前用户必须有读写修改权限

### 环境变量 /etc/profile

```
export KYLIN_HOME=/opt/kylin-1.6.0
export HCAT_HOME=/opt/cloudera/parcels/CDH/lib/hive-hcatalog
```
> 由于使用的是 CDH 集群，其它组件环境已经配置好，只需配以上变量即可

### 配置 kylin.properties

```
# 修改
kylin.hive.client=beeline
kylin.hive.beeline.params=-n hive --hiveconf hive.security.authorization.sqlstd.confwhitelist.append='mapreduce.job.*|dfs.*' -u 'jdbc:hive2://master:10000'
# 增加
kylin.job.jar=/opt/kylin-1.6.0/lib/kylin-job-1.6.0.jar
kylin.coprocessor.local.jar=/opt/kylin-1.6.0/lib/kylin-coprocessor-1.6.0.jar
kylin.job.yarn.app.rest.check.status.url=http://master:8088/ws/v1/cluster/apps/${job_id}?anonymous=true
# kylin.job.mr.lib.dir=/opt/cloudera/parcels/CDH/lib/sentry/lib
```

### 环境检查


```bash
# /opt/kylin-1.6.0/bin 目录下
./find-hive-dependency.sh
./find-hbase-dependency.sh
./check-env.sh
```

### 导入测试数据

```
./sample.sh
```

### 启动 Kylin

```
./kylin.sh start
```

### 访问 web 界面

```
登录后台：http://xxxxx:7070/kylin
账号密码：ADMIN/KYLIN
```

## 问题解决

### HDFS 权限

- `dfs.permissions` 设置为 `false`
- 目录权限可使用，`hdfs dfs -chmod -R 777 /`

### kylin 2.0 版本中查询问题

```
./kylin.sh org.apache.kylin.storage.hbase.util.DeployCoprocessorCLI /opt/kylin-1.6.0/lib/kylin-coprocessor-1.6.0.jar all
```

### 构建 Cube 出错
一直卡在构建 cube 的第三步，相应 mapreduce 任务在 map 阶段出错
```
Error: java.lang.ClassNotFoundException: org.apache.hadoop.hive.serde2.typeinfo.TypeInfo at java.net.URLClassLoader$1.run(URLClassLoader.java:366) at java.net.URLClassLoader$1.run(URLClassLoader.java:355) at java.security.AccessController.doPrivileged(Native Method) at java.net.URLClassLoader.findClass(URLClassLoader.java:354) at java.lang.ClassLoader.loadClass(ClassLoader.java:425) at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:308) at java.lang.ClassLoader.loadClass(ClassLoader.java:358) at java.lang.Class.forName0(Native Method) at java.lang.Class.forName(Class.java:270) at org.apache.hadoop.conf.Configuration.getClassByNameOrNull(Configuration.java:2138) at org.apache.hadoop.conf.Configuration.getClassByName(Configuration.java:2103) at org.apache.hadoop.conf.Configuration.getClass(Configuration.java:2197) at org.apache.hadoop.mapreduce.task.JobContextImpl.getInputFormatClass(JobContextImpl.java:184) at org.apache.hadoop.mapred.MapTask.runNewMapper(MapTask.java:749) at org.apache.hadoop.mapred.MapTask.run(MapTask.java:341) at org.apache.hadoop.mapred.YarnChild$2.run(YarnChild.java:164) at java.security.AccessController.doPrivileged(Native Method) at javax.security.auth.Subject.doAs(Subject.java:415) at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1796) at org.apache.hadoop.mapred.YarnChild.main(YarnChild.java:158)
```

google 一番后,发现如下解决方案

最后在 `kylin.properties` 中添加 `kylin.job.mr.lib.dir=/opt/cloudera/parcels/CDH/lib/sentry/lib` 解决





