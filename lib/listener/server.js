var http = require("http");
var dgram = require("dgram");
var EventFactory = require("./event-factory");
var EventStream = require("./event-stream");
var Database = require("./database");

function start(config) {
    var database = new Database(config['database']);
    var stream = new EventStream(database, config.event['cached-event-num']);
    var eventFactory = new EventFactory(config.event['default-event'], config.event['custom']);
    var server = http.createServer();

    // HTTP server
    server.on("request", function (request, response) {
        request.setEncoding("utf8");
        var content = "";
        request.on("data", function (chunk) {
            content += chunk;
        });
        request.on("end", function () {
            // Add event to stream
            stream.put(eventFactory.getEvent(content));

            response.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            response.write('{"status":"ok"}');
            response.end();
        });
    });
    server.listen(config.server["http-port"]);

    // UDP
    var udp = dgram.createSocket("udp4");
    udp.on("message", function (content) {
        // Add event to stream
        stream.put(eventFactory.getEvent(content));
    });
    udp.bind(config.server["udp-port"]);

    console.log("Listener server has started.");
}

exports.start = start;
