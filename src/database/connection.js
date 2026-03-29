const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const connectionString = process.env.NODE_ENV === 'production' 
            ? process.env.CONNECTION_STRING 
            : 'mongodb://localhost:27017/unipad'
        
        const connection = await mongoose.connect(connectionString)
        
        if (process.env.NODE_ENV === 'production') {
            console.log('CONNECTED TO MONGO ATLAS DATABASE')
        } else {
            console.log('CONNECTED TO LOCALHOST DATABASE')
        }
        
        return connection
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }
}

module.exports = connectDB

