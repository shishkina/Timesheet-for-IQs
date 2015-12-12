'use strict'
console.log("inside the controller");
app.controller('UserController', ['$log', '$http', UserController]);


function UserController($log, $http){
      var self = this;
      $log.info(self);
      getUsers();
      function getUsers(){
        $http({
          method: 'GET',
          url: '/users'
        }).then(function(res){
          self.all = res.data;
        }, function(err){
          console.log(err);
        });
      }
  }




}]);
