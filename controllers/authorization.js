'use strict'
var User = require('../models/user.js');

const jwt = require('jsonwebtoken');
const secret = "HelloSecret";

function makeToken(req, res){
  //need to check the credentials first
  User.findOne({
    username: req.body.username
  }, function(err, user){
    if(err) console.log(err);
    if(!user){
      res.json({success: false, message:'Authentication failed.User not found.'});
    } else if(user){
          user.comparePassword(req.body.password, function (err, isMatch) {
      if(isMatch) {
          var token = jwt.sign(user, secret);

          res.json({
            success: true,
            message: 'Issued a token',
            token: token
          });
        console.log('This user successfully logged in: ' + user[0].username);
      }else {
        res.json({success: false, message: 'Authentication failed.Wrong password.'});
    }
  });
  }
  });
}
  module.exports = {
    makeToken: makeToken
  }


//   if(!(req.body.username === 'username' && req.body.password === 'password')){
//     res.send(401, "wrong username or password");
//     return;
//   }
//
//   var Info = {
//     username: req.body.username,
//     password: req.body.password,
//     id: '1234567'
//   }
//   var token = jwt.sign(Info, secret);
//   res.json({user: Info, token: token})
// }
