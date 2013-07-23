angular.module("dogs", [])

	.config(["$routeProvider", function($routeProvider) {
		$routeProvider
			.when("/dogs", {
				controller: "DogsListController",
				resolve: {
					dogs: function($q, DogsFactory) {
						var deferred = $q.defer();
						DogsFactory.getAllDogs().then(function(dogs) {
							deferred.resolve(dogs);
						});
						return deferred.promise;
					}
				},
				templateUrl: "html/doglist-view.html"
			})

			.when("/dogs/:dogId", {
				controller: "DogDetailController",
				resolve: {
					dog: function($q, DogsFactory, $route) {
						var deferred = $q.defer();
						var dogId = $route.current.params.dogId;
						DogsFactory.getAllDogs().then(function(dogs) {
							angular.forEach(dogs, function(dog) {
								if (dog.$id === dogId) {
									deferred.resolve(dog);
								}
							});
						});
						return deferred.promise;
					}
				},
				templateUrl: "html/dog-detail-view.html"
			})

			.otherwise({
				redirectTo: "/dogs"
			});
		}
	])

	// using angularFireCollection as factory:
	// https://gist.github.com/jaredwilli/5472340
	.factory("DogsFactory", function ($q, angularFireCollection, $rootScope) {
		var dogsFirebase = new Firebase(firebaseUrls.dogs);

		this.getAllDogs = function() {
			var deferred = $q.defer();
			var dogs = angularFireCollection(dogsFirebase);
			// make sure dogs are available -- return value as a promise
			var dogsInterval = setInterval(function() {
				if (dogs.length) {
					clearTimeout(dogsInterval);
					$rootScope.$apply(deferred.resolve(dogs));
				}
			}, 100);
			return deferred.promise;
		};

		this.addDog = function(dog) {
			this.getAllDogs().then(function(dogs) {
				dogs.add(dog);
			});
		};

		this.removeDog = function(dog) {
			this.getAllDogs().then(function(dogs) {
				dogs.remove(dog);
			});
		};

		return this;
	})

	// dogs passed from resolved promise in $routeProvider
	.controller("DogsListController", function ($scope, DogsFactory, dogs) {
		$scope.dogs = dogs;
		$scope.removeDog = function(dog) {
			DogsFactory.removeDog(dog);
		};
	})

	.controller("DogAddController", function ($scope, DogsFactory) {
		$scope.addDog = function(dogToAdd) {
			DogsFactory.addDog(dogToAdd);
		};
	})

	// dog passed from resolved promise in $routeProvider
	.controller("DogDetailController", function ($scope, dog) {
		$scope.selectedDog = dog;
	});
