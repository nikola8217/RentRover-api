import { NameAlreadyTakenError } from "../../../shared/errors/NameAlreadyTakenError";
import { CategoryDto } from "../dtos/CategoryDto";
import { Category } from "../entities/Category";
import { CategoryResponse } from "../responses/CategoryResponse";
import { GetCategoriesResponse } from "../responses/GetCategoriesResponse";
import { ICategoryRepository } from "./ports/ICategoryRepository";
import { randomUUID } from "crypto";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) {}

    async createCategory(dto: CategoryDto): Promise<CategoryResponse> {
        const nameIsTaken = await this.categoryRepository.getCategoryByName(dto.name);

        if (nameIsTaken) throw new NameAlreadyTakenError();

        const category = new Category(
            randomUUID(),
            dto.name
        )

        const createdCategory = await this.categoryRepository.createCategory(category);

        return {
            id: createdCategory._id,
            name: createdCategory.name
        }
    }

    async getAllCategories(): Promise<GetCategoriesResponse> {
        const categories = await this.categoryRepository.getAllCategories();

        return {
            categories: categories.map(category => ({
                id: category._id,
                name: category.name
            }))
        };
    }

    async getCategoryById(id: string): Promise<CategoryResponse> {
        const category = await this.checkCategory(id);

        return {
            id: category._id,
            name: category.name,
        }
    }

    async updateCategory(id: string, dto: CategoryDto): Promise<CategoryResponse> {
        const category = await this.checkCategory(id);

        if (dto.name !== category.name) {
            const nameIsTaken = await this.categoryRepository.getCategoryByName(dto.name);

            if (nameIsTaken) throw new NameAlreadyTakenError();
        }

        category.name = dto.name;

        const updatedCategory = await this.categoryRepository.updateCategory(id, category);

        return {
            id: updatedCategory._id,
            name: updatedCategory.name
        };
    }

    async deleteCategory(id: string): Promise<void> {
        await this.checkCategory(id);

        await this.categoryRepository.deleteCategory(id);
    }

    private async checkCategory(id: string): Promise<Category> {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new NotFoundError("Category not found");

        return category;
    }
}