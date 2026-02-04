import { Request } from "express";
import { LoginUserDto } from "../dtos/LoginUserDto";

export class LoginUserRequest {
    static toDto(req: Request): LoginUserDto {
        return {
            email: req.body.email,
            password: req.body.password,
        };
    }
}
