import { AppError } from "./AppError";

export class NameAlreadyTakenError extends AppError {
    constructor(message = "Name is already taken") {
        super(message, 409); 
    }
}