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
  console.log("anything");
  var id = req.params.id;
  console.log("this is id: " + id);
  User.findById({_id:id}, function(err, user){
    if(err) res.json({msg: "Could not find user"});
    console.log("user " + user);

    res.send(user);
  });
}

module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  getUser: getUser
}
