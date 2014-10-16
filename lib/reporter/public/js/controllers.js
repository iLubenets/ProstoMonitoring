var appControllers = angular
    .module('appControllers', [])
    .constant("APP_API", '/api/');

appControllers.controller("MainCtrl", ['$scope', '$http', function($scope, $http){
   //
}]);

appControllers.controller('navCtrl', ['$scope', '$location', '$http', 'APP_API',
    function ($scope, $location, $http, APP_API) {
    $scope.isActive = function (page) {
        var currentRoute = $location.path().substring(1);
        return page === currentRoute ? 'active' : '';
    };

    $http.get(APP_API+'events').success(function(data) {
        $scope.eventList = data;
    });
}]);

appControllers.controller("AboutCtrl", ['$scope', '$http', function($scope, $http){
    //
}]);

appControllers.controller("ApiCtrl", ['$scope', '$http', 'APP_API',
    function($scope, $http, APP_API){
    $http.get(APP_API).success(function(data) {
        $scope.api = data;
    });
}]);

appControllers.controller("EventListCtrl", ['$scope', '$http', '$routeParams', 'APP_API',
    function($scope, $http, $routeParams, APP_API){
    $http.get(APP_API+$routeParams.eventName+'/list/1000').success(function(data) {
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

appControllers.controller("EventCtrl", ['$scope', '$http', '$routeParams', 'APP_API',
    function($scope, $http, $routeParams, APP_API){
    $http.get(APP_API+$routeParams.eventName+'/id/'+$routeParams.eventId).success(function(data) {
        $scope.eventName = $routeParams.eventName;
        $scope.eventId = $routeParams.eventId;
        $scope.event = data;
    });
}]);