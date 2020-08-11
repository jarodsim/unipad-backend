describe('Add 3 more days to date of expiration', () => {
    
    it('should add 3 more hours to the date selected by the user ', () => {
        const dateUser = new Date('Fri Aug 7 2020 20:00:00')
        // Fri Aug 28 2020 00:57:00 GMT-0300 (Horário Padrão de Brasília)
        const newDateUser = new Date(dateUser.getTime() + 3 * 3600000)

        expect(newDateUser.toString()).toBe('Fri Aug 07 2020 23:00:00 GMT-0300 (GMT-03:00)')
    })
})