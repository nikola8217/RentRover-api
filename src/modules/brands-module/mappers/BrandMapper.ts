import { Brand } from "../entities/Brand";
import { BrandDocument } from "../models/BrandModel";

export class BrandMapper {
    static toDomain(doc: BrandDocument): Brand {
        return new Brand(
            doc._id,
            doc.name
        );
    }

    static toPersistence(brand: Brand): Brand {
        return {
            _id: brand._id,
            name: brand.name,
        };
    }
}