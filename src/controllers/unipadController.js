const Unipad = require('../models/unipad')
const { generatePass } = require('../util/crypto')

module.exports = {
  /**
   * Create or return the url data
   */
  handleUrl: async (req, res) => {
    const { url, expiration, format, password, secure } = req.body

    try {
      const existingUnipad = await Unipad.findOne({ url })

      if (existingUnipad !== null) {
        return res.json({
          pad: existingUnipad.pad,
          secure: existingUnipad.secure,
          url: existingUnipad.url,
          format: existingUnipad.format,
          success: true,
        })
      } else {
        if (secure) {
          const { hash, salt } = generatePass(password)

          const newUnipad = await Unipad.create({
            url,
            expiration,
            format,
            password,
            secure,
            hash,
            salt,
          })

          return res.json({
            pad: newUnipad.pad,
            secure: newUnipad.secure,
            url: newUnipad.url,
            format: newUnipad.format,
            success: true,
          })
        } else {
          const newUnipad = await Unipad.create({
            url,
            expiration,
            format,
            secure,
          })

          return res.json({
            pad: newUnipad.pad,
            secure: newUnipad.secure,
            url: newUnipad.url,
            format: newUnipad.format,
            success: true,
          })
        }
      }
    } catch (error) {
      console.log('error in handleUrl ' + error)
      return res.json({
        success: false,
        error: error.message,
      })
    }
  },

  getUnipad: async (req, res) => {
    const unipad_token_id = req.unipadid
    const { url } = req.body

    try {
      const unipad = await Unipad.findOne({ url })
      if (unipad !== null) {
        const unipadid = String(unipad._id)
        if (unipadid === unipad_token_id) {
          res.json({
            pad: unipad.pad,
            secure: unipad.secure,
            url: unipad.url,
            format: unipad.format,
            success: true,
          })
        } else {
          if (!unipad.secure) {
            res.status(401).json({
              success: false,
              error: 'unauthenticated',
            })
          } else {
            res.status(403).json({
              success: false,
              error: 'not authorized',
            })
          }
        }
      } else {
        res.status(404).json({
          success: false,
          error: 'url not found',
        })
      }
    } catch (error) {
      console.log('error in get url: ' + error)
      res.json({
        success: false,
        error: error.message,
      })
    }
  },

  putUrl: async (req, res) => {
    const { pad, url, format, onlyformat = false } = req.body
    const unipad_token_id = req.unipadid

    try {
      const unipad = await Unipad.findOne({ url })

      if (unipad !== null && String(unipad._id) === unipad_token_id) {
        if (onlyformat) {
          const unipad_updated = await Unipad.findOneAndUpdate(
            { url },
            {
              $set: {
                format,
              },
            },
            {
              new: true,
            }
          )
          return res.json({
            success: true,
            url: unipad_updated.url,
            pad: unipad_updated.pad,
            format: unipad_updated.format,
          })
        } else {
          const unipad_updated = await Unipad.findOneAndUpdate(
            { url },
            {
              pad,
              format,
            },
            {
              new: true,
            }
          )
          return res.json({
            success: true,
            url: unipad_updated.url,
            pad: unipad_updated.pad,
            format: unipad_updated.format,
          })
        }
      } else {
        res.json({
          success: false,
          error: 'url dont found',
        })
      }
    } catch (error) {
      console.log('error on update pad: ' + error)
      return res.json({
        success: false,
        error: error.message,
      })
    }
  },

  deleteExpiredPads: async () => {
    try {
      const now = new Date()
      console.log('deleting expired urls')

      await Unipad.deleteMany({
        expiration: {
          $lt: now,
        },
      })

      console.log('expired urls deleted')
    } catch (error) {
      console.log('error in delete expired urls ' + error)
    }
  },
}
