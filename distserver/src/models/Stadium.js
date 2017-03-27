Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var MlbstadiumSchema = new mongoose.Schema({
  name: {
    type: String
  },
  team: {
    type: String
  },
  state: {
    type: String
  }
});

exports.default = mongoose.model('Mlbstadium', MlbstadiumSchema);