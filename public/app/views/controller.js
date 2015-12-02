var myApp = angular.module("myApp", []);
// var items = angular.module("iApp", []);


/*myApp.controller("namescontroller", function namescontroller($scope, $http){
	///alert("ghus gaya!!!");
	/*$http.get('./js/project-1.json').success(function(data){
		$scope.names1= data;
	})
	$http.get('./js/project-2.json').success(function(data){
		$scope.names2= data;
	})
	$http.get('./js/project-3.json').success(function(data){
		$scope.names3= data;
	})
	$http.get('./js/project-4.json').success(function(data){
		$scope.names4= data;
	})
	$http.get('./js/project-5.json').success(function(data){
		$scope.names5= data;
	})
	$http.get('./js/project-6.json').success(function(data){
		$scope.names6= data;
	})

	
	$http.get('./js/project-1.json').success(function(articles){
		var abc=articles.users;
		for (var i = 0; i <abc.length; i++) {
		$scope.name= articles.data.users;
		};	
	})
});
/*	var myApp = angular.module("myApp", []);
var names = new Array();
myApp.controller("namescontroller", function namescontroller($scope, $http){
$scope.names = {};
jsonFactory.getOtherStuff().then(function (response) {
  $scope.names = response.data.users;
 }, function (error) {
    console.error(error);
  });
}); */
angular.module('myApp', []).controller('namescontroller', ['$scope', 'articleDataService',  function($scope, articleDataService){
  // when promise is resolved, set the scope variable
  articleDataService.getArticles().then(function(articles){
      // store any data from json that you want on the scope for later access in your templates
      $scope.articles = articles;
      $scope.custInfo=articles.data.users;
  })
}]).factory('articleDataService',['$http', '$q', function($http, $q){
  var data = null;
  return {
    getArticles: function() {
      var promise;
      if(data === null) {
        promise = $http.get('./js/project-1.json').then(function(response){
          // cache the response
          data = response;
          return response;
        });
      } else {
        var deferred = $q.defer();
        // promise is immediately resolved with the cached data
        // this way both cached and async data can be handled consistently
        promise = deferred.promise;
      }
      return promise;
    }
  } ;
}]);