import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { RequestValidationError } from "../errors/RequestValidationError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    console.error(err);

    res.status(500).json({ message: "Internal Server Error" });
};
