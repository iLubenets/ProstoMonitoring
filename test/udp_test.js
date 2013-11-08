var dgram = require('dgram'),
    options = require('./../bin/listener-config'),
    message = new Buffer(JSON.stringify({
        "event": "request",
        "registered": "2011-09-12T21:33:12Z",
        "level": 100,
        "message": {
            "host": "web14",
            "path": "/search",
            "query": {
                "q": "flowers"
            },
            "duration_ms": 241,
            "status": 200,
            "level_name": "DEBUG"
        }
    }));

var client = dgram.createSocket("udp4");
var iteration = 10;
for (var i = 0; i < iteration; i++) {
    client.send(message, 0, message.length, options['udp-port'], "localhost", function (error, bytes) {
        if (error) console.log(error);
        else console.log( i +" Succes send! bytes: " + bytes);
        //client.close();
    });
}