const mongoose = require('mongoose')

const UnipadSchema = new mongoose.Schema({
    password: {
        type: String,
        min: 3,
        default: '027094dad39dc2757c1d3fa235e12f70',
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

    dateCreation: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Unipad', UnipadSchema)