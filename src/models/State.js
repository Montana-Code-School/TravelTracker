let mongoose = require('mongoose');

let StateSchema = new mongoose.Schema({
  name: {
    type: String
  },
  states: {
    type: String
  },
  description: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
});

export default mongoose.model('State', StateSchema);
