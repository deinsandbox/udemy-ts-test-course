import * as StringUtils from './string';

jest.mock('./string', () => ({
    // preserve the original module
    ...jest.requireActual('./string'),
    // override only the function that you want to mock
    calculateComplexity: jest.fn().mockImplementation(() => 10),
}));

jest.mock('node:crypto', () => ({
    randomUUID: () => '1',
}))

describe('String Utils', () => {
    test('should calculate complexity works', () => {
        const actual = StringUtils.calculateComplexity({} as any);
        const expected = 10;
        expect(actual).toBe(expected);
    })

    test('should return upper case text', () => {
        const actual = StringUtils.toUpperCase('test');
        const expected = 'TEST';
        expect(actual).toBe(expected);
    });

    test('should return lower case text', () => {
        const actual = StringUtils.toLowerCase('TEST');
        const expected = 'test';
        expect(actual).toBe(expected);
    });

    test('should return lower case text with and id', () => {
        const actual = StringUtils.toLowerCaseWithId('TEST');
        const expected = 'test-1';
        expect(actual).toBe(expected);
    })
});