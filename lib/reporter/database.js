var pg = require('pg');
var util = require('util');

/**
 * Wrapper pg database module with addition functions
 * @constructor
 */
module.exports = function Database(config) {
    var client = new pg.Client('postgres://' + config['connection-string']);
    /**
     * Create connection to database
     */
    client.connect(function (err) {
        if (err) {
            var errorText = 'Could not connect to postgres' + err;
            console.error(errorText);
            throw new Error(errorText);
        }
    });

    this.getEvents = function(callback) {
        var query = 'SELECT replace(tablename, \'_event\', \'\') AS event FROM pg_catalog.pg_tables ' +
            'WHERE schemaname = \'public\' AND tablename LIKE \'%_event\';';
        console.log(query);
        client.query(query, callback);
    };

    /**
     * Get event list by ID
     * @param callback
     * @param tableName
     * @param id
     */
    this.getEvent = function (callback, tableName, id) {
        var query = util.format('SELECT * FROM %s_event ' +
            'WHERE id = %d ' +
            'ORDER BY created;', tableName, id);
        console.log(query);
        client.query(query, callback);
    };

    /**
     * Get event list with limit, offset
     * @param callback
     * @param tableName
     * @param limit
     * @param offset
     */
    this.getEventList = function (callback, tableName, limit, offset) {
        var query = util.format('SELECT * FROM %s_event ' +
            'ORDER BY created DESC LIMIT %d OFFSET %d;', tableName, limit, offset);
        console.log(query);
        client.query(query, callback);
    };

    /**
     * Get event list by created time
     * @param callback
     * @param tableName
     * @param start
     * @param end
     */
    this.getEventListByTime = function (callback, tableName, start, end) {
        var query = util.format('SELECT * FROM %s_event ' +
            'WHERE created BETWEEN $$%s$$ AND %s ' +
            'ORDER BY created;', tableName, start, end === null ? 'NOW()' : '$$' + end + '$$');
        console.log(query);
        client.query(query, callback);
    };
};
