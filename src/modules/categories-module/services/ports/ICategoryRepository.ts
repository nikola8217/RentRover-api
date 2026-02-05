import { Category } from "../../entities/Category";

export interface ICategoryRepository {
    createCategory(category: Category): Promise<Category>;

    getCategoryByName(name: string): Promise<Category | null>;

    getAllCategories(): Promise<Category[]>;

    getCategoryById(id: string): Promise<Category | null>;

    updateCategory(id: string, category: Category): Promise<Category>;
    
    deleteCategory(id: string): Promise<void>;
}