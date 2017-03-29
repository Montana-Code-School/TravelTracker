let mongoose = require('mongoose');

let CollectionSchema = new mongoose.Schema({
  collections: Object
});

export default mongoose.model('Collection', CollectionSchema);
