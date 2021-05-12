#!/bin/bash

#rm -rf *.tar

docker build --build-arg http_proxy="$http_proxy" --build-arg https_proxy="$https_proxy" -t nats-client-server:0.0.1 .

#docker run -it -p 6062:6062 nats-client-server:0.0.1

#docker save -o nats-client-server.tar nats-client-server:0.0.1

#chmod 777 *.tar