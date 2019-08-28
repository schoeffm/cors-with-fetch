#!/bin/sh
mvn clean package && docker build -t com.bmw/debugger .
docker rm -f debugger || true && docker run -d -p 8080:8080 -p 4848:4848 --name debugger com.bmw/debugger 
