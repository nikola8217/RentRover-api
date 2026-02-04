import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { IUserRepository } from "../../users-module/services/ports/IUserRepository";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { IPasswordComparator } from "./ports/IPasswordComparator";
import { ITokenGenerator } from "./ports/ITokenGenerator";
import { InvalidPasswordError } from "../../../shared/errors/InvalidPasswordError";

export class AuthService {
    constructor(
        private userRepository: IUserRepository,
        private passwordComparator: IPasswordComparator,
        private tokenGenerator: ITokenGenerator
    ) {}

    async loginUser(dto: LoginUserDto): Promise<string> {
        const user = await this.userRepository.getUserByEmail(dto.email);

        if (!user) throw new NotFoundError("Invalid email");

        const isPasswordValid = await this.passwordComparator.compare(dto.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new InvalidPasswordError();
        }

        const token = this.tokenGenerator.generate({
            userId: user._id,
            email: user.email,
            role: user.role
        });

        return token;
    }
}