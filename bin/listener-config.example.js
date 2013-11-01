// Default configuration for development.
module.exports = {
    // PostgreSQL connection string
    "pg-connection-string": "user:password@localhost:5432/monitoring",
    // Number of events we collect before save
    "cached-event-num": 10,
    "http-port": 1080,
    "udp-port": 1180
};
