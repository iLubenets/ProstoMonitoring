var express = require('express');
var path = require('path');
var routes = require('./routes');
var Database = require('./database');

exports.start = function start(config) {
    var database = new Database(config.database);
    var handlers = {
        event: new (require('./handlers/event-handler'))(database)
    };

    var app = express();
    app.configure(function () {
        app.use(express.favicon());
        app.use(express.logger('dev'));/* 'default', 'short', 'tiny', 'dev' */
        app.use(express.json());
        app.use(express.static(path.join(__dirname, "public")));
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
    });

    routes.setup(app, handlers);

    app.listen(config.server.port, function () {
        console.info("App running on port:" + config.server.port);
    });
};