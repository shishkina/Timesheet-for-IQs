var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
  role: String
});

var Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
