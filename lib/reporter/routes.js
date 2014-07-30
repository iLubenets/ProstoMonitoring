module.exports.setup = function (app, handlers) {
    // application
    app.get('/', handlers.application.start);

    // api
    app.get('/api', function (req, res, next){res.json(app._router.stack.filter(function(route){
        return typeof(route['route']) != "undefined";
    }))});
    app.get('/api/events', handlers.event.events);
    app.get('/api/:event/id/:id', handlers.event.id);
    app.get('/api/:event/list/:limit,:offset', handlers.event.list);
    app.get('/api/:event/list/:limit', handlers.event.list);
    app.get('/api/:event/list/', handlers.event.list);
    app.get('/api/:event/between/:start,:end', handlers.event.between);
    app.get('/api/:event/between/:start', handlers.event.between);
};