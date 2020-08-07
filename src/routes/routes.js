const Router = require('express').Router()
const auth = require('../middlewares/auth')

const unipadController = require('../controllers/unipadController')
const authControler = require('../controllers/authController')

Router.get('/*', auth, unipadController.getUnipad)

Router.post('/exists', unipadController.getExists)

Router.post('/auth', authControler.PostLogin)

Router.post('/new', unipadController.postUrl)

Router.post('/verifyExpiredUrl', unipadController.verifyExpiratedUrl)

Router.delete('/expiration', unipadController.expirationUrl)

Router.put('/edit', unipadController.putUrl)

module.exports = Router