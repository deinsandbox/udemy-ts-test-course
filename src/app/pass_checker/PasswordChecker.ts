
export enum PasswordStrength {
    SHORT = 'Password is too short',
    NO_UPPERCASE = 'Password must contain at least one uppercase letter',
    NO_LOWERCASE = 'Password must contain at least one lowercase letter',
    NO_SPECIAL = 'Password must contain at least one special character',
    NO_NUMBER = 'Password must contain at least one number'
}

export type CheckerResult = {
    valid: boolean,
    reason: PasswordStrength[]
}

export class PasswordChecker {

    private reasons: PasswordStrength[] = []

    public checkPassword(password: string): CheckerResult {
        this.checkLength(password);
        this.checkUpperCase(password);
        this.checkLowerCase(password);

        return {
            valid: Boolean(this.reasons.length === 0),
            reason: this.reasons
        }
    }

    public checkAdminPassword(password: string): CheckerResult {
        this.checkPassword(password);
        this.checkSpecialCharacters(password)
        this.checkNumbers(password);

        return {
            valid: Boolean(this.reasons.length === 0),
            reason: this.reasons
        }
    }


    private checkLength(password: string): void {
        if (password.length < 8) {
            this.reasons.push(PasswordStrength.SHORT)
        }
    }

    private checkUpperCase(password: string): void {
        if (!password.match(/[A-Z]/)) {
            this.reasons.push(PasswordStrength.NO_UPPERCASE)
        }
    }

    private checkLowerCase(password: string): void {
        if (!password.match(/[a-z]/)) {
            this.reasons.push(PasswordStrength.NO_LOWERCASE)
        }
    }

    private checkSpecialCharacters(password: string): void {
        if (!password.match(/[!@#$%^&*()_+]/)) {
            this.reasons.push(PasswordStrength.NO_SPECIAL)
        }
    }

    private checkNumbers(password: string): void {
        if (!password.match(/[0-9]/)) {
            this.reasons.push(PasswordStrength.NO_NUMBER)
        }
    }
}