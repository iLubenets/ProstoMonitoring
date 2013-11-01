var moment = require('moment');

module.exports = function Event(data) {
    data = JSON.parse(data);
    var definition = {
        'event': {
            'type': 'string',
            'data': data.event
        },
        'created': {
            'type': 'timestamp',
            'data': moment().format("YYYY-MM-DDTHH:mm:ssZZ")
        },
        'registered': {
            'type': 'timestamp',
            'data': data.registered
        },
        'message': {
            'type': 'json',
            'data': JSON.stringify(data.message)
        }
    };

    this.definition = function () {
        return definition;
    }
}