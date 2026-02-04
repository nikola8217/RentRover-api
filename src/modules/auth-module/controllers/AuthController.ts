import { Request, Response, NextFunction } from "express";
import { LoginUserRequest } from "../requests/LoginUserRequest";
import { AuthService } from "../services/AuthService";

export class AuthController {
    constructor(private authService: AuthService) {
        this.login = this.login.bind(this);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = LoginUserRequest.toDto(req);

            const token = await this.authService.loginUser(dto);

            res.status(200).json({
                message: "You have logged in successfully",
                token
            })
        } catch (error) {
            next(error);
        }
    }
}