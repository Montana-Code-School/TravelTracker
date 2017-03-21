let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  admin: {
    type: Boolean
  },
  states: {
    type: Array
  }
});

module.exports = mongoose.model('User', UserSchema);
