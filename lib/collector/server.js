var http = require("http");
var dgram = require("dgram");
var Event = require("./event");
var EventStream = require("./event-stream");
var Database = require("./database");

function start(config) {
    var database = new Database(config['pg-connection-string']);
    var stream = new EventStream(database, config['cached-event-num']);

    // HTTP server start, always
    var server = http.createServer();
    server.on("request", function (request, response) {
        request.setEncoding("utf8");
        var content = "";
        request.on("data", function (chunk) {
            content += chunk;
        });
        request.on("end", function () {
            // Add event to stream
            stream.put(new Event(content));

            response.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            response.write('{"status":"ok"}');
            response.end();
        });
    });
    server.listen(config["http-port"]);

    //UDP, starting when "udp-port" is defined
    var udp = dgram.createSocket("udp4");
    udp.on("message", function (content) {
        // Add event to stream
        stream.put(new Event(content));
    });
    udp.bind(config["udp-port"]);

    console.log("Collector server has started.");
}

exports.start = start;
