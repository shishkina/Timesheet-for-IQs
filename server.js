var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRoutes = require('./config/userRoutes.js'),
    authorizationRoutes = require('./config/authorizationRoutes.js'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    expressJWT = require('express-jwt'),
    User = require('./models/user.js'),
    app = express();
//use public folder for static pages
app.use(express.static('public'));
var secret = 'HelloSecret';

//use bodyParser for JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//use mogan in dev environment
app.use(morgan('dev'));

// app.use('/users/:id', expressJWT({secret:'HelloSecret'}), function(err, req, res, next){
//   if(err.name ==='UnauthorizedError'){
//     //status 401 is Unauthorized code
//     res.status(401).json({
//       msg: "You need an authorization token to your confidential information."
//     })
//   }
// });

app.use('/authenticate', authorizationRoutes);
app.use('/', userRoutes);

app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'HelloSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

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
