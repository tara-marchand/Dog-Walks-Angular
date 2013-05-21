angular.module("DogWalksAppDependencies").factory("DogsFactory", function (angularFireCollection) {
	var dogsFirebase = new Firebase(firebaseUrls.dogs);

	this.dogs = angularFireCollection(dogsFirebase);
	return this;
});
