import { AppError } from "./AppError";

export interface ValidationErrorItem {
    message: string;
}

export class RequestValidationError extends AppError {
    public readonly errors: ValidationErrorItem[];

    constructor(errors: ValidationErrorItem[]) {
        super("Invalid request parameters", 400);

        this.errors = errors;

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}