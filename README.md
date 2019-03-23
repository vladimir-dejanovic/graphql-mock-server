# graphql-mock-server
Simple Graphql mock sever you just need to provide your schema


to create docker image
```
$ docker build -t mock_graph .

```

Replace content of  *data/mock.schema* with your schema and then just start mock server

To start graphql mock server run
```
$ docker run --rm -d -p 8000:8000 -v `pwd`/data:/opt/data:ro --name <name you want> mock_graph
```

Now from browser hit http://localhost:8000/ and have fun