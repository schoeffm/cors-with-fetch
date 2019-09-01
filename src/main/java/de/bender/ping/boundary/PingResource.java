package de.bender.ping.boundary;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@Path("ping")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PingResource {

    @GET
    public Response ping() {
        final JsonObject build = Json.createObjectBuilder()
                .add("id", 1)
                .add("name", "FooBar")
                .build();

        return Response
                .ok(build)
                .cookie(new NewCookie("CORS-Cookie", "CookieValue for CORS-Tests"))
                .build();
    }
}