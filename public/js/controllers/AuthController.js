'use strict'
console.log("Inside the AuthController");
	app.controller('AuthController', AuthController);


function AuthController($scope,$http, $auth, $location, $state, $window) {
  // var self = this;
  console.log("Logging from the AuthController");

  $scope.login = function(){
    // var credentials = {
    //   username: self.username,
    //   password: self.password
    // }
    // $auth.login(credentials).then(function(data){
    //   console.log(self);
    //   console.log(data.username + "data.username");
    //   $state.go('user');
    //
    // });
            // $auth.login($scope.user)
            //       .then(function(){
            //         console.log(credentials);
            //         $location.path('/users');
            //       })
            //       .catch(function(error){
            //         console.log('error: ', arguments);
            //       })
            //
            $http.post('/authenticate', credentials)
                 .then(function(user){
                   console.log('success: ', user.data);
                   $auth.setToken(user.data.token);
                   $state.go('users',{id:user.data.id});
                 })
                 .catch(function(res){
                   //will catch the error object sent from the backend
                      console.log('error: ', arguments);
                    })




            // ({
            //   method: "POST",
            //   url: '/authenticate',
            //   data: {
                // token: $window.localStorage["satellizer_token"],
            //     username: self.username,
            //     password: self.password
            //   }
            // }).success(
            //   function(user){
            //   console.log("in success callback " + user);
            //
            //   self.user = user;
            // }, function(response){
            //   console.log(response);
            // })
  }
}
