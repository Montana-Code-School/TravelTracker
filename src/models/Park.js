let mongoose = require('mongoose');

let ParkSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('Park', ParkSchema);
