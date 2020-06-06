const crypto = require('crypto')
require('dotenv').config()

const DADOS_CRIPTOGRAFAR = {
    algoritmo: process.env.ALGORITM_CRYPTO,
    segredo: process.env.SECRET_CRYPTO,
    tipo: process.env.TYPE_CRYPTO
}

function criptograph(senha) {
    try {
        const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo)
        cipher.update(senha)
        return cipher.final(DADOS_CRIPTOGRAFAR.tipo)
    } catch (error) {
        console.log(`crypto error: ${error.message}`)
    }

}

module.exports = criptograph
