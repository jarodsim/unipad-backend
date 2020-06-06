const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.json({ success: false, description: 'sem header' })
        }

        const parts = authHeader.split(' ')

        if (!parts.length === 2) {
            return res.json({ success: false, description: 'token error' })
        }

        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return res.json({ success: false, description: 'token malformated' })
        }

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) return res.json({ success: false, description: 'token inválido' })

            req.userId = decoded.id

            return next()
        })
    } catch (error) {
        console.log(error)
    }
}