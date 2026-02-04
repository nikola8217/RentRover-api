import { User } from "../../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;

    getUserByEmail(email: string): Promise<User | null>;

    getAllUsers(): Promise<User[]>;

    getUserById(id: string): Promise<User | null>;

    deleteUser(id: string): Promise<void>;
}