---
title: shiro
date: 2018-12-26 09:39:02
tags: shiro
categories: ["java","shiro"]
---

### 简介
Apache shiro是一个开源的安全框架，主要用于清晰的处理包括验证（authentication）、授权（authorization）,企业session管理以及加密（cryptography）


可以使用shiro实现以下功能

* 验证用户的身份
* 实现对用户的接入权限
    取决于用户被分配的角色
    取决于用户做某些事的权限
* 在环境中使用会话API管理，不仅仅是在web或者EJB容器
* 在验证、授权、以及session的整个生命周期中是事件驱动的
* 可以整合一个或者多个数据源的用户数据，对外提供一个复合用户
* 可以实现单点登录功能 SSO
* 可以实现 remember me功能在用户登录时候

2018-8-17-1.png

```
Authencation :主要为了验证你说的是不是你
Authorization :主要为了接入授权，例如你有没有权限做某些事，有没有角色等
Cipher : 秘钥，分为对称加密，或者非对称加密
Credential : 凭证，一个凭证是一系列关于验证用户、subjcet的身份信息，一个或多个凭证可以在当事人验证并且尝试核对用户/subject提交的真实信心，凭证通常是一个用户或者subject的加密的东西，例如密码等

Cryptography :加密是一个在不希望发生的接入中保护信息隐藏或者转换，在shiro中，加密分为两部分，一部分是使用秘钥来保证数据传输中的加密以及使用hash在不可逆转的场景中实现，例如密码

Permission : 一个权限应该描述为：程序能做什么而不是人们能进行的操作
，一个权限应该是安全策略中最低级别的构造。一个权限可以理解为
 打开文件
 展示网页 /hello/index.do
 打印文档
 删除某某用户

Principal :一个Principal是subject的辨别属性，在系统中，看起来像是一个用户名，一个名称，一个社会序列号等

shiro中的subject通常是一个主要的principal

Reaml : 可以理解系统中接入安全相关的数据：例如 用户、角色以及权限，你一认为它是DAO (数据接入对象)，通常reaml是将数据转换成shiro理解的数据，数据源也就是授权或者验证的数据通常来自于文件、RDB、或者JPA等


Role : 定义个角色是比较模糊的概念，shiro通常解释角色是一个权限或者命名的集合。


Session :  一个session是一个有状态的数据上下文，通常是一个用户/subject与软件系统在一段时间的交互，当一个subject使用应用，以及应当需要的时候使用，数据在session中可以被添加、读写、删除

subject ： 一个subject定义是一个应用用户安全特定的展示对象，一个subject不总是需要反映一个用户所想的，它可能表示的是一个额外的进程调用你的应用程序，或者后台系统账户间断的执行一个任务（例如crontab）

```


### SecurityManager
shiro鼓励围绕subject编程，大部分应用开发者不用直接与Secur
ity交互，但是了解Security也是有用的

```
Authentication
Authorization
Session management
Realm coordination
Event propagation
remember me service
subject creation
logout and more
```

Security manager是上面这些模块的容器，统一负责调配，使用委托模式，包装或者嵌套服务模块

因此这些模块也是很容易自定义配置的。




