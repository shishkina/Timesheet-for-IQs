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
    router.get('/users', function(req, res){
            User.find({}, function(err, users){
              if(err) console.log("There are no users in your database");

              return res.send({users: users});
            });
    });
    router.post('/auth/signup', function(req, res){
        console.log(req.body);
        var user = new User(req.body);
        user.save(function(err){
          if(err) res.json({msg: "Unable to create a user"})
            console.log(user + "saving user");

           res.send({user:user});
        });
    });


    router.get('/users/:id', function(req, res){
        console.log("anything");
        var id = req.params.id;
        console.log("id from the route " + id);
        User.findById({_id:id}, function(err, user){
          if(err){
             console.error(err);
          }
          console.log("user " + user);
          res.send({user:user});
        });
    });
    router.patch('/users/:id', function(req, res){
        var id = req.params.id;
        console.log("id from the patch route " + id);
        User.findById({_id:id}, function(err, user){
          if(err){
            console.log(err);
          }
          if(req.body.username) user.username = req.body.username;
          if(req.body.firstName) user.firstName = req.body.firstName;
          if(req.body.lastName) user.lastName = req.body.lastName;
          if(req.body.email) user.email = req.body.email;
          if(req.body.password) user.password = req.body.password;
          // if(req.body.timesheet.date) user.timesheet.push({})
          // if(req.body.timesheet.date) user.timesheet.date = req.body.timesheet.date;
          // if(req.body.timesheet.hoursWorked) user.timesheet.hoursWorked = req.body.timesheet.hoursWorked;
          if(req.body.role) user.role = req.body.role;

          user.save(function(err){
            if(err){
              console.log(err);
            }
            res.send({user:user})
            console.log("updated user");
          });
        });
    });


module.exports = router;
