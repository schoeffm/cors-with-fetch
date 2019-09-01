package de.bender;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.stream.Collectors;

@Provider
public class LoggingFilter implements ContainerRequestFilter {
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        final String cookies = requestContext.getCookies()
                .entrySet().stream()
                .map(entry -> entry.getKey() + ": " + entry.getValue().toString())
                .collect(Collectors.joining("\n\t\t"));

        final String headers = requestContext.getHeaders()
                .entrySet().stream()
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining("\n\t\t"));

        System.out.println("Request: " +
                "\n\tMethod: " + requestContext.getMethod() +
                "\n\tCookies: " + cookies +
                "\n\tHeaders: " + headers);
    }
}
