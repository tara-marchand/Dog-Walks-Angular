angular.module("DogWalksAppDependencies").controller("DogsListController", function ($scope, DogsFactory) {
	$scope.dogs = [];
	DogsFactory.getDogs().then(function (data) {
		$scope.dogs = data;
	});
	$scope.removeDog = function(dog) {
		DogsFactory.removeDog(dog);
	};
});
