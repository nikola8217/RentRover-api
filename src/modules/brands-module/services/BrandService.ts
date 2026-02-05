import { IBrandRepository } from "./ports/IBrandRepository";
import { NameAlreadyTakenError } from "../../../shared/errors/NameAlreadyTakenError";
import { randomUUID } from "crypto";
import { Brand } from "../entities/Brand";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { BrandDto } from "../dtos/BrandDto";
import { BrandResponse } from "../responses/BrandResponse";
import { GetBrandsResponse } from "../responses/GetBrandsResponse";

export class BrandService {
    constructor(private brandRepository: IBrandRepository) {}

    async createBrand(dto: BrandDto): Promise<BrandResponse> {
        const nameIsTaken = await this.brandRepository.getBrandByName(dto.name);

        if (nameIsTaken) throw new NameAlreadyTakenError();

        const brand = new Brand(
            randomUUID(),
            dto.name
        )

        const createdBrand = await this.brandRepository.createBrand(brand);

        return {
            id: createdBrand._id,
            name: createdBrand.name
        }
    }

    async getAllBrands(): Promise<GetBrandsResponse> {
        const brands = await this.brandRepository.getAllBrands();

        return {
            brands: brands.map(brand => ({
                id: brand._id,
                name: brand.name
            }))
        };
    }

    async getBrandById(id: string): Promise<BrandResponse> {
        const brand = await this.checkBrand(id);

        return {
            id: brand._id,
            name: brand.name,
        }
    }

    async updateBrand(id: string, dto: BrandDto): Promise<BrandResponse> {
        const brand = await this.checkBrand(id);

        if (dto.name !== brand.name) {
            const nameIsTaken = await this.brandRepository.getBrandByName(dto.name);

            if (nameIsTaken) throw new NameAlreadyTakenError();
        }

        brand.name = dto.name;

        const updatedBrand = await this.brandRepository.updateBrand(id, brand);

        return {
            id: updatedBrand._id,
            name: updatedBrand.name
        };
    }

    async deleteBrand(id: string): Promise<void> {
        await this.checkBrand(id);

        await this.brandRepository.deleteBrand(id);
    }

    private async checkBrand(id: string): Promise<Brand> {
        const brand = await this.brandRepository.getBrandById(id);

        if (!brand) throw new NotFoundError("Brand not found");

        return brand;
    }
}