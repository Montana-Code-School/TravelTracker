let mongoose = require('mongoose');

let AirportSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('Airport', AirportSchema);
