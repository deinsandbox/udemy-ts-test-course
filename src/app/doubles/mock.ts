export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

type LoggerServiceCallback = (arg: string) => void;

export const toUpperCaseWithCallback = (arg: string, callback: LoggerServiceCallback): string => {
    if (!arg){
        callback('Invalid argument');
        return;
    }

    callback(`called function with ${arg}`)
    return arg.toUpperCase();
}