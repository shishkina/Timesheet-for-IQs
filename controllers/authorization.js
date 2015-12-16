'use strict'
var User = require('../models/user.js');

var jwt = require('jsonwebtoken');
var secret = 'HelloSecret';

function makeToken(req, res){
  //need to check the credentials first

  User.findOne({
    username: req.body.username
  }, function(err, user){
    // console.log(user);
    if(err) console.log(err);
    if(!user){
      res.json({success: false, message:'Authentication failed.User not found.'});
    } else if(user){
      //
          user.comparePassword(req.body.password, function (err, isMatch) {
      if(isMatch) {
            console.log("printing user " + user);

        //only assosiate certain information with the token, do not show roles
        // var tokenInfo = {
        //   //is empty for some reason!
        //   username: user.username,
        //   password: user.password,
        //   id: user.id
        // }
          var token = jwt.sign(user, secret);
          console.log("sending token " + token);
          console.log("User being passed to token " + user);
          //changed res.json to res.send
          res.send({
            user: user,
            token: token
          });
      }else {
        res.sendStatus(401);
        // res.({success: false, message: 'Authentication failed.Wrong password.'});
    }
  });
  }
  });
}
  module.exports = {
    makeToken: makeToken
  }
