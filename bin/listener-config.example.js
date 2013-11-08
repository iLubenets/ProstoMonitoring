// Default configuration for development.
module.exports = {
    // Number of events we collect before save
    "server":{
        "http-port": 1080,
        "udp-port": 1180
    },
    // PostgreSQL connection string
    "database":{
        "connection-string": "user:password@host:5432/prosto.monitoring",
        "table-postfix": "event"
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
    }
};