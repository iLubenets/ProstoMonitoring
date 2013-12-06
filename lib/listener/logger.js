var nodemailer = require("nodemailer");

/**
 * Wrapper log functions.
 * @param mailer
 * @constructor
 */
module.exports = function Logger(mailer) {

    /**
     * Critical error lvl. Send mail.
     * @param message
     */
    this.critical = function(message){
        var errorText = "Critical error: " + message;
        console.log(errorText);
        mailer.sendError(errorText);
    };

    /**
     * Error lvl. Only console log.
     * @param message
     */
    this.error = function(message){
        var errorText = "Error: " + message;
        console.log(errorText);
    };

    /**
     * Debug lvl. Only console log.
     * @param message
     */
    this.debug = function(message){
        console.log(message);
    };
};