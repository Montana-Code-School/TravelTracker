let mongoose = require('mongoose');

let NflstadiumSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('Nflstadium', NflstadiumSchema);
