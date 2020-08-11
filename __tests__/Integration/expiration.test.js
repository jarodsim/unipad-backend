const Unipad = require('../../src/models/unipad')
const connection = require('../../src/database/connection')

describe('Expiration', () => {

    it('should to save the expiration in database', async () => {
        beforeAll(async () => {
            await connection
        })

        const dateUser = new Date('Fri Aug 10 2020 15:00:00')
        const newDateUser = new Date(dateUser.getTime() + 3 * 3600000)

        const URL = await Unipad.create({
            url: '/pad/teste',
            expiration: newDateUser,
            format: 'javascript',
            password: '123456789',
            secure: false
        })


        afterAll(async () => {
            await Unipad.findOneAndDelete({ url: '/pad/teste' })
            connection.close()
        })
        expect(URL.url).toBe('/pad/teste')
    })
})