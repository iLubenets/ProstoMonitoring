// Default configuration for development.
module.exports = {
    // Number of events we collect before save
    "server":{
        "http-port": 1080,
        "udp-port": 1180
    },
    // PostgreSQL connection string
    "database":{
        "connection-string": "user:password@host:5432/prosto.monitoring"
    },
    // Events configuration
    "event":{
        "cached-event-num": 10,
        "default-event": "default",
        "custom": {
            "exception": {
                "level": 200
            }
        }
    },
    // List of email that receive mail, when trouble happens
    "mailer":{
        // sendmail, smtp
        "transport": 'sendmail',
        // if smtp https://github.com/andris9/Nodemailer
        "smtp_options": {
            service: "Gmail",
            auth: {
                user: "gmail.user@gmail.com",
                pass: "userpass"
            }
        },
        // create "emails" dir end write there mail as file
        "save_to_file": false,
        "debug":{
            "subject": 'ProstoMonitoring error',
            "from": 'prostomonitoring@example.com',
            "to": 'admin@example.com, admin2@example.com'
        }
    }
};