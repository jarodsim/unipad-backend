const Router = require('express').Router()
const auth = require('../middlewares/auth')

const unipadController = require('../controllers/unipadController')
const authControler = require('../controllers/authController')

Router.post('/', unipadController.handleUrl)

Router.put('/get', auth, unipadController.getUnipad)

Router.post('/auth', authControler.PostLogin)

Router.put('/', auth, unipadController.putUrl)

Router.get('/', unipadController.ping)

module.exports = Router
