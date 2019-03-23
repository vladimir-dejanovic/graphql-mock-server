import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')

const fs = require('fs');
var schema_file;

fs.readFile('/opt/data/mock.schema', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    mockServer(data) ;
});

const defSchema = 'query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...Ty…} fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }';

function mockServer(schemaString) {
    const schema = makeExecutableSchema({ typeDefs: schemaString});
    addMockFunctionsToSchema({ schema});

    var http = require('http');
    var serve = serveStatic('/opt/src/static', {'index': ['index.html']})

    var server = http.createServer(function (request, response) {
        var url = request.url;

        if(url.startsWith("/graphql")) {
            let data = []

            request.on('data', chunk => {
                data.push(chunk)
            });

            request.on('end', () => {
                var obj = JSON.parse(data);

                if(JSON.stringify(obj.query) == defSchema) {
	                response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify(schemaString));
                } else {
                    graphql(schema, obj.query).then((result) => {
	                    response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify(result));
                    });
                }
            });
        } else {
            if(request.url === '') {
                request.url = "index.html";
            }

            serve(request, response, finalhandler(request, response));
        }
    });

    // Listen on port 8000, IP defaults to 127.0.0.1
    server.listen(8000);

    // Put a friendly message on the terminal
    console.log("Server running at http://127.0.0.1:8000/");
}