import { Brand } from "../entities/Brand";
import { BrandMapper } from "../mappers/BrandMapper";
import { MongoBrandModel } from "../models/BrandModel";
import { IBrandRepository } from "../services/ports/IBrandRepository";

export class BrandRepository implements IBrandRepository {
    async createBrand(brand: Brand): Promise<Brand> {
        const doc = await MongoBrandModel.create(
            BrandMapper.toPersistence(brand)
        );

        return BrandMapper.toDomain(doc);
    }

    async getBrandByName(name: string): Promise<Brand | null> {
        const doc = await MongoBrandModel.findOne({ name });

        if (!doc) return null;

        return BrandMapper.toDomain(doc);
    }

    async getAllBrands(): Promise<Brand[]> {
        const docs = await MongoBrandModel.find();

        return docs.map(doc => BrandMapper.toDomain(doc));
    }

    async getBrandById(id: string): Promise<Brand | null> {
        const doc = await MongoBrandModel.findById(id);

        if (!doc) return null;

        return BrandMapper.toDomain(doc);
    }

    async updateBrand(id: string, brand: Brand): Promise<Brand> {
        const doc = await MongoBrandModel.findByIdAndUpdate(
            id,
            { name: brand.name },
            { new: true }
        );

        return BrandMapper.toDomain(doc!);
    }

    async deleteBrand(id: string): Promise<void> {
        await MongoBrandModel.findByIdAndDelete(id);
    }
}