var dgram = require('dgram'),
    options = require('./../bin/collector-config'),
    message = new Buffer(JSON.stringify({
        "type": "request",
        "time": "2011-09-12T21:33:12Z",
        "data": {
            "host": "web14",
            "path": "/search",
            "query": {
                "q": "flowers"
            },
            "duration_ms": 241,
            "status": 200,
            "user_agent": "Chrome/13.0.782.112"
        }
    })),
    client = dgram.createSocket("udp4");

client.send(message, 0, message.length, options['udp-port'], "localhost", function (error, bytes) {
    if (error) console.log(error);
    else console.log("Succes send! bytes: " + bytes);
    client.close();
});