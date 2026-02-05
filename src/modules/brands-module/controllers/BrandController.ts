import { Request, Response, NextFunction } from "express";
import { BrandService } from "../services/BrandService";
import { BrandRequest } from "../requests/BrandRequest";

export class BrandController {
    constructor(private brandService: BrandService) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = BrandRequest.toDto(req);

            const brand = await this.brandService.createBrand(dto);

            res.status(201).json({
                message: "Brand created successfully",
                brand
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brands = await this.brandService.getAllBrands();

            res.status(200).json({
                message: "Brands fetched successfully",
                brands
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            const brand = await this.brandService.getBrandById(id);

            res.status(200).json({
                message: "Brand fetched successfully",
                brand
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            const dto = BrandRequest.toDto(req);

            const brand = await this.brandService.updateBrand(id, dto);

            res.status(200).json({
                message: "Brand updated successfully",
                brand
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            await this.brandService.deleteBrand(id);

            res.status(200).json({
                message: "Brand deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}