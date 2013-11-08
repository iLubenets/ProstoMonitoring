module.exports = function EventFactory(defaultEvent, customEvents) {

    this.getEvent = function (data) {
        var jsonData = JSON.parse(data);
        var eventName = getEventName(jsonData);
        var Event = require("./events/" + eventName + "-event");
        var event = new Event(jsonData);

        event.getDefinition = function () {
            return event.definition;
        }
        event.getName = function () {
            return eventName;
        }

        return event;
    }

    function getEventName(jsonData) {
        var resultName = '';
        for (var eventName in customEvents) {
            if (customEvents.hasOwnProperty(eventName)) {
                var rules = customEvents[eventName];
                for (var fieldName in rules) {
                    if (rules.hasOwnProperty(fieldName)) {
                        var match = rules[fieldName];
                        if (jsonData[fieldName] != match) {
                            resultName = defaultEvent;
                            break;
                        }
                        resultName = eventName;
                    } else {
                        console.error('Wrong custom event match property: ' + fieldName);
                        resultName = defaultEvent;
                    }
                }
            } else resultName = defaultEvent;
        }

        return resultName;
    }
}