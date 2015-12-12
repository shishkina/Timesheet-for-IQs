var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRoutes = require('./config/userRoutes.js'),
    authorizationRoutes = require('./config/authorizationRoutes.js'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    expressJWT = require('express-jwt'),
    app = express();
//use public folder for static pages
app.use(express.static('public'));
var secret = "This is secret";

//use bodyParser for JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//use mogan in dev environment
app.use(morgan('dev'));


app.use('/users/:id', expressJWT({secret:secret}), function(err, req, res, next){
  if(err.name ==='UnauthorizedError'){
    //status 401 is Unauthorized code
    res.status(401).json({
      msg: "You need an authorization token to your confidential information."
    })
  }
});

app.use('/users', userRoutes);
app.use('/authenticate', authorizationRoutes);
mongoose.connect('mongodb://localhost/timeSheetApp', function(err){
  if (err){
    console.log(err);
  } else {
    console.log("connection successful");
  }
});
app.listen(3000, function(){
  console.log("Listening on port 3000..");
});

//this method assigns a current userId to a sessionId for a persisitent session
// var restrictAccess = function(req, res, next){
//   var sessionId = res.session.currentUser;
//   var reqId = req.params.id;
//   sessionId = reqId ? next() : res.status(400).send({err: 400, msg: "You do not have access"});
// };
//
// var authenticate = function(req, res, next){
//   req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "You must log in"});
// };
//
// app.get('/current_user', function(req, res){
//   if (req.session.currentUser){
//     User.findById(req.session.currentUser, function(err, user){
//       res.send(user);
//     });
//   } else {
//     res.status(404);
//     res.send({err:404, msg: "You must be logged in."});
//   }
// });
// app.post('/users', function(req, res){
//   var user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//   user.save(function(err){
//     if(err){
//       console.log(err);
//     } else {
//       console.log('User saved!');
//       res.send(user);
//     }
//   });
// });
// app.get('/users', function(req, res){
//   User.find().exec(function(err, users){
//     res.send(users);
//   });
// });
// app.get('/users/:id', authenticate, restrictAccess, function (req, res) {
//   User.findById(req.params.id).exec(function (err, user) {
//     res.send(user);
//   });
// });
//
// //Login post to sessions
// app.post('/sessions', function(req, res){
//   User.find({username: req.body.username}).exec(function(err, user){
//     if(user[0]){
//       user[0].comparePassword(req.body.password, function(err, isMatch){
//         if(isMatch){
//           req.session.currentUser = user[0]._id;
//           res.send('User' + user[0].username + 'successfully logged in');
//         } else {
//           res.status(400);
//           res.send({
//             err: 400,
//             msg:'Incorrect password.'
//           });
//         }
//       });
//     } else {
//       res.status(400)
//          .send('Unregistered user.');
//     }
//   });
// });
// //Logout delete session
// app.delete('/sessions', function(req, res){
//   req.session.destroy(function(err){
//     if(err){
//       res.status(400);
//       res.send({err: 400, msg: 'Logout error'});
//     } else {
//       res.send('User has successfully logged out.');
//     }
//   });
// });
