var todo = angular.module('myApp', []);
   var auth=signup.isAuthenticated();
if(auth==false){
	window.location="login.html";
}
var appClass = app.Class('topic_list');
 var query = appClass.Query();
 var todo_list = appClass.Object;
todo.controller('userController', function($scope) {

    $scope.users = [];
    console.log("loading");
    todo.service("myService", MyService());

    function MyService(user) {
        $scope.users = [];
        console.log("service loaded.");


        signup.getSession()
            .then(function(user) {
                console.log('user', user.data)
                query
                    .where('app_user_object_uid', user.data.uid)
                    .toJSON()
                    .exec()
                    .then(function(objects) {
                        objects.map(function(obj) {
                            $scope.users.push({
                            	uid:obj.uid,
                                topic: obj.topic,
                                done: obj.done
                            });
                            $scope.$apply();
                            //return something;
                        });
                    });


            })

    }

    console.log($scope);
    $scope.value = true;
    var curr_user;


    $scope.add = function(user) {
        if ($scope.topic != null) {
            // $scope.users.push($scope.topic);
            var todo = $scope.topic;

            signup.getSession()
                .then(function(user) {
                   
                    todo_list({
                        topic: todo,
                        done: false
                    }).save()
                        .then(function() {
                            alert("saved");
                            var query = appClass.Query();
                            query
                                .toJSON()
                                .exec()
                                .then(function(objects) {
                                    MyService();
                                });


                        }, function(err) {
                            alert(err);
                        });
                    $scope.topic = null;
                })
        }
    };

    $scope.enter = function($event) {
        if ($event.which === 13) {
            if ($scope.topic != null) {
                $scope.users.push($scope.topic);
                $scope.topic = null;
            }
        };
    };
    $scope.checkbox = function(users) {
      
         signup.getSession()
                .then(function(user) {
        var query = appClass.Object;
       
            var up = query({
                uid: users.uid,
                done:users.done
            });
            up = up.upsert({
                uid: users.uid
            });
            up.save().then(function(person) {
                console.log("checked");
            });
     
})
    };
    $scope.remove = function(userx) {
      
                var index = $scope.users.indexOf(userx);
                signup.getSession()
                .then(function(user) {	
                	todo_list({uid:userx.uid})    	
                 .delete()
                 .then(function(obj){

                 	console.log(obj);
                 	$scope.users.splice(index, 1); 
                 	$scope.$apply();
                 })

                })
                // $scope.users.splice(index, 1);        								         
                                       
                
           
          };

    $scope.edit = function(user) {
        this.value = false;
        curr_user = user;
    };

    $scope.update = function(event, user) {


        if (event.which === 13) {

            if (user != "") {
                var index = $scope.users.indexOf(curr_user);
                // alert(index);

                this.value = true;




                var todo = user;
                var query = appClass.Query();
                // query=query.where();
                signup.getSession()
                    .then(function(user) {
                        query
                            .where('app_user_object_uid', user.data.uid)
                            .toJSON()
                            .exec()
                            .then(function(objects) {
                                var todo_list = appClass.Object;
                                var updt = todo_list({
                                    topic: todo
                                });

                                updt = updt.upsert({
                                    topic: curr_user
                                });
                                updt.save()
                                    .then(function() {
                                        alert("saved");
                                        // array of plain javascript objects
                                        MyService();
                                        $scope.$apply();
                                    }, function(err) {
                                        alert(err);
                                    });

                            })


                    });

            }








        }
    }


    $scope.logout=function(){
			//login
		signup().logout()
		.then(function (user) {
			console.log('Logged Out');
			$scope.$apply();
			window.location.reload();
			//signup.setSession(user)
		}, console.error)

			}

	
})