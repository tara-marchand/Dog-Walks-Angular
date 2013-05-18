angular.module("DogWalksAppDependencies");

angular.module("DogWalksApp", ["firebase", "DogWalksAppDependencies"])
	.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when("/dogs", { templateUrl: "views/dog-list.html" })
			.when("/dogs/:dogId", { templateUrl: "views/dog-detail.html" })
			.otherwise({ redirectTo: "/dogs" });
		}
	]);
