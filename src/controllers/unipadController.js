const Unipad = require('../models/unipad')
const encript = require('../util/encripty')

module.exports = {
    // GET - Url
    async getUnipad(req, res) {
        const url = req.originalUrl
        console.log('GET URL: ' + url)

        let unipad = ''
        try {
            unipad = await Unipad.findOne({ url })

            if (unipad !== null) {
                res.json({
                    pad: unipad.pad,
                    secure: unipad.secure,
                    url: unipad.url,
                    format: unipad.format,
                    success: true,
                    description: 'url encontrada e retornada com sucesso'
                })
            } else {
                res.json({
                    success: false,
                    description: 'url nao existe'
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                description: 'erro na rota',
                error: error.message
            })
        }
    },

    // POST - login
    async postLogin(req, res) {
        let { url, password } = req.body
        //password = encript(password)
        url = '/pad' + url
        console.log('URL LOGIN:' + url)
        const response = await Unipad.findOne({ url: url, password: password })

        if (response !== null) {
            return res.json({ success: true, authorized: true })
        } else {
            return res.json({ success: false, authorized: false })
        }
    },

    // POST - Url
    async postUrl(req, res) {
        const url = req.originalUrl
        console.log(`POST - original url: ${url}`);

        let { password, expiration, format, secure } = req.body

        if (password !== null) {
            //password = encript(password)
            secure = true
        }

        try {
            let unipad = await Unipad.findOne({ url })

            if (unipad === null) {
                await Unipad.create({
                    url,
                    expiration,
                    format,
                    password,
                    secure
                })

                unipad = await Unipad.findOne({ url })
                return res.json({ url: unipad.url })
            } else {
                res.json({
                    success: false,
                    description: 'url já existe'
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                description: 'erro na rota',
                error: error.message
            })
        }
    },

    async putUrl(req, res) {
        let { pad, url } = req.body
        url = '/pad' + url
        console.log("PUT - URL: " + url)


        try {
            let unipad = await Unipad.findOne({ url })

            if (unipad !== null) {
                await Unipad.findOneAndUpdate({ url }, {
                    pad
                })

                unipad = await Unipad.findOne({ url })
                return res.json({
                    url: unipad.url,
                    pad: unipad.pad,
                    format: unipad.format
                })
            } else {
                res.json({
                    success: false,
                    description: 'url não encontrada'
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                description: 'erro na rota',
                error: error.message
            })
        }
    },

    async expirationUrl(rea, res) {
        try {
            let response = await Unipad.find()
            let today = new Date()

            for (let i = 0; i < response.length; i++) {
                if (response[i].expiration < today && response[i].expiration !== null) {
                    await Unipad.findOneAndDelete({ url: response[i].url })
                    console.log(`${response[i].url} deletado pois foi expirada`);
                }
            }

            res.send(200)
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                description: 'erro na rota',
                error: error.message
            })
        }
    }
}