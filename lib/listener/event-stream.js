module.exports = function EventStream(database, cachedEventNum) {
    var cachedEvents = {};
    var eventCounter = 0;

    this.put = function (event) {
        var eventName = event.getName();
        // Add new event to cache
        cachedEvents[eventName] = cachedEvents[eventName] || [];
        cachedEvents[eventName].push(event.getDefinition());
        // Increment counter
        eventCounter++;
        //Check when need store events
        checkStreamOccupancy();
    }

    /**
     * Check stream occupancy and store to db, when need.
     */
    function checkStreamOccupancy() {
        if (eventCounter >= cachedEventNum) {
            for (var eventName in cachedEvents) {
                if (cachedEvents.hasOwnProperty(eventName))
                    store(eventName, cachedEvents[eventName]);
                else
                    console.error('"' + eventName + '" has not property in EventStream::checkStreamOccupancy');
            }
            // Clear the variables for the new data
            cachedEvents = [];
            eventCounter = 0;
        }
    }

    /**
     * Store to databases
     * @param name
     * @param eventList
     */
    function store(name, eventList) {
        database.storeEventList(name, eventList);
    }
}
