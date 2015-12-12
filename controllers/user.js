var User = require('../models/user.js');


function getUsers(req, res){
      User.find(function(err, users){
        if(err) console.log("There are no users in your database");

        res.json({users:users});
      })

};

function createUser(req, res){
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err){
    if(err) res.json({msg: "Unable to create a user"})

    res.json(user);
  });
}

function getUser(req, res){
  var id = req.params.id;

  User.findById({_id:id}, function(err, user){
    if(err) res.json({msg: "Could not find user"});

    res.json({user:user});
  })
}
module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  getUser: getUser
}



    //access allowed only for the admin
    // var fetchAndRenderUsers = function(){
    //   $.get('/users').done(renderUsers);
    // }
    var fetchAndRenderSession = function() {
      $.get('/current_user').done(function(user) {
        console.log("inside current_user");
      //   if (user) {
      //     $('#session').html(userTemplate(user));
      //   } else {
      //     $('#session').html(loginTemplate());
      //   }
      // }).fail(function(jqXHR) {
      //   if (jqXHR.status === 404) {
      //     $('#session').html(loginTemplate());
      //   }
      });
    };

    var signup = function(){
      var username = $('#signup-username').val();
      var password = $('#signup-password').val();

    $.post('/users', {
      username: username,
      password: password
    })
    .done($.get('/users', function(req,res){
      res.render('home');
    }));

  };
    var login = function(){
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      $.post('/sessions', {
        username: username,
        password: password
      }).done(fetchAndRenderSession).fail(function(res){
        var err = res.responseJSON;
        alert(err.err + '-' + err.msg);
      });
    };

    var logout = function(){
      $.ajax({
        url:'/sessions',
        method: 'DELETE',
      }).done(fetchAndRenderSession);
    };
