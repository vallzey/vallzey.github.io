---
title: hbase总结
tags:
  - 大数据
  - 随笔
categories:
  - 大数据
date: 2019-08-19 22:56:15
---

# HBase总结
## 结构图
{% asset_img 结构图.jepg 结构图.jepg %}

## HBase是什么
- HBase（Hadoop Database）是一个基于HDFS的，面向列式存储的数据库，用来存储非结构化、半结构化数据。
- HBASE是一个高可靠性、高性能、面向列、可伸缩的分布式存储系统

## Hbase的六大特点
- 表很大：支持百万级别的列和十亿的行。
- 稀疏性
- 数据类型单一：只有字节数组Byte[]
- 数据多版本：每个单元中的数据可以有多个版本，默认情况下版本号自动分配，是单元格插入时的时间戳。
- 面向列式存储
- 无模式：每行都有一个可排序的主键和任意多的列，列可以根据需要动态增加，同一个表中的不同行的可以有截然不同的列

## 面试题
### HBase和Mysql的区别

 MySQL | HBase
---|---
关系型数据库|NoSql数据库
面向行|面向列
表不稀疏|表很稀疏
有很多的数据类型|数据类型只有字节数据Byte[]
表具有一定模式|表没有固定的模型，可以任意添加列
支持事务|不支持事务
支持索引|不支持索引
支持条件查询|不支持条件查询
具有各种函数和表连接操作|不支持函数和表连接

### Hbase与Hive的对比
-|Hbase|Hive
---|---|---
类型|列式存储数据库|数据仓库
内部机制|数据库引擎|MapReduce
增删改查|支持|默认不支持（需要开启事务）
Schema|只需要事先定义列簇|需要定义表格式
引用场景|实时分析|离线分析
特点|上文|类SQL


### Hbase的使用场景

- 半结构化数据和非结构化数据，可以进行动态扩展。
- 记录非常的稀疏。
- 多版本数据。
- 超大数据容量：HBase会自动水平切分扩展，跟Hadoop的无缝集成保证了其数据的可靠性和海量数据分析的高性能。

### Hbase的rowkey设计原则

- rowkey长度原则：rowkey是一个二进制流，长度开发者建议是10-100字节，不过建议越短越好，最好不超过16字节。数据持久化文件HFile中是按照按照key/value存储的，如果rowkey太长的话就会影响HFile的存储效率。Memstore将缓存数据到内存，如果rowkey字段过长内存的有效利用会降低，系统将会无法缓存更多的数据，降低检索的效率。

- rowkey散列原则：如果rowkey是按照时间戳方式递增的话，不要将时间放在二进制码的前面，建议将rowkey的高位作为散列字段，如果没有散列字段就会出现一个regionServer上堆积的热点现象。

- rowkey的唯一原则：rowkey不能为空且唯一。

### Hbase的cell结构

什么是Hbase中的cell：Hbase中通过row和columns确定一个存贮单元成为cell，cell由{rowkey， column（=<列簇> + <列名>，version）}构成。

Hbase中表示行的集合，行是列族的集合，列族是列的集合，列是键值对的集合
{% asset_img Hbase表.png Hbase表.png %}

### Hbase的读写流程（重点！！！）

#### HBase的读流程：
1. 在HRegisonServer上存储着HBase的元数据（meta）信息和数据信息。首先cli先访问zk，访问ROOT表。在zk上获取元数据表所在的位置信息。找到这个meta表在哪个HRegionServer上面保存着。
2. 接着cli访问元数据所在的HRegionServer，获取元数据信息。
3. 通过元数据信息访问对应的数据所在的HRegionServer。
4. 然后扫描数据所在的HRegionServer的Memstore，然后再扫描StoreFile来查询数据。
5. 最后把HRegionServer把数据反馈给client。

#### HBase的写流程：
1. 在HRegisonServer上存储着HBase的元数据（meta）信息和数据信息。首先cli先访问zk，访问ROOT表。在zk上获取元数据表所在的位置信息。找到这个meta表在哪个HRegionServer上面保存着。
2. 确定当前要写入的HRegion和HRegionServer。
3. clinet向HRegionServer发出写相应的请求，HRegionServer收到请求并响应。
4. client现将数据写入在HLog，以防数据丢失。
5. 然后将数据写入到MemStore中。
6. 如果HLog和MemStore都写入成功了，那么表示这个条数据写入成功了。
7. 如果MemStore写入的数据达到了阈值，那么将会flush到StoreFile中。
8. 当StoreFile越来越多，会触发Compact合并操作，将过多的StoteFile合并成一个大的StoreFile。（默认好像是3个）
9. 当StoreFile越来越多时，Region也会越来越大，当达到阈值时，会触发spilit操作，将这个Region一分为二。（默认会越来越大，所以实现分区会更好）
> HBase中所有的更新和删除操作都会在后续的compact中进行，使得用户的写操作只需要进入内存中就行了。实现了HBase的 I/O高性能。

### Hbase的结构

#### HMaster
1. 为所有的RegionServer分配Region。
2. 负责RegionServer的负载均衡。
3. 发现失效的RegionServer并重新分配其上的Region。
4. 处理HDFS上的垃圾文件。
5. 处理Schema更新请求（表的创建，删除，修改，列族的增加等）。

#### HRegionServer

1. HRegion

简介：Table在行的方向上分隔为多个Region，Region是HBase中分布式存储和负载均衡的最小单元，即不同的Region可以分在不同的RegionServer上面，但同一个Region是不会拆分到多个Server上面的。随着数据的增多，某个列族的达到一个阈值就会分成两个新的Region。结构：<表名，startRowkey，创建时间>，由目录表（ROOT，META）记录该Region的endRowkey

2. Store

简介：每一个Region由一个或则多个Store组成，至少是一个Store，HBase会把访问的数据存放在Store中，即每一个列族建一个Store，如果有多个ColumnFamily，就多多个Store，一个Store由一个MemStore和0或则多个StoreFile组成。HBase通过Store的大小判断是否需要切分Region。

3. MemStore

它是放在内存中的，保存修改的数据，即key/values。当MemStore的大小达到一定的阈值的时候（默认128M），MemStore会被Flush到文件，即生成一个快照StoreFile，Flush过程由一个线程完成。

4. StoreFile

StoreFile底层是HFile，HFile是Hadoop的二进制格式文件，

5. HLog

WAL文件，用来灾难恢复使用，HLog记录数据的所有变更，一旦RegionServer宕机，就从HLog中进行恢复，HLog文件就是一个普通的Hadoop Sequence File，Sequence File记录了写入数据的归属信息，除了Table和Region名字外，还同时包括了Sequence Number和TimeStamp，Sequence File的value是HBase的key/value对象，即对应的HFile中的key/value。

#### Zookeeper

1. 保证任何时候集群中只有一个活跃的Master。

2. 存储所有的Region的寻址入口，知道哪个Region在哪台机器上。

3. 实时监控RegionServer的状态，将RegionServer的上下线的信息汇报给HMaster，RegionServer不直接向HMaster汇报信息，减轻HMaster的压力，而是通过向ZK发送信息。

4. 存储HBase的元数据结构（schema），知道集群中有哪些Table，每个Table有哪些Column Family。

### Hbase中的Compact机制

1. 当HBase中的memstore数据flush到磁盘的时候，就会形成一个storefile，当storefile的数量达到一定程度的时候，就需要将storefile文件进行compaction操作，Compact作用：合并文件、清楚过期，多余版本数据、提高读写效率。


2. compact操作的实现：①minor：Minor 操作只用来做部分文件的合并操作以及包括 minVersion=0 并且设置 ttl 的过期版本清理，不做任何删除数据、多版本数据的清理工作。②major：Major 操作是对 Region 下的HStore下的所有StoreFile执行合并操作，最终的结果是整理合并出一个文件。

### Hbase中的优化

1. 增加RPC的数量。通过修改hbase-site.xml中的hbase.regionserver.handler.count属性可以适当的放大RPC数量，默认是10。

2. [预设分区](https://blog.csdn.net/javajxz008/article/details/51913471)：
可以有效控制数据倾斜

3. 其他优化方法：
- - 减少调整：可以调整region和HFile。因为region的分裂会导致I/O开销，如果没有预设分区的话，随着region中条数的增，region会进行分裂，解决方法就是根据rowkey设计来进行预建分区，减少region的动态分裂。HFile会随着memstore进行刷新时生成一个HFile，当HFile增加到一定量的时候，会将属于一个region的HFile合并，HFile是不可避免的，但是如果HFile大于设置得值，就会导致HFile分裂，这样就会导致I/O的开销增大。

- - 减少启停：对于HBase会有compact机制，会合并HFile，但是我们可以手动关闭compact，减少I/O。如果是批量数据的写入，我们可以用BulkLoad来批量插入数据。

- - 合理设计：rowkey的设计：（散列性、简短性、唯一性、业务性），列族的设计：（多列族的优势是：在进行查表的时候，只需要扫描那一列就行了，就不需要全盘扫描，减少I/O，劣势是：降低了写的I/O，原因是：数据写到stroe以后会缓存到memstore中.）

### Hbase数据倾斜问题（我的想法）
我的想法：感觉主要是存储的数据倾斜问题。
跟key值的设计有关。
1. 先抽样一部分数据，对数据的key做hash处理，生成的hash值。
2. 观察数据的分布情况设置分区
3. 对每一个key使用‘_’进行拼接：hash值_key