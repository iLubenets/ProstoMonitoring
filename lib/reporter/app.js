var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var Database = require('./database');

exports.start = function start(config) {
    var database = new Database(config.database);
    var handlers = {
        event:       new (require('./handlers/event-handler'))(database),
        application: new (require('./handlers/application-handler'))(database)
    };

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // Errors
    app.use(function (err, req, res, next) {
        console.log(err.name);
        if (err.name == "ValidationError") {
            res.send(400, err);
        } else {
            next(err);
        }
    });
    app.use(function (err, req, res, next) {
        res.send(500, err);
    });
    app.use(express.static(__dirname + '/public'));

    routes.setup(app, handlers);

    app.listen(config.server.port, function () {
        console.info("App running on port:" + config.server.port);
    });
};