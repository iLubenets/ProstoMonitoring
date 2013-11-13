var moment = require('moment');

module.exports = function Event(data) {
    this.definition = {
        'event': {
            'type': 'string',
            'data': data.event
        },
        'level': {
            'type': 'integer',
            'data': data.level
        },
        'created': {
            'type': 'timestamp',
            'data': moment().format("YYYY-MM-DDTHH:mm:ssZZ")
        },
        'registered': {
            'type': 'timestamp',
            'data': data.registered
        },
        'exception': {
            'type': 'string',
            'data': data.message.formatted
        },
        'message': {
            'type': 'json',
            'data': JSON.stringify(data.message)
        }
    };
}