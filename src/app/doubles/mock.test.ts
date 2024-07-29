import { toUpperCaseWithCallback } from "./mock"

describe('Utils>Mock', () => {
    let callbackArgs: string[] = [];
    let timesCalled = 0;

    const mockCallback = (arg: string): void => {
        callbackArgs.push(arg);
        timesCalled++;
    }

    beforeEach(() => {
        // clearing tracking fields
        callbackArgs = [];
        timesCalled = 0;
    });

    test('should launch callback for invalid argument', () => {
        const arg = '';
        const actual = toUpperCaseWithCallback(arg, mockCallback)
        expect(actual).toBeUndefined();
        expect(timesCalled).toBe(1);
        expect(callbackArgs).toEqual(['Invalid argument']);
    })

    test('should launch callback for valid argument', () => {
        const arg = 'test';
        const expected = 'TEST';
        const actual = toUpperCaseWithCallback(arg, mockCallback)
        expect(actual).toBe(expected);
        expect(timesCalled).toBe(1);
        expect(callbackArgs).toEqual(['called function with test']);
    })
})