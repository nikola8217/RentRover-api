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
}
