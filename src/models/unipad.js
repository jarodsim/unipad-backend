const mongoose = require('mongoose')

const UnipadSchema = new mongoose.Schema({
  hash: {
    type: String,
    default:
      '111bcc1ec27193593ecac13d561c6b7e3014a27a2a37aa0267eec2bc81c3c6213955d63c742651116108abc661f3b3f256f347f3b5bdcc54a6b671bcb49c4822',
  },

  salt: {
    type: String,
    default: 'a5b765340fb0b3746b5f37e5eafcf83b',
  },

  secure: {
    type: Boolean,
    required: true,
    default: false,
  },

  pad: {
    type: String,
    default: ' ',
    required: false,
  },

  format: {
    type: String,
    default: 'js',
    required: false,
  },

  url: {
    type: String,
    unique: true,
    required: true,
  },

  expiration: {
    type: Date,
    default: null,
  },

  dateCreation: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Unipad', UnipadSchema)
