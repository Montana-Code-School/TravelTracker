let mongoose = require('mongoose');

let ParkSchema = new mongoose.Schema({
  states: String,
  latLong: String,
  description: String,
  designation: String,
  parkCode: String,
  id: String,
  directionsInfo: String,
  directionsUrl: String,
  fullName: String,
  url: String,
  weatherInfo: String,
  name: String
});

module.exports = mongoose.model('Park', ParkSchema);