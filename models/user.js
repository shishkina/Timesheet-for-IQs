var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  img_url: String,
  timesheet: [{
    date: Date,
    hoursWorked: Number,
    status: {
      type: String,
      default: 'pending'
    }
  }],
  // role: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Role'
  // }
  role: String
});

UserSchema.pre('save', function (next) {
  var user = this;

  //only hash the password if it has been modified
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if(err) return next();

    //hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if(err) return next();

      //override the users password with the hashed one
      user.password = hashedPassword;
      next();
    })
  })
})

UserSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};
UserSchema.methods.hasRole = function(user, role){
  return user.roles.IndexOf(role) >= 0;
}
// UserSchema.plugin(require('mongoose-role'), {
//   roles: ['consultant', 'manager', 'admin'],
//   accessLevels: {
//     'consultant': ['consultant', 'manager', 'admin'],
//     'manager': ['manager', 'admin'],
//     'admin': ['admin']
//   }
// });
// var newUser = new User({username: "gobichka", password: "poop", role:"admin"});

   var User = mongoose.model('User', UserSchema);
   var admin = new User({
       username: "admin",
       firstName: "mister",
       lastName: "Wonderful",
       email: "wonderful@gmail.com",
       password: "poop"

   });
        admin.save(function(err){
          if(err) res.json({msg: "Unable to create a user"})
            console.log(admin + "saving user");
        });


module.exports = User;
