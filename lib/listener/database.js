var pg = require('pg');
var util = require('util');

/**
 * Wrapper pg database module with addition functions
 * @param config
 * @param logger
 * @constructor
 */
module.exports = function Database(config, logger) {
    var connectionString = 'postgres://' + config['connection-string'];
    var client = new pg.Client(connectionString);
    /**
     * Create connection to database
     */
    client.connect(function (err) {
        if (err) {
            var errorText = 'Could not connect to postgres' + err;
            logger.critical(errorText);
            throw new Error(errorText);
        }
    });

    /**
     * Store event list to database
     * @param tableName
     * @param eventList
     */
    this.storeEventList = function (tableName, eventList) {
        var nameList = '';
        var valuesList = [];

        // Build insert query
        eventList.forEach(function (event) {
            var names = [];
            var fields = [];
            for (var fieldName in event) {
                names.push(fieldName);
                fields.push(getFieldValueByType(event[fieldName]['type'], event[fieldName]['data']));
            }
            nameList = names.join(',');
            valuesList.push(util.format('(%s)', fields.join(',')));
        });

        var query = util.format('INSERT INTO %s_event (%s) VALUES %s', tableName, nameList, valuesList.join(','));
        client.query(query, function (err, result) {
            if (err) {
                logger.critical('Database.storeEventList error: ' + query + '. ' + err);
            }
        });
    };

    /**
     * Process field value by it's type
     * @param type
     * @param value
     * @returns {string}
     */
    function getFieldValueByType(type, value) {
        var result = '';
        switch (type) {
            case 'integer':
            case 'numeric':
                result = isNaN(value) ? 'NULL' : util.format('%d', value);
                break;
            case 'timestamp':
                result = (value == 'undefined') ? 'NULL' : util.format('$$%s$$', value);
                break;
            case 'json':
                result = (value == 'undefined') ? '\'{}\'' : util.format('$$%s$$', value);
                break;
            case 'string':
            default:
                result = util.format('$$%s$$', value);
                break;
        }

        return result;
    }
};
