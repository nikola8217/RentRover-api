import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { PasswordHasher } from "../libs/PasswordHasher";

export function createUserController(): UserController {
    const userRepository = new UserRepository();
    const passwordHasher = new PasswordHasher();
    
    const userService = new UserService(userRepository, passwordHasher);

    return new UserController(userService);
}
