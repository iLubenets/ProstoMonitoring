var dgram = require('dgram'),
    options = require('./../bin/listener-config'),
    message = new Buffer(JSON.stringify({
        "event": "request",
        "registered": "2011-09-12T21:33:12Z",
        "level": 400,
        "exception": {
            "class": 'TestClass',
            "message" : "Test message",
            "file" : "test/Projects/ProstoMonitoring.js",
            "line" : "123"
        },
        "data": {
            "host": "web14",
            "path": "/search",
            "query": {
                "q": "flowers"
            },
            "duration_ms": 241,
            "status": 200,
            "level_name": "DEBUG"
        },
        "la": [1, 2, 3],
        "memory_usage": 10
    }));

var client = dgram.createSocket("udp4");
var iteration = 10;
for (var i = 0; i < iteration; i++) {
    client.send(
        message,
        0,
        message.length,
        options['server']['udp-port'],
        options['server']['host'],
        function (error, bytes) {
            if (error) console.log(error);
            else console.log(" Succes send! bytes: " + bytes);
            //client.close();
        }
    );
}