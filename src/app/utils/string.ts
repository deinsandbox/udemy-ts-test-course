import {randomUUID} from 'node:crypto';

export const toUpperCase = (arg: string): string => arg.toUpperCase();

export const toLowerCase = (arg: string): string => arg.toLowerCase();

export const toLowerCaseWithId = (arg: string): string => {
    const uuid = randomUUID();
    return `${arg.toLowerCase()}-${uuid}`;
};

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