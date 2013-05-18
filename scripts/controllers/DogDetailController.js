angular.module("DogWalksAppDependencies").controller("DogDetailController", function ($scope, $rootScope, $routeParams) {
	var dogId = $routeParams.dogId;
	$rootScope.dogsFirebase.child(dogId).on("value", function (data) {
		$scope.selectedDog = data.val();
		// check if $digest already in progress
		// http://stackoverflow.com/questions/12729122/prevent-error-digest-already-in-progress-when-calling-scope-apply
		if (!$rootScope.$$phase) {
			$rootScope.$apply();
		}
	});
});
