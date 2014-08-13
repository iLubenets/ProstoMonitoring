var appHelpers = angular.module('appHelpers', []);

appHelpers.filter('capitalize', function() {
    return function(input) {
        return typeof input != "undefined"
            ? input.substring(0,1).toUpperCase()+input.substring(1)
            : '';
    }
});

appHelpers.run(function($rootScope) {
    $rootScope.isJSON = function(input) {
        if(angular.isObject(input)) {
            return true;
        }
        if(angular.isArray(input)) {
            return true;
        }
//        try {
//            JSON.parse(input);
//            return true;
//        } catch (e) {}
        return false;
    };
});