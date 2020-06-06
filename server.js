const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./src/database/connection')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const Rotas = require('./src/routes/routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(compression())
app.use('/pad', Rotas)

// database
connection

const PORT =  process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`rodando na porta ${PORT}`);
})