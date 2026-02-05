import { BrandController } from "../controllers/BrandController";
import { BrandRepository } from "../repositories/BrandRepository";
import { BrandService } from "../services/BrandService";

export function createBrandController(): BrandController {
    const brandRepository = new BrandRepository();

    const brandService = new BrandService(brandRepository);

    return new BrandController(brandService);
}