const jwt = require('jsonwebtoken')

const Unipad = require('../models/unipad')
const { validatePass } = require('../util/crypto')
require('dotenv').config()

module.exports = {
  // RETORNA O TOKEN - POST
  PostLogin: async (req, res) => {
    try {
      let { password, url } = req.body
      const unipad = await Unipad.findOne({ url: url })
      if (unipad) {
        if (unipad.secure) {
          const { hash, salt } = unipad
          if (validatePass(password, salt, hash)) {
            const token = jwt.sign({ id: unipad._id }, process.env.JWT_TOKEN, {
              expiresIn: 86400,
            })

            res.json({
              token: token,
              secure: unipad.secure,
              success: true,
            })
          } else {
            return res.status(403).json({
              success: false,
              description: 'url not found or password incorrect',
            })
          }
        } else if (!unipad.secure) {
          const token = jwt.sign({ id: unipad._id }, process.env.JWT_TOKEN, {
            expiresIn: 86400,
          })

          res.json({
            token: token,
            secure: unipad.secure,
            success: true,
          })
        }
      } else {
        return res.json({
          success: false,
          description: 'url not found or password incorrect',
        })
      }
    } catch (error) {
      console.log('error on auth: ' + error.message, error.code)
      return res.status(404).json({
        success: false,
        description: 'error on auth: ' + error.message,
      })
    }
  },
}
