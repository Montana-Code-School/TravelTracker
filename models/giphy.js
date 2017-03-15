let mongoose = require('mongoose');

let GiphySchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'NewUser'}
});

module.exports = mongoose.model('Giphy', GiphySchema);
