const Unipad = require('../models/unipad')

const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    // PASSWORD - POST
    async PostLogin(req, res) {
        try {
            let { password } = req.body
            
            const unipad = await Unipad.findOne({ password: password })

            if (unipad) {
                const token = await jwt.sign({ id: unipad._id }, process.env.JWT_TOKEN, {
                    expiresIn: 86400,
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
