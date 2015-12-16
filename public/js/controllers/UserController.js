'use strict'
console.log("inside the UserController");
	app.controller('UserController', UserController);


function UserController($http, $auth, $state, $stateParams){
      var self = this;
      var userId = $stateParams.user;
      if(!$auth.isAuthenticated) {
        $state.go('login');
      }else{
        getUser();
      }
      function getUser(){
        console.log("Logging from inside getUsers");
          $http({
            url: "/users/" + userId,
            method: "GET"
          }).then(function(data){
            console.log("this is user " + self.user);
            self.user = data.data.user;
            // console.log("self.user.data.user " + self.user.data.user);
          });
      }
      // if($auth.isAuthenticated && self.user.role== "admin"){
      //   getUsers();
      // } else {
      //   $state.go('home');
      // }

      function getUsers(){
        $http({
          url: "/users",
          method: "GET"
        }).then(function(data){
          console.log("this is data" + data);
          self.users = data.data.users;
        })
      }
      
      function createUser(){
        var data = $.param({
            username: self.username,
            firstName: self.firstName,
            lastName: self.lastName
        })
debugger;
        $http({
          url: "/users",
          method: "POST",
          data: data
        }).success(function(data){

        })
      }
  }
