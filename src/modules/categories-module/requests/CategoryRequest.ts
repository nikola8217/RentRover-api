import { Request } from "express";
import { CategoryDto } from "../dtos/CategoryDto";

export class CategoryRequest {
    static toDto(req: Request): CategoryDto {
        return {
            name: req.body.name
        }
    }
}