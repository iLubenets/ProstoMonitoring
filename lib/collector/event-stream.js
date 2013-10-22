module.exports = function EventStream(database, cachedEventNum) {
    var cachedEventsSqlRows = [];

    this.put = function (event) {
        // Add new event to cache
        cachedEventsSqlRows.push(event.getSqlRow());
        //Check when need store events
        checkStreamOccupancy();
    }

    function checkStreamOccupancy() {
        if (cachedEventsSqlRows.length >= cachedEventNum) {
            database.storeEventList(cachedEventsSqlRows);
            cachedEventsSqlRows = [];
        }
    }
}
