import { IPasswordHasher } from "../services/ports/IPasswordHasher";
import bcrypt from "bcrypt";

export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}