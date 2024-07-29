import { PasswordChecker, PasswordStrength } from "./PasswordChecker"

describe('PasswordChecker test suite', () => {
    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    describe('checkPassword', () => {
        it('should complains with all validations', () => {
            const password = 'aA345678'
            const expected = {
                valid: true,
                reason: []
            }
            const actual = sut.checkPassword(password)
            expect(actual).toStrictEqual(expected)
            expect(actual.reason).toHaveLength(0)
        })

        it('should not have less than 8 chars', () => {
            const password = '1234567'
            const actual = sut.checkPassword(password)
            expect(actual.valid).toBe(false)
            expect(actual.reason).toContain(PasswordStrength.SHORT)
        })

        it('should have almost an upper case letter', () => {
            const password = '12345678a'
            const actual = sut.checkPassword(password)
            expect(actual.valid).toStrictEqual(false)
            expect(actual.reason).toContain(PasswordStrength.NO_UPPERCASE)
        })

        it('should have almost a lower case letter', () => {
            const password = '12345678A'
            const actual = sut.checkPassword(password)
            expect(actual.valid).toStrictEqual(false)
            expect(actual.reason).toContain(PasswordStrength.NO_LOWERCASE)
        })


    })

    describe('checkAdminPassword', () => {
        it('should complains with all validations', () => {
            const password = 'aA3456*8'
            const expected = {
                valid: true,
                reason: []
            }
            const actual = sut.checkAdminPassword(password)
            expect(actual).toStrictEqual(expected)
        })

        it('should have at least one especial character', () => {
            const password = '12345678aA'
            const actual = sut.checkAdminPassword(password)
            console.log({actual})
            expect(actual.valid).toStrictEqual(false)
            expect(actual.reason).toContain(PasswordStrength.NO_SPECIAL)
        })

        it('should have at least one number', () => {
            const password = 'aA*'
            const actual = sut.checkAdminPassword(password)
            expect(actual.valid).toStrictEqual(false)
            expect(actual.reason).toContain(PasswordStrength.NO_NUMBER)
        })
    })

})