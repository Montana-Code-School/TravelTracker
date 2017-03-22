let mongoose = require('mongoose');

let StadiumSchema = new mongoose.Schema({
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

export default mongoose.model('Stadium', StadiumSchema);
