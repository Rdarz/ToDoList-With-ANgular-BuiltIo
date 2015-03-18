
var todo=angular.module('myApp', []);
todo.controller('userController',  function ($scope) {
	$scope.users=['rahul','darji'];
	$scope.value=true;
	$scope.add=function(){
if($scope.topic!=null){
$scope.users.push($scope.topic);
$scope.topic=null;
}
};

$scope.enter=function($event){
if ($event.which===13) {
	if($scope.topic!=null){
$scope.users.push($scope.topic);
$scope.topic=null;
}
};


};
$scope.check=function(event) {

	 

};


$scope.remove=function(user) {

	var index = $scope.users.indexOf(user);
		this.unchecked=false;

 	$scope.users.splice(index,1);
 	this.unchecked.push(index);

	 };
var curr_user;
$scope.edit=function(user){


	this.value=false;
	curr_user=user;

};

$scope.update=function(event,user){


if (event.which===13) {
	if(user!=""){
	 	var index = $scope.users.indexOf(curr_user);
	// alert(index);
	
	this.value=true;
	
 $scope.users.splice(index,1);
 $scope.users.splice(index,0,user);


}
}
};
})