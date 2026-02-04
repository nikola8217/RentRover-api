import { ITokenGenerator } from "../services/ports/ITokenGenerator";
import { SecretNotDefinedError } from "../../../shared/errors/SecretNotDefinedError";
import jwt from "jsonwebtoken";
import { PayloadDto } from "../dtos/PayloadDto";

export class TokenGenerator implements ITokenGenerator {
    generate(payload: PayloadDto): string{
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new SecretNotDefinedError();
        }

        const userJwt = jwt.sign(
            {
                id: payload.userId,
                email: payload.email,
                role: payload.role
            },
            secret,
            { expiresIn: '1d' } 
        );

        return userJwt;
    }
}