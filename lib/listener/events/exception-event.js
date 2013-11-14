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
        'class': {
            'type': 'string',
            'data': data.exception.class
        },
        'message': {
            'type': 'string',
            'data': data.exception.message
        },
        'file': {
            'type': 'string',
            'data': data.exception.file
        },
        'line': {
            'type': 'integer',
            'data': data.exception.line
        },
        'data': {
            'type': 'json',
            'data': JSON.stringify(data.data)
        }
    };
}