Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var ElevationSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

exports.default = mongoose.model('Elevation', ElevationSchema);