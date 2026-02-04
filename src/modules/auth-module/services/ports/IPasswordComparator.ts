export interface IPasswordComparator {
    compare(password: string, hashedPassword: string): Promise<boolean>;
}