var pg = require('pg');

module.exports = function Database(connectionString) {
    connectionString = 'postgres://' + connectionString;
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            throw new Error( 'could not connect to postgres' + err );
        }
    });

    // Insert into table
    this.storeEventList = function (eventList) {
        var query = "INSERT INTO public.event (\"create\",type,\"time\",data) VALUES " + eventList.join(',');
        client.query(query, function (err, result) {
            if (err) {
                console.error('Error running query=' + query, err);
            }
            console.log('Events stored.');
        });
    }
}
