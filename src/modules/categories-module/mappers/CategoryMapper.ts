import { Category } from "../entities/Category";
import { CategoryDocument } from "../models/CategoryModel";

export class CategoryMapper {
    static toDomain(doc: CategoryDocument): Category {
        return new Category(
            doc._id,
            doc.name
        );
    }

    static toPersistence(category: Category): Category {
        return {
            _id: category._id,
            name: category.name,
        };
    }
}