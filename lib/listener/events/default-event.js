var moment = require('moment');

module.exports = function Event(data) {
    this.definition = {
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
        'level': {
            'type': 'integer',
            'data': data.level
        },
        'message': {
            'type': 'string',
            'data': data.message
        },
        'la': {
            'type': 'numeric',
            'data': data.la[0]
        },
        'memory_usage': {
            'type': 'numeric',
            'data': data.memory_usage
        },
        'data': {
            'type': 'json',
            'data': JSON.stringify(data.data)
        }
    };
}