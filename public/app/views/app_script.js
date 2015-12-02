var myApp = angular.module("myApp", []);

myApp.controller("namescontroller", function namescontroller($scope, $http){
	$http.get('../js/question.json').success(function(data){
	$scope.ques= data;
	})
});		