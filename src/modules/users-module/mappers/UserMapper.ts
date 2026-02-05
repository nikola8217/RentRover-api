import { User } from "../entities/User";
import { UserDocument } from "../models/UserModel";

export class UserMapper {
    static toDomain(doc: UserDocument): User {
        return new User(
            doc._id,
            doc.name,
            doc.email,
            doc.passwordHash,
            doc.role
        );
    }

    static toPersistence(user: User): User {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role
        };
    }
}
