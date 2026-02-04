import { IPasswordComparator } from "../services/ports/IPasswordComparator";
import bcrypt from "bcrypt";

export class PasswordComparator implements IPasswordComparator {
    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);  
    }
}