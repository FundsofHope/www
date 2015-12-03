/**
 * Created by addiittya on 03/12/15.
 */
angular.module('projectGetWorker', [])


    .factory('Project', function($http) {


        var projectFactory = {};

        //projectFactory.allStories = function() {
            //return $http.get('/project/all');
        //};

        projectFactory.all = function() {
            return $http.get('/project/all');
        };

        projectFactory.create = function(storyData) {
            return $http.post('/ngo/:ngoid/create', storyData);
        };

        return projectFactory;

    });