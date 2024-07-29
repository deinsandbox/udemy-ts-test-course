export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

export const calculateComplexity = (stringInfo: StringInfo): number => {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}