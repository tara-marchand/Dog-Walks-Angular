angular.module("DogWalksAppDependencies").controller("DogDetailController", function ($scope, DogsFactory, $routeParams) {
	var dogId = $routeParams.dogId;
	$scope.selectedDog = null;

	angular.forEach(DogsFactory.dogs, function(dog) {
		if (dog.$id === dogId) {
			$scope.selectedDog = dog;
		}
	});
});
