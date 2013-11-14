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
            'data': (data.registered === undefined ? moment().format("YYYY-MM-DDTHH:mm:ssZZ") : data.registered)
        },
        'level': {
            'type': 'integer',
            'data': (isNaN(data.level) ? 'NULL' : data.level)
        },
        'message': {
            'type': 'string',
            'data': data.message
        },
        'data': {
            'type': 'json',
            'data': ( data.data === undefined ? {} : JSON.stringify(data.data) )
        }
    };
}