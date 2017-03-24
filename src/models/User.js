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
  stadiums: {
    type: Array
  },
  airports: {
    type: Array
  }
});

export default mongoose.model('User', UserSchema);
