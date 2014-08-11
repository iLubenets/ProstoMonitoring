var appControllers = angular.module('appControllers', []);

appControllers.controller("MainCtrl", ['$scope', '$http', function($scope, $http){
   //
}]);

appControllers.controller('navCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    $scope.isActive = function (page) {
        var currentRoute = $location.path().substring(1);
        return page === currentRoute ? 'active' : '';
    };

    $http.get('/api/events').success(function(data) {
        $scope.eventList = data;
    });
}]);

appControllers.controller("AboutCtrl", ['$scope', '$http', function($scope, $http){
    //
}]);

appControllers.controller("ApiCtrl", ['$scope', '$http', function($scope, $http){
    $http.get('/api/').success(function(data) {
        $scope.api = data;
    });
}]);

appControllers.controller("EventListCtrl", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get('/api/'+$routeParams.eventName+'/list/10').success(function(data) {
        $scope.eventName = $routeParams.eventName;

        $scope.eventList = data;
        $scope.eventListHeader = {};
        if(typeof data[0] != "undefined") {
            Object.keys(data[0]).forEach(function(value) {
                return $scope.eventListHeader[value] = value;
            });
        }
    });
}]);

appControllers.controller("EventCtrl", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get('/api/'+$routeParams.eventName+'/id/'+$routeParams.eventId).success(function(data) {
        $scope.eventName = $routeParams.eventName;
        $scope.eventId = $routeParams.eventId;
        $scope.event = data;
    });
}]);