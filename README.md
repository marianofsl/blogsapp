K8s in Linux
## Requirements
- Docker
- minikube

### Docker
Just install Docker, follow official doc (install rootless docker).
To build a image:
- eval $(minikube -p minikube docker-env)
- docker build -t <TAG> .

### Minikube
Official doc in: https://minikube.sigs.k8s.io/docs/start/
I additional run this commands to make it work on my Ubuntu:
- ```sudo minikube start```

To create a pod:
```sudo minikube kubectl apply -- -f <FILE.yaml>```