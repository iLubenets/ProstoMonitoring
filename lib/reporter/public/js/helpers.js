var appHelpers = angular.module('appHelpers', []);

appHelpers.filter('capitalize', function() {
    return function(input) {
        return typeof input != "undefined"
            ? input.substring(0,1).toUpperCase()+input.substring(1)
            : '';
    }
});