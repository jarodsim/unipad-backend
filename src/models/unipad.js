const mongoose = require('mongoose')

const UnipadSchema = new mongoose.Schema({
    password: {
        type: String,
        min: 3,
        default: null,
        required: false
    },

    secure: {
        type: Boolean,
        required: true
    },

    pad: {
        type: String,
        default: " ",
        required: false,
    },

    format: {
        type: String,
        default: 'text',
        required: false
    },

    url: {
        type: String,
        unique: true,
        required: true
    },

    expiration: {
        type: Date,
        default: ''
    },
})


module.exports = mongoose.model('Unipad', UnipadSchema)