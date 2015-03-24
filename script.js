// var app=Built.App('blt2ef054f0bf794890');

//var user = app.User

function create(){
	//New user create
var email="darji.rahul316@gmail.com";
var password="builtio";
var password_confirm="builtio";
	app.register(email,password,password_confirm);

}

function submit(){
 
 var email=document.getElementById('username').value;
 var password=document.getElementById('password').value;


//login
user().login(email , password)
.then(function (result) {
	console.log('Logged In')
	console.log(user.isAuthenticated())

}, console.error)
}

function retrieve(){

	var query   = Built.App('blt2ef054f0bf794890').Class('user').Query();
  query
    
    .toJSON()
    .exec()
    .then(function(objects){
    	for(var i=0;i<objects.length;i++){
    
        console.log(objects[i].username); // array of plain javascript objects
        console.log(objects[i].password); 
        }// array of plain javascript objects
    });
}