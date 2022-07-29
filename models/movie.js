const mongoose = require('mongoose');
const urlRegexp = require('../constants/regexp-url');
const { wrongUrlFormat } = require('../constants/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegexp.test(v),
      message: wrongUrlFormat,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegexp.test(v),
      message: wrongUrlFormat,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegexp.test(v),
      message: wrongUrlFormat,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);