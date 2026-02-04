import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError, ValidationErrorItem } from "../errors/RequestValidationError";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors: ValidationErrorItem[] = result.array({ onlyFirstError: true }).map(err => ({
            message: err.msg
        }));

        throw new RequestValidationError(errors);
    }

    next();
};
