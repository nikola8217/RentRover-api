import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";
import { CategoryRequest } from "../requests/CreateCategoryRequest";

export class CategoryController {
    constructor(private categoryService: CategoryService) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = CategoryRequest.toDto(req);

            const category = await this.categoryService.createCategory(dto);

            res.status(201).json({
                message: "Category created successfully",
                category
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this.categoryService.getAllCategories();

            res.status(200).json({
                message: "Categories fetched successfully",
                categories
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            const category = await this.categoryService.getCategoryById(id);

            res.status(200).json({
                message: "Category fetched successfully",
                category
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            const dto = CategoryRequest.toDto(req);

            const category = await this.categoryService.updateCategory(id, dto);

            res.status(200).json({
                message: "Category updated successfully",
                category
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;

            await this.categoryService.deleteCategory(id);

            res.status(200).json({
                message: "Category deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}