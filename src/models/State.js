let mongoose = require('mongoose');

let StateSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('State', StateSchema);
