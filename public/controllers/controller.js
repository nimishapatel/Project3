function AppCtrl($scope, $http){
console.log("Hell world from controller");

var refresh = function() {
$http.get('/registrationlist').success(function(response){
	console.log("I got the data I requested");
	$scope.registrationlist = response;
	$scope.person = "";
});
};

refresh();

$scope.addPerson = function() {
console.log($scope.person);
$http.post('/registrationlist', $scope.person).success(function(response) {
console.log(response);
refresh();
 });

};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/registrationlist/' + id).success(function(response) {
	refresh();
});

};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/registrationlist/' + id).success(function(response) {
	$scope.person = response;
});
};

$scope.update = function() {
	console.log($scope.person._id);
	$http.put('/registrationlist/' + $scope.person._id, $scope.person).success(function(response) {
	refresh();
})
};

$scope.deselect = function() {
	$scope.person = "";
}

}
