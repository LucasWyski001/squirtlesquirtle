const mongoose = require('mongoose');

const { Schema } = mongoose;

// Reusable options for String fields
const stringOptions = {
  type: String,
  trim: true,
};

// Define the schema
const fountainSchema = new Schema({
  lat: stringOptions,
  lng: stringOptions,
  address: {
    ...stringOptions,
    required: true,
  },
  place: stringOptions,
  city: {
    ...stringOptions,
    required: true,
  },
  state: {
    ...stringOptions,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  image: {
    data: Buffer,
    contentType: String,
    type: String,
  },
  postAuthor: stringOptions,
});

const Fountain = mongoose.model('Fountain', fountainSchema);

module.exports = Fountain;