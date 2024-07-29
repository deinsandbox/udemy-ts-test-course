import { calculateComplexity } from "./stubs";

describe('Utils>Stub', () => {
    it('should calculate the string complexity', () => {
        // Arrange
        const stubInfo = { //stub object
            length: 2,
            extraInfo: {
                field1: 'info1',
                field2: 'info2',
            }
        }
        // Act
        const complexity = calculateComplexity(stubInfo as any);
        // Assert
        expect(complexity).toBe(4);
    })
})