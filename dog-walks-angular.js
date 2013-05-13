(function() {

	var dogWalks = angular.module("dogWalks", ["firebase"])
		.config(["$routeProvider", function($routeProvider) {
			$routeProvider.when("/dogs", { templateUrl: "views/dog-list.html" })
				.when("/dogs/:dogName", { templateUrl: "views/dog-detail.html" })
				.otherwise({ redirectTo: "/dogs" });
			}
		]);

	dogWalks.controller("dogWalksController", function ($scope, $routeParams, angularFire, $location) {
		var dogsUrl = "https://dog-walks-angular.firebaseio.com/dogs";
		var promise = angularFire(dogsUrl, $scope, "dogs");

		promise.then(function() {
			$scope.dogName = $routeParams.dogName;

			$scope.addDog = function() {
				$scope.dogs.push({
					name: $scope.newDog.name
					breed: $scope.newDog.breed
					age: $scope.newDog.age
				});
			};

			$scope.removeDog = function(dog) {
				$scope.dogs.splice($scope.dogs.indexOf(dog), 1);
			};
			$scope.$watch("dogs");
		});
	});

})();
