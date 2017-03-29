Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var CollectionSchema = new mongoose.Schema({
  collections: Object
});

exports.default = mongoose.model('Collection', CollectionSchema);