FROM airhacks/payara
COPY ./target/debugger.war ${DEPLOYMENT_DIR}
