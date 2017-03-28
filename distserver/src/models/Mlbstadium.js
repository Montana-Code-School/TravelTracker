Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var MlbstadiumSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

exports.default = mongoose.model('Mlbstadium', MlbstadiumSchema);