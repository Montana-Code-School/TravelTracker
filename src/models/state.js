let mongoose = require('mongoose');

let StateSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('State', StateSchema);
