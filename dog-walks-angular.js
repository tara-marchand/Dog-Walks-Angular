(function() {

	var dogWalks = angular.module("dogWalks", ["firebase"]);

	dogWalks.controller("dogsController", function ($scope, angularFire) {

		var dogsUrl = "https://dog-walks-angular.firebaseio.com/dogs";
		var promise = angularFire(dogsUrl, $scope, "dogs");

		promise.then(function() {
			$scope.addDog = function() {
				$scope.dogs.push({
					name: $scope.newDog.name
				});
			};

			$scope.removeDog = function(dog) {
				$scope.dogs.splice($scope.dogs.indexOf(dog), 1);
			};

			$scope.$watch("dogs");
		});

	});
})();