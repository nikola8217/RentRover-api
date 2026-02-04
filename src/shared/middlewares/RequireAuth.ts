import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthenticatedError } from "../errors/NotAuthenticatedError";
import { SecretNotDefinedError } from "../errors/SecretNotDefinedError";
import { UserPayload } from "../types/express";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtKey = process.env.JWT_SECRET;

    if (!jwtKey) {
        throw new SecretNotDefinedError();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new NotAuthenticatedError();
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, jwtKey) as UserPayload;

        req.user = payload;

        next();
    } catch {
        next(new NotAuthenticatedError("Not authorized"));
    }
};
