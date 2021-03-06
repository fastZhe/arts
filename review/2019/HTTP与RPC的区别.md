---
title: HTTP与RPC的区别以及HTTP2的新特性
date: 2019-03-04 08:36:02
tags: review
categories: ["review","java"]
---

## 区别

1.http跟一些私有rpc协议相比要重很多。运行时开销更大，HTTP需要提供多余的文本信息，需要自己实现序列化。
2.在同一个系统内可以省略很多约定熟成的内容。而http是一个对外的。anonymous的。需要提供更多额外信息。

## 对外服务：
    * Http 的话要先走dns 再走lvs 再走nginx 链路太长，可用性SLA指标太低
    * http是文本协议比其他用在rpc上的序列化 二进制协议 如 thrift protobuf等来说性能太低 ，会造成应用rt太高




## 概念

### rpc 
是remote procedure call，远程过程调用。只是一个服务调用另一个服务的概念。RPC是一种设计、实现框架，通讯协议只是其中一部分。RPC的本质是提供了一种轻量无感知的跨进程通信的方式，在分布式机器上调用其他方法与本地调用无异

建立通信：在客户端与服务端建立起数据传输通道，大都是TCP连接（gRPC使用了HTTP2）。

寻址：A服务器上的应用需要告诉RPC框架：B服务器地址、端口，调用函数名称。所以必须实现待调用方法到call ID的映射。

序列化与反序列化：由于网络协议都是二进制的，所以调用方法的参数在进行传递时首先要序列化成二进制，B服务器收到请求后要再对参数进行反序列化。恢复为内存中的表达方式，找到对应的方法进行本地调用，得到返回值。返回值从B到A的传输仍要经过序列化与反序列化的过程。


### HTTP
HTTP是应用层协议
相比RPC，HTTP接口开发也就是我们常说的RESTful风格的服务接口。的确，对于在接口不多、系统与系统交互较少的情况下，解决信息孤岛初期常使用的一种通信手段；优点就是简单、直接、开发方便。利用现成的http协议进行传输。做后台接口开发的时候，需要写一份接口文档，严格地标明输入输出是什么？说清楚每一个接口的请求方法，以及请求参数需要注意的事项等。

Restful web service是一种常见的rest的应用,是遵守了rest风格的web服务;rest式的web服务是一种ROA(The Resource-Oriented Architecture)(面向资源的架构)。为什么会出现


## 总结
为什么要用RPC呢
成熟的rpc库相对http容器，更多的是封装了“服务发现”，"负载均衡"，“熔断降级”一类面向服务的高级特性。良好的RPC针对服务的可用性与效率做了很多优化




## HTTP2的新特性
* 二进制传输
HTTP 1.X系列主要基于文本解析，因为文本解析天然存在多样性，采用二进制后实现方便且健壮。

* 多路复用
多个请求可以复用一个连接

* header压缩
在HTTP 1.X中header信息很多，每次都会重复发送，造成很大的浪费，HTTP2.0使用编码减少了传输的大小，并且通信的双方都缓存了一份header信息，此后数据会发送差异数据，避免信息的重复发送。

* 服务端推送
当一个客户端请求资源a，而服务端知道它很可能需要资源b，服务端会主动向客户端推送b，当然客户端可以拒收。