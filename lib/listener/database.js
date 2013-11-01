var pg = require('pg');
var util = require('util');

module.exports = function Database(connectionString) {
    connectionString = 'postgres://' + connectionString;
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            throw new Error('could not connect to postgres' + err);
        }
    });

    // Insert into table
    this.storeEventList = function (tableName, eventList) {
        var nameList = '';
        var valuesList = [];

        // Build insert query
        eventList.forEach(function (event) {
            var names = [];
            var fields = [];
            for( var fieldName in event ){
                names.push(fieldName);
                fields.push(getFieldValueByType(event[fieldName]['type'], event[fieldName]['data']));
            }
            nameList = names.join(',');
            valuesList.push(util.format('(%s)', fields.join(',')));
        });

        var query = util.format( 'INSERT INTO %s (%s) VALUES %s', tableName, nameList, valuesList.join(','));
        client.query(query, function (err, result) {
            if (err) {
                console.error('Error running query=' + query, err);
            }
        });
    }

    function getFieldValueByType( type, value ){
        var result = '';
        switch (type){
            case 'integer':
                result = util.format('%d', value);
                break;
            case 'string':
            case 'timestamp':
            case 'json':
            default:
                result = util.format('\'%s\'', value);
                break;
        }

        return result;
    }
}
