var pg = require('pg');

module.exports = function Database(connectionString) {
    connectionString = 'postgres://' + connectionString;
    // Insert into table
    this.storeEventList = function (eventList) {
        var client = new pg.Client(connectionString);
        var query = "INSERT INTO public.event (\"create\",type,\"time\",data) VALUES " + eventList.join(',');

        client.connect(function (err) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            client.query(query, function (err, result) {
                if (err) {
                    console.log(query);
                    return console.error('error running query', err);
                }
                client.end();
                console.log(query);
            });
        });
    }
}
