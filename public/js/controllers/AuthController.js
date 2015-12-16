'use strict'
console.log("Inside the AuthController");
	app.controller('AuthController', AuthController);


function AuthController($http, $auth, $state) {
  var self = this;
  console.log("Logging from the AuthController");

  self.login = function(){
    var credentials = {
      username: self.username,
      password: self.password
    }
    $auth.login(credentials).then(function(data){
      console.log($auth.isAuthenticated());
      var user = data.data.user;
      console.log(self);
      // debugger;
      // console.log(typeof(data));
      // console.log(user._id + " data");
      console.log(user + " the whole object");
      $state.go('user', {user: user._id});

    });
  },
    self.logout = function(){
      $auth.logout()
           .then(function(){
             console.log("Logging from logout");
             $state.go('login');
      });
    }
    self.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
  }
