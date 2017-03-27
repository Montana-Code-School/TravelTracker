let mongoose = require('mongoose');

let StateSchema = new mongoose.Schema({
  name: {
    type: String
  },
  abbreviation: {
    type: String
  }
});

export default mongoose.model('State', StateSchema);
