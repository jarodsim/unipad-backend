/**
 * credits to https://marquesfernandes.com/tecnologia/criptografando-e-armazenando-senhas-com-nodejs-melhores-praticas/
 */
require('dotenv').config()
const crypto = require('crypto')

const config = {
  TYPE: process.env.TYPE,
  RANDOMBYTES: Number(process.env.RANDOMBYTES),
  ALGORITM: process.env.ALGORITM,
}

function generateSalt() {
  return crypto.randomBytes(config.RANDOMBYTES).toString(config.TYPE)
}

function generateHasAndSalt(pass, salt) {
  let hash = crypto.createHmac(config.ALGORITM, salt)
  hash.update(pass)
  hash = hash.digest(config.TYPE)
  return {
    salt,
    hash,
  }
}

function generatePass(pass) {
  var salt = generateSalt(config.RANDOMBYTES)
  var passSalt = generateHasAndSalt(pass, salt)

  return {
    hash: passSalt.hash,
    salt: passSalt.salt,
  }
}

function validatePass(loginPass, salt, hash) {
  var passESalt = generateHasAndSalt(loginPass, salt)
  return hash === passESalt.hash
}

module.exports = {
  generateSalt,
  generateHasAndSalt,
  generatePass,
  validatePass,
}
