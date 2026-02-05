import { BrandValidator } from "./validators/BrandValidator";

export class Brand {
    constructor(
        public _id: string,
        public name: string
    ) {
        BrandValidator.validateId(_id);
        BrandValidator.validateName(name);
    }
}