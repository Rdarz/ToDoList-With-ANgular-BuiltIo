var app = Built.App('blt2ef054f0bf794890');
var todo = angular.module('myApp', []);
var appClass=app.Class('topic_list');
todo.controller('userController', function($scope) {

    $scope.users = [];
    console.log("loading");
    todo.service("myService", MyService());

    function MyService() {
    	$scope.users = [];
        console.log("service loaded.");
        var query = app.Class('topic_list').Query();

        query
            .toJSON()
            .exec()
            .then(function(objects) {


                // for (var i = 0; i < objects.length; i++) {
                //     alert("here");  
                //     $scope.users.push(objects[i].topic);
                //     console.log($scope.users);
                //      // array of plain javascript objects
                // } // array of plain javascript objects

                objects.map(function(obj) {
                    $scope.users.push({topic:obj.topic,done:obj.done});
                    $scope.$apply();
                    //return something;
                });
            });

    }

    console.log($scope);
    $scope.value = true;
    var curr_user;


    $scope.add = function() {
        if ($scope.topic != null) {
            // $scope.users.push($scope.topic);
            var todo = $scope.topic;

            var todo_list = appClass.Object;
            todo_list({
                    topic: todo,
                    done:false
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
     $scope.checkbox = function(event,done) {
     	alert(done);
     	var query   = appClass.Object;
if(done==true){
var up=query({topic:event,done:true});
up      = up.upsert({topic:event});
up.save().then(function(person){
console.log("checked");
});
}else{
var up=query({topic:event,done:false});
up      = up.upsert({topic:event});
up.save().then(function(person){
console.log("unchecked");
});

}
     };

    $scope.remove = function(user) {

        var index = $scope.users.indexOf(user);

        //this.unchecked = false;
        var query = appClass.Query();
        // query=query.where();
        query
            .toJSON()
            .exec()
            .then(function(objects) {


                // for (var i = 0; i < objects.length; i++) {
                //     alert("here");  
                //     $scope.users.push(objects[i].topic);
                //     console.log($scope.users);
                //      // array of plain javascript objects
                // } // array of plain javascript objects

                objects.map(function(obj) {             
                	if(user==obj.topic){
		                   query= query.containedIn('uid',obj.uid);
		                    query.delete()
		                    .then(function(data){		              
		                    	$scope.users.splice(index, 1);
		                    	$scope.$apply();		                    	
		                    })
                    }
                    //return something;
                });
            });
        // $scope.users.splice(index, 1);
        // this.unchecked.push(index);
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

                



                  var query = appClass.Query();
        // query=query.where();
        query
            .toJSON()
            .exec()
            .then(function(objects) {


        //         // for (var i = 0; i < objects.length; i++) {
        //         //     alert("here");  
        //         //     $scope.users.push(objects[i].topic);
        //         //     console.log($scope.users);
        //         //      // array of plain javascript objects
        //         // } // array of plain javascript objects

        //         objects.map(function(obj) {             
        //         	if(user==obj.topic){
		      //              query= query.containedIn('uid',obj.uid);
		      //               query.setReference('topic',user)
		      //               .save()
		      //               .then(function(data){		              
		      //               	$scope.users.splice(index, 1);
        //         $scope.users.splice(index, 0, user);
		      //               	$scope.$apply();		                    	
		      //               })
        //             }
        //             //return something;
        //         });
        //     });



					


					   
            // $scope.users.push($scope.topic);
            var todo = user;

            var todo_list = appClass.Object;

    
  

            var updt=todo_list({ topic: todo
                });


             	          
                	
            updt=updt.upsert({topic:curr_user});
            updt.save()
                .then(function() {
                    			alert("saved"); 
	                            $scope.users.splice(index, 1);
    				            $scope.users.splice(index, 0, user); // array of plain javascript objects
                    	        $scope.$apply();
                }, function(err) {
                    			alert(err);
                });
          
      						 
      	

});

            							}
        }
    }
})