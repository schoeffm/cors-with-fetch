# Simple app to demonstrate CORS

1. build and start the java-backend using the contained `buildAndRun.sh`-script - this will start a server listening on port `8080`
2. start a second server (i.e. use `npm install -g http-server`) which servers the `index.html` on a different port (i.e. `8081`)

       $> npm i -g http-server      # install a general purpose http-server globally
       $> cd src/main/webapp        # switch into the proper directory
       $> http-server -p 8081 .     # start serving the dir-content on port 8081

3. open `http://localhost:8081/index.html` and request the `ping`-resource from a different origin (here: `http://localhost:8080/debugger/resources/ping`)

At the server-side there is a CORS-filter available with the followin' settings 

    Access-Control-Allow-Origin : http://localhost:8081
    Access-Control-Allow-Credentials : true
    Access-Control-Allow-Headers : origin, content-type, accept, authorization
    Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS, HEAD

- `Access-Control-Allow-Origin`: can only be set to one specific origin which is allowed to fetch from this server. It can also be set to wildcard `'*'` but this value is __mutually exclusive__ to `"include"` credentials mode (which makes it useless when dealing with auth-cookies/headers).
- `Access-Control-Allow-Credentials`: _When a request's credentials mode (`Request.credentials`) is `"include"`, browsers will only expose the response to frontend JavaScript code if the `Access-Control-Allow-Credentials` value is `true` ([see here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials))_
- `Access-Control-Allow-Methods`: all allowed methods to fetch resources 
- `Access-Control-Allow-Headers`: _Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request._ Also allows wildcard `'*'` but again doesn't work with auth-cookies/header etc. 

Additionally, there's also a logging-filter which prints out the requests cookies (just to verify that the browser respects the `withCredentials`-flag)  

[fetch]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[XHR]:https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[cors]:https://developer.mozilla.org/en-US/docs/Glossary/CORS