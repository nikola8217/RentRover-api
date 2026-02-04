import { IUserRepository } from "./ports/IUserRepository";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { EmailAlreadyTakenError } from "../../../shared/errors/EmailAlreadyTaken";
import { IPasswordHasher } from "./ports/IPasswordHasher";
import { User } from "../entities/User";
import { randomUUID } from "crypto";
import { CreateUserResponse } from "../responses/CreateUserResponse";

export class UserService {
    constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}

    async createUser(dto: CreateUserDto) : Promise<CreateUserResponse> {
        const emailIsTaken = await this.userRepository.getUserByEmail(dto.email);

        if (emailIsTaken) throw new EmailAlreadyTakenError();

        const passwordHash = await this.passwordHasher.hash(dto.password);

        const user = new User(
            randomUUID() as string,
            dto.name,
            dto.email,
            passwordHash,
            dto.role
        );

        const createdUser = await this.userRepository.createUser(user);

        return {
            id: createdUser._id!,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        }
    }
}