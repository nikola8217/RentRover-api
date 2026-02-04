import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserRequest } from "../requests/CreateUserRequest";

export class UserController {
    constructor(private userService: UserService) {
        this.create = this.create.bind(this);
    };

    async create(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const dto = CreateUserRequest.toDto(req);

            const user = await this.userService.createUser(dto);

            res.status(201).json({
                message: "User is successfully created",
                user
            });
        } catch (error) {
            next(error);
        }
    }
}