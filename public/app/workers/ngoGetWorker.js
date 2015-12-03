/**
 * Created by addiittya on 03/12/15.
 */
angular.module('ngoGetWorker', [])


    .factory('Ngo', function($http) {

        var ngoFactory = {};

        ngoFactory.create = function(ngoData) {
            return $http.post('/ngo/signup', ngoData);
        };

        ngoFactory.all = function() {
            return $http.get('/ngo/all');
        };

        return ngoFactory;

    });