FROM airhacks/payara
COPY ./target/cors.war ${DEPLOYMENT_DIR}
