Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

exports.default = mongoose.model('State', StateSchema);