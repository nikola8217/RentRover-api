import { Role } from "../entities/enums/Role";

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: Role;
}