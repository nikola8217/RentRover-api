import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserRequest } from "../requests/CreateUserRequest";

export class UserController {
    constructor(private userService: UserService) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
    };

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = CreateUserRequest.toDto(req);

            const user = await this.userService.createUser(dto);

            res.status(201).json({
                message: "User created successfully",
                user
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json({
                message: "Users fetched successfully",
                users
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            const user = await this.userService.getUserById(id);

            res.status(200).json({
                message: "User fetched successfully",
                user
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            await this.userService.deleteUser(id);

            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}