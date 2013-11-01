module.exports = function EventStream(database, cachedEventNum) {
    var cachedEvents = [];

    this.put = function (event) {
        // Add new event to cache
        cachedEvents.push(event.definition());
        //Check when need store events
        checkStreamOccupancy('event');
    }

    function checkStreamOccupancy(name) {
        if (cachedEvents.length >= cachedEventNum) {
            database.storeEventList(name, cachedEvents);
            cachedEvents = [];
        }
    }
}
