var app = Built.App('blt2ef054f0bf794890').persistSessionWith(Built.Session.LOCAL_STORAGE);
var signup = app.User;
var todo = angular.module('myApp', []);
var auth = signup.isAuthenticated();
var appClass = app.Class('topic_list');
var query = appClass.Query();
var todo_list = appClass.Object;


