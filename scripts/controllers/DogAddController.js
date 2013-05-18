angular.module("DogWalksAppDependencies").controller("DogAddController", function ($scope, DogsFactory) {
	$scope.addDog = function(dogToAdd) {
		DogsFactory.dogs.add(dogToAdd);
	};
});
