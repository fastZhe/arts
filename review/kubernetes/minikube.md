## 启动minikube
```
# 启动
minikube start

# 查看minikube 版本
minikube version

#查看kubectl 版本
kubectl version

# 获取集群信息
kubectl cluster-info

# 获取所有的节点，节点状态为ready 表示节点已经准备好等待部署应用了
kubectl get nodes 


# 开启kubernetes 代理
kubectl proxy


# 获取pod name
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME


# 获取应用运行在哪个pods
curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/


#获取 pods
kubectl get pods

# 描述pods 获取该pods的ip并且查看pods生命周期的相关事件
kubectl describe pods

# 列出pod环境变量 
kubectl exec $POD_NAME env


# 在pod container中开启bash session
kubectl exec -ti $POD_NAME bash

--------------------------------------------

#获取所有的service
kubectl get services

# create a new service and expose it to external traffic ，使用NodePort访问策略，暴露端口为8080，并创建了一个kubernetes-bootcamp的service
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

# 获取service的描述，发现暴露的端口
kubectl describe services/kubernetes-bootcamp


# 从service中获取node 端口
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')

# 获取deployment 默认的lable与selector
kubectl describe deployment

# 通过lable获取pods  -l指定lable
kubectl get pods -l run=kubernetes-bootcamp

# 通过lable 获取service
kubectl get services -l run=kubernetes-bootcamp

# 重新给pod链接一个标签
kubectl label pod $POD_NAME app=v1

# 通过lable 删除service
kubectl delete service -l run=kubernetes-bootcamp


--------------------------------------------伸缩


# 将deployments/kubernetes-bootcamp伸缩成4份
kubectl scale deployments/kubernetes-bootcamp --replicas=4


he DESIRED state is showing the configured number of replicas

The CURRENT state show how many replicas are running now

The UP-TO-DATE is the number of replicas that were updated to match the desired (configured) state

The AVAILABLE state shows how many replicas are actually AVAILABLE to the users

# 获取部署  ready 左边为current  右边为希望的   up-to-date 表示希望有的，AVAILABLE，表示真实可用
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4/4     4            4           65s


# 设置新的容器镜像，会实现滚动更新
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2

# 获取所有的pods
kubectl get pods


# 查看对应service的滚动更新状态
kubectl rollout status deployments/kubernetes-bootcamp

# 滚动更新回滚
kubectl rollout undo deployments/kubernetes-bootcamp





# Apply the Redis Master Deployment from the redis-master-deployment.yaml file:
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-deployment.yaml


# 查看pod日志
kubectl logs -f POD-NAME



# 通过lable选择器  使用 等号 !=  
kubectl get pods -l environment=production,tier=frontend


# 通过lable  in,notin and exists
kubectl get pods -l 'environment in (production),tier in (frontend)'
kubectl get pods -l 'environment in (production, qa)'
kubectl get pods -l 'environment,environment notin (frontend)'



kubectl diff -f configs/
kubectl apply -f configs/
Recursively process directories:

kubectl diff -R -f configs/
kubectl apply -R -f configs/


```


