let mongoose = require('mongoose');

let AirportSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  }
});

export default mongoose.model('Airport', AirportSchema);
