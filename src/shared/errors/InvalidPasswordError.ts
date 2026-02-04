import { AppError } from "./AppError";

export class InvalidPasswordError extends AppError {
    constructor(message = "Password is invalid") {
        super(message, 400);  
    }
}