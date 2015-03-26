//refer builtmodel.js
if (auth == true) {
    window.location = "index.html";
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
    $scope.login = function() {
        var username = $scope.loginUser;
        var pass = $scope.loginPass;

        //login
        signup().login(username, pass)
            .then(function(user) {
                console.log('Logged In');
                console.log(signup.isAuthenticated());
                window.location = "index.html";
                //signup.setSession(user)
            }, console.error)

    }
});

