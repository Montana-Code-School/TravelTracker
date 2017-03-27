Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var AirportSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  }
});

exports.default = mongoose.model('Airport', AirportSchema);