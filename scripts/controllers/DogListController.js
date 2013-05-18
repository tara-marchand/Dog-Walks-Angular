angular.module("DogWalksAppDependencies").controller("DogsListController", function ($scope, DogsFactory) {
	$scope.dogs = DogsFactory.dogs;
	$scope.removeDog = function(dog) {
		DogsFactory.dogs.remove(dog);
	};
});
