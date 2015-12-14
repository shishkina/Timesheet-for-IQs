'use strict'
console.log("inside the UserController");
	app.controller('UserController', UserController);


function UserController($http, $window){
      var self = this;
      console.log( "Logging from UsersController" + self);
      self.getUsers = function(){
        console.log("Logging from inside getUsers");


        //is not getting executed for some reason
        // $http({
        //   method: "POST",
        //   url: '/authenticate',
        //   data: {
        //     'x-access-token': $window.localStorage["satellizer_token"]
        //   }
        // }).success(function(user){
        //   console.log("in success callback" + user);
        //   self.user = user;
        // }, function(response){
        //   console.log(response);
        // })


      }
  }
