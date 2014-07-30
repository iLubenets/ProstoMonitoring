module.exports = function ApplicationHandler(db) {

    /**
     * Response exist event list
     * @param req
     * @param res
     * @param next
     */
    this.start = function (req, res, next) {
        res.sendfile('./public/index.html'); // load the single view file
    };
};

