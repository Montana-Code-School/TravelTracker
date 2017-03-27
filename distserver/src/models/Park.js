Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var ParkSchema = new mongoose.Schema({
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
  name: String,
  latitude: String,
  logitude: String
});

exports.default = mongoose.model('Park', ParkSchema);