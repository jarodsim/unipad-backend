const Unipad = require('../models/unipad')
const ExpiredUrl = require('../models/expiredUrl')
const expiredUrl = require('../models/expiredUrl')

module.exports = {
    // GET - Url
    async getUnipad(req, res) {
        const url = req.originalUrl
        const unipadID = req.unipadid
        console.log('GET URL: ' + url)

        let unipad = ''
        try {
            unipad = await Unipad.findOne({ url })

            if (unipad !== null) {
                const unipadid = String(unipad._id)
                if (unipadid === unipadID) {
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
                        secure: unipad.secure,
                        url: unipad.url,
                        format: unipad.format,
                        description: 'id pertencente à outra url'
                    })
                }


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

    // Verifica se a URL existe
    async getExists(req, res) {
        let { url } = req.body
        url = `/pad${url}`
        console.log('POST EXISTS URL: ' + url)

        let unipad = ''
        try {
            unipad = await Unipad.findOne({ url })

            if (unipad !== null) {
                res.json({
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

    // POST - Url
    async postUrl(req, res) {
        let { password, expiration, format, secure, url } = req.body
        url = `/pad${url}`
        console.log(`POST - NEW URL: ${url}`);

        try {
            // verifica se a url já foi usada e adiciona o número de vezes
            const unipadExpired = await ExpiredUrl.findOne({ url })
            if (unipadExpired !== null) {
                await ExpiredUrl.findOneAndUpdate({ url }, {
                    numUsed: unipadExpired.numUsed + 1
                })
            }

            // verifica se a url existe
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
        let { pad, url, format } = req.body
        url = '/pad' + url
        console.log("PUT - URL: " + url)


        try {
            let unipad = await Unipad.findOne({ url })

            if (unipad !== null) {
                await Unipad.findOneAndUpdate({ url }, {
                    pad,
                    format
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

    async verifyExpiratedUrl(req, res) {
        try {
            const { url } = req.body

            const unipad = await ExpiredUrl.findOne({ url })

            if (unipad !== null) {
                console.log(unipad.viwed)
                if (unipad.viwed) {
                    return res.json({
                        success: true,
                        viwed: true
                    })
                } else {
                    await ExpiredUrl.findOneAndUpdate({ url }, {
                        viwed: true,
                    })

                    return res.json({
                        success: true,
                        viwed: false
                    })
                }
            } else {
                return res.json({
                    success: false,
                    description: 'url não encontrada'
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                description: 'erro na rota de verificação da url expirada',
                error: error.message
            })
        }
    },

    async expirationUrl(req, res) {
        try {
            let response = await Unipad.find()
            let today = new Date()

            for (let i = 0; i < response.length; i++) {
                if (response[i].expiration < today && response[i].expiration !== null) {
                    // salvando url expirada na tabela
                    await ExpiredUrl.create({
                        url: response[i].url,
                        dateExpiration: response[i].expiration,
                        dateExpired: today,
                        viwed: false,
                        numUsed: 1,
                    })

                    // deletando  a tabela
                    await Unipad.findOneAndDelete({ url: response[i].url })
                    console.log(`${response[i].url} deletado pois foi expirada`);
                }
            }

            return res.send(200)
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                description: 'erro na rota de deleção',
                error: error.message
            })
        }
    }
}