import { CategoryValidator } from "./validators/CategoryValidator";

export class Category {
    constructor(
        public _id: string,
        public name: string
    ) {
        CategoryValidator.validateId(_id);
        CategoryValidator.validateName(name);
    }
}