const Unipad = require('../models/unipad')

const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    // RETORNA O TOKEN - POST
    async PostLogin(req, res) {
        try {
            let { password, url } = req.body

            const unipad = await Unipad.findOne({ url: url, password: password })

            if (unipad) {
                const token = await jwt.sign({ id: unipad._id }, process.env.JWT_TOKEN, {
                    expiresIn: 1800,
                })

                res.json({
                    token
                })
            } else {
                return res.status(401).json({
                    success: false,
                    description: 'url não encontrada'
                })
            }
        } catch (error) {
            console.log(error.message, error.code);
        }
    }
}
