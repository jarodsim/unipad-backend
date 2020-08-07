const mongoose = require('mongoose')

const expiredUrlsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    dateExpiration: {
        type: Date,
        required: true
    },
    dateExpired: {
        type: Date,
        required: true,
        default: Date.now
    },
    viwed: {
        type: Boolean,
        required: true
    },
    numUsed: {
        type: Number,
        required: false
    }

})

module.exports = mongoose.model('expiredUrl', expiredUrlsSchema)