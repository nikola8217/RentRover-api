import { IUserRepository } from "./ports/IUserRepository";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { EmailAlreadyTakenError } from "../../../shared/errors/EmailAlreadyTaken";
import { IPasswordHasher } from "./ports/IPasswordHasher";
import { User } from "../entities/User";
import { randomUUID } from "crypto";
import { UserResponse } from "../responses/UserResponse";
import { GetUsersResponse } from "../responses/GetUsersResponse";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class UserService {
    constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}

    async createUser(dto: CreateUserDto) : Promise<UserResponse> {
        const emailIsTaken = await this.userRepository.getUserByEmail(dto.email);

        if (emailIsTaken) throw new EmailAlreadyTakenError();

        const passwordHash = await this.passwordHasher.hash(dto.password);

        const user = new User(
            randomUUID(),
            dto.name,
            dto.email,
            passwordHash,
            dto.role
        );

        const createdUser = await this.userRepository.createUser(user);

        return {
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        }
    }

    async getAllUsers(): Promise<GetUsersResponse> {
        const users = await this.userRepository.getAllUsers();

        return {
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }))
        };
    }

    async getUserById(id: string): Promise<UserResponse> {
        const user = await this.checkUser(id);

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

    async deleteUser(id: string): Promise<void> {
        await this.checkUser(id);

        await this.userRepository.deleteUser(id);
    }

    private async checkUser(id: string): Promise<User> {
        const user = await this.userRepository.getUserById(id);

        if (!user) throw new NotFoundError("User not found");

        return user;
    }
}