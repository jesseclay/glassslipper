var Mongoose = require('mongoose');

var userSchema = new Mongoose.Schema({
  "email": String,
  "passwordHash": String,
});

exports.user = Mongoose.model('user', userSchema);