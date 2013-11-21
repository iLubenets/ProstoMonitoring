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