const mongoose = require('mongoose');

const { Schema } = mongoose;

const fountainSchema = new Schema({
  lat: {
    type: String,
    trim: true,
  },
  lng: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  place: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  image: {
    data: Buffer,
    contentType: String,
    type: String
  },
  // added postAuthor to link with context user when adding a fountain
  postAuthor: {
    type: String,
    trim: true,
  }
});

const Fountain = mongoose.model('Fountain', fountainSchema);

module.exports = Fountain;