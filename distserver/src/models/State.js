Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({
  name: {
    type: String
  },
  abbreviation: {
    type: String
  }
});

exports.default = mongoose.model('State', StateSchema);