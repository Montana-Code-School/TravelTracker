let mongoose = require('mongoose');

let NewUserSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('NewUser', NewUserSchema);
