var config = require('./../bin/listener-config'),
    http = require('http');

var data = JSON.stringify({
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
            "user_agent": "Chrome/13.0.782.112"
        }
    }),
    options = {
        hostname: config['server']['host'],
        port: config['server']['http-port'],
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(data);
req.end();