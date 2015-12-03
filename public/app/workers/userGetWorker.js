/**
 * Created by addiittya on 03/12/15.
 */
angular.module('userGetWorker', [])


    .factory('User', function($http) {

        var userFactory = {};

        userFactory.create = function(userData) {
            return $http.post('/user/signup', userData);
        };

        return userFactory;

    });