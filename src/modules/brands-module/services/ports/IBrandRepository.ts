import { Brand } from "../../entities/Brand";

export interface IBrandRepository {
    createBrand(brand: Brand): Promise<Brand>;

    getBrandByName(name: string): Promise<Brand | null>;

    getAllBrands(): Promise<Brand[]>;

    getBrandById(id: string): Promise<Brand | null>;

    updateBrand(id: string, brand: Brand): Promise<Brand>;
    
    deleteBrand(id: string): Promise<void>;
}