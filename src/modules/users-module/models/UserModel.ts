import { Schema, model, InferSchemaType } from "mongoose";
import { Role } from "../entities/enums/Role";

const userSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },

        name: { 
            type: String, 
            required: true 
        },

        email: { 
            type: String, 
            required: true 
        },

        passwordHash: { 
            type: String, 
            required: true 
        },

        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const MongoUserModel = model<UserDocument>(
    "User",
    userSchema
);
