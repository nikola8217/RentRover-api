import { Role } from "../../entities/enums/Role";

export interface CreateUserResponse {
    id: string;
    name: string;
    email: string;
    role: Role;
}