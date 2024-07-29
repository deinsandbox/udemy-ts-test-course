import { StringUtils } from "./spy"

describe('Utils>Spies', () => {
    let sut: StringUtils;

    beforeEach(() => {
        sut = new StringUtils();
        jest.clearAllMocks();
    });

    test('should track upper case calls with spy', () => {
        const arg = 'test';
        const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
        sut.toUpperCase(arg);
        expect(toUpperCaseSpy).toHaveBeenCalledTimes(1);
        expect(toUpperCaseSpy).toHaveBeenCalledWith(arg);
    })

    test('should track log calls with spy', () => {
        const arg = 'test';
        const logStringSpy = jest.spyOn(sut, 'logString');
        sut.logString(arg);
        expect(logStringSpy).toHaveBeenCalledTimes(1);
        expect(logStringSpy).toHaveBeenCalledWith(arg);
    })

    test('should track external service calls with spy', () => {
        // bad practice to spy on private methods
        // it works, but it's not recommended
        // code coverage tools will not track this
        const arg = 'test';
        const callExternalServiceSpy = jest.spyOn(sut as any, 'callExternalService')
            .mockImplementation(() => {
                console.log('calling mocked implementation')
            });
        (sut as any).callExternalService(arg);
        expect(callExternalServiceSpy).toHaveBeenCalledTimes(1);
        expect(callExternalServiceSpy).toHaveBeenCalledWith(arg);
    })
})