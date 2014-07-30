App = Ember.Application.create({});

App.Router.map(function(){
    this.resource('api')
});

// Api route
App.Api = Ember.Object.extend(

);
App.Api.reopenClass({
    all: function() {
        return $.getJSON("/api/").then(function(response) {
            var items = [];
            response.forEach( function (item) {
                items.push( App.Api.create(item) );
            });
            return items;
        });
    }
});
App.ApiRoute = Ember.Route.extend({
    model: function() {
        return App.Api.all();
    }
});