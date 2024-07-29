export class StringUtils {
    private callExternalService = (arg: string): string => {
        return `called external service with ${arg}`;
    }

    public toUpperCase(arg: string): string {
        return arg.toUpperCase();
    }

    public logString = (arg: string): void => {
        console.log(arg);
    }
}