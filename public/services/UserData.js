'use strict'
app.factory('userData', ['$resource', userDataFactory]);

function userDataFactory($resource){
  var User = $resource('/users');

  return {
    getUsers: function(){
      return User.get();
    },
    createUser: function(userData){
      return new User(userData).$save();
    },
    deleteUser: function(user){
      return User.delete({id:user._id})
    }
  };
}
