import { Role } from "../entities/enums/Role";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role
}