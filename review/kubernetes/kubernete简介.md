## kubernetes 简介


>Containerized applications are more flexible and available than in past deployment models, where applications were installed directly onto specific machines as packages deeply integrated into the host

容器应用通常比过去部署的应用模型更加具有可伸缩与高可用的特性，传统的应用通常直接安装在特定的机器上，应用被打包并且深度整合到主机上。

>Kubernetes automates the distribution and scheduling of application containers across a cluster in a more efficient way.

kubernetes 全自动化的通过一种更有效的方式在集群上进行分布式部署与调度应用容器



kubernetes 分为两部分
![image](https://ws4.sinaimg.cn/large/cbe52eb6ly1g1h51du93ij20sw0msafi.jpg)


* master节点：主要负责协调整个集群

>The Master is responsible for managing the cluster. The master coordinates all activities in your cluster, such as scheduling applications, maintaining applications' desired state, scaling applications, and rolling out new updates.

主要负责管理集群，master主要协调所有在线的集群、例如调度应用、maintaining应用希望的状态，伸缩应用，以及滚动更新

* node节点：

>A node is a VM or a physical computer that serves as a worker machine in a Kubernetes cluster. Each node has a Kubelet, which is an agent for managing the node and communicating with the Kubernetes master. The node should also have tools for handling container operations, such as Docker or rkt. A Kubernetes cluster that handles production traffic should have a minimum of three nodes.

一个node在集群中就是由一个虚拟机VM或者一个物理机服务作为一个work，每个node都有kubelet，这是一个管理集群并与kubernetes master节点进行通讯的代理。node应该有处理容器操作的工具，例如docker或者rkt，一个kubernetes集群，处理生产传输应该最少有三个节点


>When you deploy applications on Kubernetes, you tell the master to start the application containers. The master schedules the containers to run on the cluster's nodes. The nodes communicate with the master using the Kubernetes API, which the master exposes. End users can also use the Kubernetes API directly to interact with the cluster.

当你在kubernetes部署应用，你告诉master节点开启应用容器，master节点调度容器在集群中的node节点上运行。node节点通过使用master节点暴露出来的kubernetes APi与master节点进行交互。终端用户也可以使用Kubernetes API直接与集群进行交互。



>A Kubernetes cluster can be deployed on either physical or virtual machines. To get started with Kubernetes development, you can use Minikube. Minikube is a lightweight Kubernetes implementation that creates a VM on your local machine and deploys a simple cluster containing only one node. Minikube is available for Linux, macOS, and Windows systems. The Minikube CLI provides basic bootstrapping operations for working with your cluster, including start, stop, status, and delete. For this tutorial, however, you'll use a provided online terminal with Minikube pre-installed.

一个kubernetes 集群可以部署在物理机与虚拟机中的任何一个。为了开始kubernetes部署，你可以使用Minikube，Minikube是一个轻量级的kubernets实现，它在你本地集群创建了一个虚拟机。并且部署了一个简单的集群，该集群仅包含一个node节点。Minikube是一个可用于Linux、macOS、Windows系统。Minikube CLI（command-line interface，即命令行界面）提供用于操作集群基础的引导操作，包含：开启、停止、状态、删除。




* Kubernetes Pods

>Pods that are running inside Kubernetes are running on a private, isolated network. By default they are visible from other pods and services within the same kubernetes cluster, but not outside that network. 
Pods 通常运行在kubernetes 内部，运行基于一个私有的、隔离的网络。默认在同一个kubernetes集群中他们对于其他pods与service是可见的。但是对于集群外部是不可见的

>When you created a Deployment in Module 2, Kubernetes created a Pod to host your application instance. A Pod is a Kubernetes abstraction that represents a group of one or more application containers (such as Docker or rkt), and some shared resources for those containers. Those resources include:

当你创建一个部署时（即部署一个应用的时候），kubernetes将创建一个pod去管理你的应用实例，一个Pod是kubernetes 抽象出来的代表一组一个或者多个应用容器，并且共享这些容器的资源。这些资源包括：

1. Shared storage, as Volumes     共享存储，作为Volumes
2. Networking, as a unique cluster IP address    网络，为集群独一无二的ip地址
3. Information about how to run each container, such as the container image version or specific ports to use 
关于怎么样运行每个容器的信息，例如容器镜像的版本，或者特定使用的端口等

Pod为特定于应用程序的“逻辑主机”建模，并且可以包含相对紧密耦合的不同应用程序容器。例如，Pod可能既包含带有Node.js应用程序的容器，也包含一个不同的容器，用于提供Node.js网络服务器要发布的数据。Pod中的容器共享IP地址和端口空间，始终位于同一位置并共同调度，并在同一节点上的共享上下文中运行。

Pod是Kubernetes平台上的原子单元。当我们在Kubernetes上创建部署时，该部署会在其中创建包含容器的Pod（而不是直接创建容器）。每个Pod都与调度它的节点绑定，并保持在那里直到终止（根据重启策略）或删除。如果节点发生故障，则会在群集中的其他可用节点上调度


* service 概述


Kubernetes Pods是会结束的。事实上，Pod有一个生命周期。当工作节点死亡时，节点上运行的Pod也会丢失。然后，ReplicaSet可以通过创建新Pod来动态地将群集驱动回所需状态，以使应用程序保持运行。作为另一个示例，考虑具有3个副本的图像处理后端。那些复制品是可以交换的; 前端系统不应该关心后端副本，即使Pod丢失并重新创建。也就是说，Kubernetes集群中的每个Pod都有一个唯一的IP地址，甚至是同一节点上的Pod，因此需要有一种方法可以自动协调Pod之间的更改，以便您的应用程序继续运行。


Kubernetes中的service是一个抽象，它定义了一组逻辑Pod和一个访问它们的策略。service允许从属Pod之间的松散耦合。与所有Kubernetes对象一样，使用YAML （首选）或JSON 定义服务。service所针对的Pod集合通常由LabelSelector确定（请参阅下文，了解您可能需要service而不包含selector在规范中的原因）。

尽管每个Pod都具有唯一的IP地址，但如果没有service，这些IP不会在群集外部公开。service允许您的应用程序接收流量。通过type在ServiceSpec中指定 ，可以以不同方式公开服务：

>ClusterIP (default) - Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.   这种类型只能使得ip在集群内部使用
NodePort - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using <NodeIP>:<NodePort>. Superset of ClusterIP.      通过使用NAT，可以通过node的ip与port
LoadBalancer - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.     负载均衡在当前的云中。并且分配一个混合的额外的ip
ExternalName - Exposes the Service using an arbitrary name (specified by externalName in the spec) by returning a CNAME record with the name. No proxy is used. This type requires v1.7 or higher of kube-dns.


![image](https://ws4.sinaimg.cn/large/cbe52eb6ly1g1hf8p5p15j20tu0w8dk9.jpg)


![image](https://wx1.sinaimg.cn/large/cbe52eb6ly1g1hf9316wej20te0ti78m.jpg)

>A Service routes traffic across a set of Pods. Services are the abstraction that allow pods to die and replicate in Kubernetes without impacting your application. Discovery and routing among dependent Pods (such as the frontend and backend components in an application) is handled by Kubernetes Services.

一个service将会路由运输到一系列的pod。services是抽象的，它允许pod死亡并且在不影响你的应用同时在kubernetes中进行复制。发现与路由依赖于pods，pods主要由kubernets service处理

>Services match a set of Pods using labels and selectors, a grouping primitive that allows logical operation on objects in Kubernetes. Labels are key/value pairs attached to objects and can be used in any number of ways:

services 通过使用labels（标签）与selectors（选择器）匹配一系列的pods，一个分组的原语，将允许在kubernetes的对象上进行逻辑操作，labels是一个key-val对
，labels用于一些方式被连接到对象上，


Designate objects for development, test, and production    用于开发、测试、生产的设计对象
Embed version tags          嵌入的版本标签
Classify an object using tags       使用tags对对象进行分类


minikube does not support the LoadBalancer option yet



```
application/deployment.yaml 

apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```


## lables

参考：
```
https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
```


set-based requirements  基于集合的要求

equality-based requirements    基于平等的要求

新的资源匹配支持基于集合的要求


```
# 正确使用的lable
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: mysql
    app.kubernetes.io/instance: wordpress-abcxzy
    app.kubernetes.io/version: "5.7.21"
    app.kubernetes.io/component: database
    app.kubernetes.io/part-of: wordpress
    app.kubernetes.io/managed-by: helm


selector:
  matchLabels:
    component: redis
  matchExpressions:
    - {key: tier, operator: In, values: [cache]}
    - {key: environment, operator: NotIn, values: [dev]}
```


## Field selector
```
kubectl get pods --field-selector status.phase=Running
kubectl get pods --field-selector=status.phase!=Running,spec.restartPolicy=Always

#多个数据类型
kubectl get statefulsets,services --field-selector metadata.namespace!=default


## kubernetes 对象管理

* 命令式命令 imperative 
* 命令式配置 imperative config
* 声明式配置 declarative config

```

Examples
Run an instance of the nginx container by creating a Deployment object:

kubectl run nginx --image nginx
Do the same thing using a different syntax:

kubectl create deployment nginx --image nginx


Trade-offs  权衡
Advantages compared to object configuration:

Commands are simple, easy to learn and easy to remember.
Commands require only a single step to make changes to the cluster.
Disadvantages compared to object configuration:

Commands do not integrate with change review processes.
Commands do not provide an audit trail associated with changes.
Commands do not provide a source of records except for what is live.
Commands do not provide a template for creating new objects.
Imperative object configuration




Trade-offs 命令式、声明式、文件、命令相关的优缺点
Advantages compared to imperative commands:

Object configuration can be stored in a source control system such as Git.
Object configuration can integrate with processes such as reviewing changes before push and audit trails.
Object configuration provides a template for creating new objects.
Disadvantages compared to imperative commands:

Object configuration requires basic understanding of the object schema.
Object configuration requires the additional step of writing a YAML file.
Advantages compared to declarative object configuration:

Imperative object configuration behavior is simpler and easier to understand.
As of Kubernetes version 1.5, imperative object configuration is more mature.
Disadvantages compared to declarative object configuration:

Imperative object configuration works best on files, not directories.
Updates to live objects must be reflected in configuration files, or they will be lost during the next replacement.





Examples
```
Create the objects defined in a configuration file:

kubectl create -f nginx.yaml
Delete the objects defined in two configuration files:

kubectl delete -f nginx.yaml -f redis.yaml
Update the objects defined in a configuration file by overwriting the live configuration:

kubectl replace -f nginx.yaml

```

* 创建Object
run: Create a new Deployment object to run Containers in one or more Pods.
expose: Create a new Service object to load balance traffic across Pods.
autoscale: Create a new Autoscaler object to automatically horizontally scale a controller, such as a Deployment.

* 更新Object
scale: Horizontally scale a controller to add or remove Pods by updating the replica count of the controller.
annotate: Add or remove an annotation from an object.
label: Add or remove a label from an object.

* 删除
delete <type>/<name>


* 查看
get: Prints basic information about matching objects. Use get -h to see a list of options.
describe: Prints aggregated detailed information about matching objects.
logs: Prints the stdout and stderr for a container running in a Pod.


* 修改
 使用set命令在创建前修改 Using set commands to modify objects before creation
kubectl create service clusterip my-svc --clusterip="None" -o yaml --dry-run | kubectl set selector --local -f - 'environment=qa' -o yaml | kubectl create -f -

The kubectl create service -o yaml --dry-run command creates the configuration for the Service, but prints it to stdout as YAML instead of sending it to the Kubernetes API server.
The kubectl set selector --local -f - -o yaml command reads the configuration from stdin, and writes the updated configuration to stdout as YAML.
The kubectl create -f - command creates the object using the configuration provided via stdin.

使用edit编辑
kubectl create service clusterip my-svc --clusterip="None" -o yaml --dry-run > /tmp/srv.yaml
kubectl create --edit -f /tmp/srv.yaml