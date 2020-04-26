const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  instance: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Bots', schema);