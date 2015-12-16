'use strict'
console.log("inside the UserController");
	app.controller('UserController', UserController);


function UserController($http, $auth, $state, $stateParams){


      var self = this;
		 	self.updateOne = {};
      // self.all = [];
      var userId = $stateParams.user;
      if($auth.isAuthenticated) {
        console.log("this is excecuting");
        getUser();
      }else{
        $state.go('login');
      }
      function getUser(){
        //this is working
        console.log("Logging from inside getUser");
          $http({
            url: "/users/" + userId,
            method: "GET"
          }).then(function(data){
            console.log("this is user " + self.user);
            self.user = data.data.user;
            // console.log("self.user.data.user " + self.user.data.user);
          });
      }
			function updateUser(){
				console.log("in update User now");
				$http({
					method: 'PATCH',
					url: "/users/" + userId,
					data: self.updateOne,
					headers: {'Content-Type':'application/json'}
				}).then( function(data) {
						//assuming you need data.data ...
					self.user = data.data.user;
      	$state.go('user', {user: user._id});
				})
			}
      function getUsers(){
        //using factory
        // userData.getUsers()
        //         .$promise
        //         .then(function(res){
        //           self.all = res.users;
        //         })
        //         .catch(function(res){
        //           $log.error('failure', res);
        //         })
        $http({
          url: "/users",
          method: "GET"
        }).then(function(data){
          console.log("this is data" + data);
          self.users = data.data.users;
        })
      }
//ndid not use, used auth.signup() instead
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
          data: JSON.stringify(data)
        }).success(function(data){
          $state.go('login');
        })
      }
  }
