const Router = require('express').Router()

const unipadController = require('../controllers/unipadController')

Router.get('/*', unipadController.getUnipad)

Router.post('/auth', unipadController.postLogin)

Router.post('/new', unipadController.postUrl)

Router.delete('/expiration', unipadController.expirationUrl)

Router.put('/edit', unipadController.putUrl)

module.exports = Router