let mongoose = require('mongoose');

let ElevationSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('Elevation', ElevationSchema);
