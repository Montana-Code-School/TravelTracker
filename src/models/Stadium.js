let mongoose = require('mongoose');

let MlbstadiumSchema = new mongoose.Schema({
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

export default mongoose.model('Mlbstadium', MlbstadiumSchema);
