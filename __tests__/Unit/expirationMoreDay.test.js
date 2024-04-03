describe('Add 3 more days to date of expiration', () => {
    
    it('should add 3 more hours to the date selected by the user ', () => {
        const dateSelected = new Date('2024-10-01 00:00:00')
        const dateExpected = new Date('2024-10-01 03:00:00')

        dateSelected.setHours(dateSelected.getHours() + 3)
        
        expect(dateSelected).toEqual(dateExpected)
    })
})