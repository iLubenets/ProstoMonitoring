// Node modules
var http = require("http");
var dgram = require("dgram");
var moment = require('moment');
// Monitoring classes
var EventFactory = require("./event-factory");
var EventStream = require("./event-stream");
var Database = require("./database");
var Mailer = require("./mailer");
var Logger = require("./logger");

/**
 * Server start
 * @param config
 */
exports.start = function start(config) {
    var mailer = new Mailer(config.mailer);
    var logger = new Logger(mailer);
    var database = new Database(config.database, logger);
    var stream = new EventStream(database, config.event['cached-event-num'], logger);
    var eventFactory = new EventFactory(config.event['default-event'], config.event['custom'], logger);

    /**
     * Http Server
     */
    var server = http.createServer();
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

    /**
     * Udp listener
     * @type {*}
     */
    var udp = dgram.createSocket("udp4");
    udp.on("message", function (content) {
        // Add event to stream
        stream.put(eventFactory.getEvent(content));
    });
    udp.bind(config.server["udp-port"]);

    // Server start debug message
    var startTime = moment().format("YYYY-MM-DDTHH:mm:ssZZ");
    logger.debug("[" + startTime + "] Listener server has started.");
};
