import { Request } from "express";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { Role } from "../entities/enums/Role";

export class CreateUserRequest {
    static toDto(req: Request): CreateUserDto {
        return {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role ?? Role.USER
        };
    }
}
