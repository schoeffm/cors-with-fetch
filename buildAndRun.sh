#!/bin/sh
mvn clean package && docker build -t schoeffm/cors .
docker rm -f cors-client || true \
    && docker rm -f cors-server || true \
    && docker run -d -p 8080:8080 --name cors-server schoeffm/cors \
    && docker run -d -p 8081:8080 --name cors-client schoeffm/cors
