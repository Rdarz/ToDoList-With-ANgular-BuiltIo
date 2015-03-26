// var app = Built.App('blt2ef054f0bf794890').persistSessionWith(Built.Session.COOKIE);
var todo = angular.module('myApp', []);
// var signup = app.User;


var auth=signup.isAuthenticated();
if(auth==true){
	window.location="index.html";
}


todo.controller('userSignup', function($scope) {
    $scope.signup = function() {
        var email = $scope.signupUsername;
        var password = $scope.signupPassword;
        var password_confirm = $scope.signupConfirm;
        signup.register(email, password, password_confirm)
            .then(function() {
                    alert("success");
                },
                function() {
                    alert("error");
                })
    };
});

todo.controller('userLogin', function($scope) {
	$scope.login=function(){
		var username=$scope.loginUser;
		var pass=$scope.loginPass;

		//login
		signup().login(username , pass)
		.then(function (user) {
			console.log('Logged In');
			console.log(signup.isAuthenticated());
			window.location="index.html";
			//signup.setSession(user)
		}, console.error)

			}
});


// var app = Built.App('blt2ef054f0bf794890').persistSessionWith(Built.Session.COOKIE);
// var User = app.User;
// var appClass=app.Class('topic_list');
// var todo_list = appClass.Object

// User().login('darji.rahul316@gmail.com','123')
// .then(function(user){
// 	console.log('Login succes');

// 	User.getSession()
// 	.then(function(user){
// 		todo_list({
// 	        topic: 'todo',
// 	        done:false
// 	    }).save()
// 	    .then(function(res) {                 
// 	    	console.log(res);
// 	    }, function(err) {
// 	        // alert(err);
// 	    });
// 	})
// })