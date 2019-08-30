class RestRequester extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        customElements
            .whenDefined('rest-requester')
            .then(() => this.render());
    }

    render() {
        this.root.innerHTML = `
                <style type="text/css">
                    :host {
                        display: flex;
                        flex-direction: column;
                        min-width: 640px;
                        max-width: 50%;
                        font-family: Arial;
                    }
                    label { font-size: 0.8rem; }
                    fieldset { display: flex; flex-direction: column; }
                    fieldset > * + * { margin-top: 1rem; } 
                    textarea { font-family: monospace; min-width: 100%; font-size: 1.2rem; }
                    .labeled-field {
                        display: flex;
                        justify-content: space-between;
                    }
                    .labeled-field > input { width: 100%; }
                    .output {
                        font-family: monospace;
                        background: lightgray;
                        padding: 1rem;
                        border: 1px solid darkgray;
                        margin-top: 1rem;
                    }
                    input[type=submit] {
                        margin: 2rem;
                        background: darkblue;
                        color: white;
                        border-radius: 1rem;
                    }
                    hr { width: 100%; margin-top: 2rem; }
                </style>
                
                
                <fieldset>
                    <legend>Configure the Client Request:</legend>
                    <div class="labeled-field">
                        <label for="url">Request-URL: </label>
                        <input id="url" type="text" disabled value="http://localhost:8080/cors/resources/ping"/>
                    </div>
                    <textarea rows="5">
{
    "credentials": "include",
    "headers": {"Content-Type": "application/json"}
}
                    </textarea>                    
                </fieldset>
                <fieldset>
                    <legend>Configure the Server Response Header:</legend>
                    <div class="labeled-field">
                        <label for="origin">Access-Control-Allow-Origin: </label>
                        <input id="origin" type="text" value="http://localhost:8081"/>
                    </div>                    
                    <div class="labeled-field">
                        <label for="credentials">Access-Control-Allow-Credentials: </label>
                        <input id="credentials" type="text" value="true"/>
                    </div>
                    <div class="labeled-field">
                        <label for="headers">Access-Control-Allow-Headers: </label>
                        <input id="headers" type="text" value="origin, content-type, accept, authorization"/>
                    </div>
                    <div class="labeled-field">
                        <label for="methods">Access-Control-Allow-Methods: </label>
                        <input id="methods" type="text" value="GET, POST, PUT, DELETE, OPTIONS, HEAD"/>
                    </div>
                </fieldset>
                <input type="submit"/>
                <hr>
                <div class="output"></div>
            `;
        this._$input_url = this.shadowRoot.querySelector('input#url');
        this._$input_origin = this.shadowRoot.querySelector('input#origin');
        this._$input_headers = this.shadowRoot.querySelector('input#headers');
        this._$input_credentials = this.shadowRoot.querySelector('input#credentials');
        this._$input_methods = this.shadowRoot.querySelector('input#methods');
        this._$textarea = this.shadowRoot.querySelector('textarea');
        this._$submit = this.shadowRoot.querySelector('[type=submit]');
        this._$output = this.shadowRoot.querySelector('.output');
        this._$submit.onclick = (e) => this._fetch(this._$input_url.value, this._$textarea.value);
    }

    _fetch(url, configs) {
        const config = JSON.parse(configs);
        fetch(encodeURI(`${url}?origin=${this._$input_origin.value}&credentials=${this._$input_credentials.value}&headers=${this._$input_headers.value}&methods=${this._$input_methods.value}`), config)
            .then(response => response.json())
    .then(data => this._$output.innerHTML = JSON.stringify(data))
    .catch(err => this._$output.innerHTML = `${err}</p><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Functional_overview">JavaScript does not have access to CORS related errors</a> - open the console to inspect the actual issue with this CORS request!!`);
    }
}

customElements.define('rest-requester', RestRequester);