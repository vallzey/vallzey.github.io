---
title: mongodb关于用户的操作
tags:
  - mongodb
categories:
  - 数据库
date: 2018-07-04 08:48:32
updated: 2018-07-04 08:48:32
top: true
---


#### 用户认证

在使用的时候如果遇到没有权限使用这个数据库,说明你的用户没有权限,所以需要一个用户认证,认证这个用户拥有这个权限

> 注意:帐号是跟着库走的，所以在指定库里授权，必须也在指定库里验证(auth)。



```
> use admin
> db.auth('vallzey','密码')

```

#### 查看这个数据库下的所有用户


```
> show users
{
	"_id" : "admin.vallzey",
	"user" : "vallzey",
	"db" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}

```

#### 创建对应数据库的用户


```
db.createUser(
... {
... user:"testad",
... pwd:"test",
... roles:[{role:"dbAdmin",db:"test"}]
... }
... )

```
roles:[{role:"readWrite",db:"test"}]的意思是对对应的数据库创建对应的权限


#### 对用户进行授权


```
db.grantRolesToUser('testad',[{role:"readWrite",db:"test"}])
```


#### 删除用户

```
> db.dropUser('test')
true

```



#### 删除数据库

删除数据库要在对应的数据库中,而且该用户具有相应的用户权限

```
> db.dropDatabase()
{ "dropped" : "runoob", "ok" : 1 }
```



角色类型 | 角色名
---|---
数据库用户角色 | read、readWrite
数据库管理角色 | dbAdmin、dbOwner、userAdmin
集群管理角色 | clusterAdmin、clusterManager、clusterMonitor、hostManager
备份恢复角色 | backup、restore
所有数据库角色 | readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
超级用户角色 | root (dbOwner 、userAdmin、userAdminAnyDatabase)
内部角色 | __system

角色名 | 角色权限
---|---
Read | 允许用户读取指定数据库
readWrite | 允许用户读写指定数据库
dbAdmin | 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin | 允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin | 只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限
readAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限
root | 只在admin数据库中可用。超级账号，超级权限




