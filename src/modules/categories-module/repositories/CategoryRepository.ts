import { Category } from "../entities/Category";
import { CategoryMapper } from "../mappers/CategoryMapper";
import { MongoCategoryModel } from "../models/CategoryModel";
import { ICategoryRepository } from "../services/ports/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
    async createCategory(category: Category): Promise<Category> {
        const doc = await MongoCategoryModel.create(
            CategoryMapper.toPersistence(category)
        );

        return CategoryMapper.toDomain(doc);
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        const doc = await MongoCategoryModel.findOne({ name });

        if (!doc) return null;

        return CategoryMapper.toDomain(doc);
    }

    async getAllCategories(): Promise<Category[]> {
        const docs = await MongoCategoryModel.find();

        return docs.map(doc => CategoryMapper.toDomain(doc));
    }

    async getCategoryById(id: string): Promise<Category | null> {
        const doc = await MongoCategoryModel.findById(id);

        if (!doc) return null;

        return CategoryMapper.toDomain(doc);
    }

    async updateCategory(id: string, category: Category): Promise<Category> {
        const doc = await MongoCategoryModel.findByIdAndUpdate(
            id,
            { name: category.name },
            { new: true }
        );

        return CategoryMapper.toDomain(doc!);
    }

    async deleteCategory(id: string): Promise<void> {
        await MongoCategoryModel.findByIdAndDelete(id);
    }
}