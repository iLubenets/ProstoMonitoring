var app = angular.module('ProstoMonitoringApp',[
    'ngRoute',
    'appControllers'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'tmpl/main.html',
            controller: 'MainCtrl'
        }).
        when('/api', {
            templateUrl: 'tmpl/api.html',
            controller: 'ApiCtrl'
        }).
        when('/about', {
            templateUrl: 'tmpl/about.html',
            controller: 'AboutCtrl'
        }).
        when('/event/:eventName', {
            templateUrl: 'tmpl/event-list.html',
            controller: 'EventListCtrl'
        }).
        when('/event/:eventName/id/:eventId', {
            templateUrl: 'tmpl/event.html',
            controller: 'EventCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
