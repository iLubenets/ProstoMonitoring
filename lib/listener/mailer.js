var nodemailer = require("nodemailer");
var fs = require('fs');
var moment = require('moment');

/**
 * Wrapper nodemailer module.
 * @param config
 * @constructor
 */
module.exports = function Mailer(config) {
    var transport = getTransport();

    /**
     * Get transport by type in config
     * @returns {*}
     */
    function getTransport(){
        if(config['transport'] == 'gmail'){
            return nodemailer.createTransport("SMTP", config['smtp_options']);
        } else if (config['transport'] == 'sendmail'){
            return nodemailer.createTransport("sendmail");
        }
    }

    /**
     * Send mail
     * @param mailOptions
     */
    function sendMail(mailOptions){
        if(config['save_to_file']){
            if(!fs.lstatSync('emails').isDirectory()){
                fs.mkdir('emails', function(error) {
                    console.log(error);
                });
            }
            var fileName = 'emails/mail_' + moment().format("YYYY-MM-DDTHH:mm:ss") + '.txt';
            fs.writeFileSync(fileName, JSON.stringify(mailOptions));
        } else {
            transport.sendMail(mailOptions, function(error, responseStatus){
                if(error){
                    console.log(error);
                }
            });
        }
    }

    /**
     * Send error mail to debug user list.
     * @param text
     */
    this.sendError = function(text){
        var debugConfig = config['debug'];
        var mailOptions = {
            from: debugConfig.from,
            to: debugConfig.to,
            subject: debugConfig.subject,
            text: text
        };
        sendMail(mailOptions);
    };

    /**
     * Send custom mail
     * @param from
     * @param to
     * @param subject
     * @param text
     */
    this.send = function(from, to, subject, text){
        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text
        };
        sendMail(mailOptions);
    };
};
