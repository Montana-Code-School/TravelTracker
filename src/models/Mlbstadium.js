let mongoose = require('mongoose');

let MlbstadiumSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  state: {
    type: String
  }
});

export default mongoose.model('Mlbstadium', MlbstadiumSchema);
