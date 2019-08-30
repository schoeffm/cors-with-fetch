package de.bender;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;
import java.util.List;

@Provider
@PreMatching
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(final ContainerRequestContext requestContext, final ContainerResponseContext responseContext) {

        String origin = getParamOrDefault(requestContext, "origin","http://localhost:8081");
        String credentials = getParamOrDefault(requestContext, "credentials","true");
        String headers = getParamOrDefault(requestContext, "headers","origin, content-type, accept, authorization");
        String methods = getParamOrDefault(requestContext, "methods","GET, POST, PUT, DELETE, OPTIONS, HEAD");

        responseContext.getHeaders().putSingle("Access-Control-Allow-Origin", origin);
        responseContext.getHeaders().putSingle("Access-Control-Allow-Credentials", credentials);
        responseContext.getHeaders().putSingle("Access-Control-Allow-Headers", headers);
        responseContext.getHeaders().putSingle("Access-Control-Allow-Methods", methods);
    }

    private String getParamOrDefault(ContainerRequestContext requestContext, String name, String defaultValue) {
        List<String> result = requestContext.getUriInfo().getQueryParameters().get(name);
        return (result != null && !result.isEmpty()) ? result.get(0) : defaultValue;
    }
}