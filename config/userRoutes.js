var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')
    bodyParser = require('body-parser');

var userController = require('../controllers/user.js');

    // router.route('/')
    //       .get(userController.getUsers)
    //       .post(userController.createUser);
    //
    // router.route('/:id')
    //       .get(userController.getUser);
    router.get('/:id', function(req, res){
        console.log("anything");
        var id = req.params.id;
        console.log("id from the route " + id);
        User.findById({_id:id}, function(err, user){
          if(err) res.json({msg: "Could not find user"});
            console.log("user " + user);
          res.send({user:user});
        });
    });
    router.get('/', function(req, res){
            User.find({}, function(err, users){
              if(err) console.log("There are no users in your database");

              res.send({users: users});
            });
    });
    router.post('/', function(req, res){
        console.log(req.body);
        var user = new User(req.body);
        user.save(function(err){
          if(err) res.json({msg: "Unable to create a user"})

          res.send({user:user});
        });
    });




module.exports = router;
