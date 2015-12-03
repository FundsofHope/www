angular.module('ngoAuthWorker', [])

    .factory('Auth', function($http, $q, AuthToken) {


        var authFactory = {};


        authFactory.login = function(username, password) {

            return $http.post('/ngo/login', {
                username: username,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                })
        };

        authFactory.logout = function() {
            AuthToken.setToken();
        };

        authFactory.isLoggedIn = function() {
            return !!AuthToken.getToken();
        };

        authFactory.getUser = function() {
            if(AuthToken.getToken())
                return $http.get('/ngo/:ngoid');
            else
                return $q.reject({ message: "No Token, Sign In"});

        };

        return authFactory;

    })


    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        authTokenFactory.setToken = function(token) {

            if(token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');

        };

        return authTokenFactory;

    })


    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        var interceptorFactory = {};


        interceptorFactory.request = function(config) {

            var token = AuthToken.getToken();

            if(token) {

                config.headers['x-access-token'] = token;

            }

            return config;

        };

        return interceptorFactory;
    });
