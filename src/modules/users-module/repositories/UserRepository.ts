import { User } from "../entities/User";
import { IUserRepository } from "../services/ports/IUserRepository";
import { MongoUserModel } from "../models/UserModel";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const doc = await MongoUserModel.create(
            UserMapper.toPersistence(user)
        );

        return UserMapper.toDomain(doc);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const doc = await MongoUserModel.findOne({ email });

        if (!doc) return null;

        return UserMapper.toDomain(doc);
    }

    async getAllUsers(): Promise<User[]> {
        const docs = await MongoUserModel.find();

        return docs.map(doc => UserMapper.toDomain(doc));
    }

    async getUserById(id: string): Promise<User | null> {
        const doc = await MongoUserModel.findById(id);

        if (!doc) return null;

        return UserMapper.toDomain(doc);
    }

    async deleteUser(id: string): Promise<void> {
        await MongoUserModel.findByIdAndDelete(id);
    }
}
