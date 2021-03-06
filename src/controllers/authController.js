const Unipad = require('../models/unipad')

const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    // RETORNA O TOKEN - POST
    async PostLogin(req, res) {
        try {
            let { password, url } = req.body
            url = `/pad${url}`
            console.log(`AUTH URL: ${url}`)
            const unipad = await Unipad.findOne({ url: url, password: password })

            if (unipad) {
                const token = await jwt.sign({ id: unipad._id }, process.env.JWT_TOKEN, {
                    expiresIn: 86400,
                })

                res.json({
                    token: token,
                    secure: unipad.secure
                })
            } else {
                return res.json({
                    success: false,
                    description: 'url não encontrada ou senha incorreta'
                })
            }
        } catch (error) {
            console.log(error.message, error.code)
        }
    }
}
