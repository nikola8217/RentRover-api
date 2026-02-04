import { UserRepository } from "../../users-module/repositories/UserRepository";
import { PasswordComparator } from "../libs/PasswordComparator";
import { TokenGenerator } from "../libs/TokenGenerator";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";

export function createAuthController(): AuthController {
    const userRepository = new UserRepository();
    const passwordComparator = new PasswordComparator();
    const tokenGenerator = new TokenGenerator();
    
    const authService = new AuthService(userRepository, passwordComparator, tokenGenerator);

    return new AuthController(authService);
}
