const Router = require('express').Router()
const auth = require('../middlewares/auth')

const unipadController = require('../controllers/unipadController')
const authControler = require('../controllers/authController')

Router.get('/*', auth, unipadController.getUnipad)

Router.post('/auth', authControler.PostLogin)

Router.post('/*', unipadController.postUrl)

Router.delete('/expiration', unipadController.expirationUrl)

Router.put('/edit/*', unipadController.putUrl)

module.exports = Router