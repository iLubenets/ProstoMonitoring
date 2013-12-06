var config = require("../bin/listener-config");
var Mailer = require("../lib/listener/mailer");
var mailer = new Mailer(config.mailer);

mailer.sendError('ProstoMonitoring test');