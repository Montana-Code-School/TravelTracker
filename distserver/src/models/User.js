Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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
  },
  parks: {
    type: Array
  },
  mlbstadiums: {
    type: Array
  },
  airports: {
    type: Array
  }
});

exports.default = mongoose.model('User', UserSchema);