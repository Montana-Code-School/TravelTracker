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
  },
  parks: {
    type: Array
  },
  elevations: {
    type: Array
  },
  mlbstadiums: {
    type: Array
  },
  airports: {
    type: Array
  }
});

export default mongoose.model('User', UserSchema);
