angular.module("dogs", [])

	.config(["$routeProvider", function($routeProvider) {
		$routeProvider
			.when("/dogs", {
				controller: "DogsListController",
				templateUrl: "modules/dogs/list-view.html"
			})

			.when("/dogs/:dogId", {
				controller: "DogDetailController",
				resolve: {
					dog: function($q, DogsFactory, $route) {
						var deferred = $q.defer();
						var dogId = $route.current.params.dogId;

						angular.forEach(DogsFactory.dogs, function(dog) {
							if (dog.$id === dogId) {
								deferred.resolve(dog);
							}
						});
						return deferred.promise;
					}
				},
				templateUrl: "modules/dogs/detail-view.html"
			})

			.otherwise({
				redirectTo: "/dogs"
			});
		}
	])

	.factory("DogsFactory", function (angularFireCollection) {
		var dogsFirebase = new Firebase(firebaseUrls.dogs);

		this.dogs = angularFireCollection(dogsFirebase);
		return this;
	})

	.controller("DogsListController", function ($scope, DogsFactory) {
		$scope.dogs = DogsFactory.dogs;
		$scope.removeDog = function(dog) {
			DogsFactory.dogs.remove(dog);
		};
	})

	.controller("DogAddController", function ($scope, DogsFactory) {
		$scope.addDog = function(dogToAdd) {
			DogsFactory.dogs.add(dogToAdd);
		};
	})

	.controller("DogDetailController", function ($scope, dog) {
		$scope.selectedDog = dog;
	});
