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
            'data': (data.registered === undefined ? moment().format("YYYY-MM-DDTHH:mm:ssZZ") : data.registered)
        },
        'message': {
            'type': 'json',
            'data': ( data.message === undefined ? {} : JSON.stringify(data.message) )
        }
    };
}