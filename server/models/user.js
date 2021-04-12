const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  dateOfBirth: Date,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  this.updated = Date.now;
  next();
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = { User };
