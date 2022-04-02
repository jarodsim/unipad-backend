const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./src/database/connection')
const { deleteExpiredPads } = require('./src/controllers/unipadController')
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config()
const { socketio, app, server, express } = require('./socket')

const Rotas = require('./src/routes/routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(express.json())
app.use(compression())
app.use(Rotas)

// database connection
connection

const PORT = process.env.PORT || 4000

// socketio
socketio()

setInterval(async () => {
  await deleteExpiredPads()
}, 900000)

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
