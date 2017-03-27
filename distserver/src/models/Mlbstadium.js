Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var MlbstadiumSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  state: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
});

exports.default = mongoose.model('Mlbstadium', MlbstadiumSchema);