import { CategoryController } from "../controllers/CategoryController";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryService } from "../services/CategoryService";

export function createCategoryController(): CategoryController {
    const categoryRepository = new CategoryRepository();

    const categoryService = new CategoryService(categoryRepository);

    return new CategoryController(categoryService);
}