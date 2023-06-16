const mongoose = require('mongoose')
require('dotenv').config()

if (process.env.NODE_ENV) {
    try {
        const connection = mongoose.connect(process.env.CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, () => {
                console.log('CONNECTED TO MONGO ATLAS DATABASE')
            })

        module.exports = connection
    } catch (error) {
        console.log(error)
    }
} else {
    try {
        const connection = mongoose.connect('mongodb://localhost:27017/unipad',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, () => {
                console.log('CONNECTED TO LOCALHOST DATABASE')
            })

        module.exports = connection
    } catch (error) {
        console.log(error)
    }
}

