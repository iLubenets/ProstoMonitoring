module.exports = function EventHandler(db) {

    /**
     * Response exist event list
     * @param req
     * @param res
     * @param next
     */
    this.events = function (req, res, next) {
        db.getEvents(function (err, result) {
            if (err) {
                res.json(500, 'Error.events: ' + err);
            } else {
                res.json(result.rows);
            }
        });
    };

    /**
     * Response event list
     * @param req
     * @param res
     * @param next
     */
    this.list = function (req, res, next) {
        if (req.params.event == undefined) {
            res.json(400)
        }

        var limit = req.params.limit == undefined ? 100 : req.params.limit;
        var offset = req.params.offset == undefined ? 0 : req.params.offset;
        // It's too hard to select over 10K rows for DB.
        if(limit > 10000) {
            res.json(400, 'Too many rows...');
            return;
        }

        db.getEventList(function (err, result) {
            if (err) {
                res.json(500, 'Error.list: ' + err);
            } else {
                res.json(result.rows);
            }
        }, req.params.event, limit, offset);
    };

    /**
     * Response one event
     * @param req
     * @param res
     * @param next
     */
    this.id = function (req, res, next) {
        if (req.params.event == undefined || isNaN(req.params.id)) {
            res.json(400)
        }

        db.getEvent(function (err, result) {
            if (err) {
                res.json(500, 'Error.get: ' + err);
            } else {
                res.json(result.rows);
            }
        }, req.params.event, req.params.id);
    };

    /**
     * Response event list between datetime
     * @param req
     * @param res
     * @param next
     */
    this.between = function (req, res, next) {
        if (req.params.event == undefined || req.params.start == undefined) {
            res.json(400)
        }
        var end = req.params.end == undefined ? null : req.params.end;

        db.getEventListByTime(function (err, result) {
            if (err) {
                res.json(500, 'Error.list: ' + err);
            } else {
                res.json(result.rows);
            }
        }, req.params.event, req.params.start, end);
    };
};

