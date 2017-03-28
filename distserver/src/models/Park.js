Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var ParkSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

exports.default = mongoose.model('Park', ParkSchema);