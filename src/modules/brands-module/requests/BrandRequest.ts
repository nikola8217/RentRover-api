import { Request } from "express";
import { BrandDto } from "../dtos/BrandDto";

export class BrandRequest {
    static toDto(req: Request): BrandDto {
        return {
            name: req.body.name
        }
    }
}