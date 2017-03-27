let mongoose = require('mongoose');

let MlbstadiumSchema = new mongoose.Schema({
  states: String,
  description: String,
  name: String,
  latitude: String,
  longitude: String
});

export default mongoose.model('Mlbstadium', MlbstadiumSchema);
