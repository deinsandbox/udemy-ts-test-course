import { toUpperCaseWithCallback } from "./fake"

describe('Utils>Fake', () => {
    test('should launch callback for invalid argument', () => {
        const arg = '';
        const fakeCallback = () => {}
        const actual = toUpperCaseWithCallback(arg, fakeCallback)
        expect(actual).toBeUndefined();
    })

    test('should launch callback for valid argument', () => {
        const arg = 'test';
        const fakeCallback = () => {};
        const expected = 'TEST';
        const actual = toUpperCaseWithCallback(arg, fakeCallback)
        expect(actual).toBe(expected);
    })
})