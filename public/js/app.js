/**
 * Created by addiittya on 15/08/15.
 */
var module = angular.module('myApp', ['ngRoute', 'appControllers', 'regController']);

var appControllers = angular.module('appControllers', []);

module.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/login', {
            templateUrl:'views/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl:'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/ngos', {
            templateUrl:'views/ngos.html'
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);