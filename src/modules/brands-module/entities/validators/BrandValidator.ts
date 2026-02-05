import { RequiredFieldError } from "../../../../shared/errors/RequiredFieldError";

export class BrandValidator {
    static validateId(id: string): void {
        if (!id) throw new RequiredFieldError("Id is required");
    }

    static validateName(name: string): void {
        if (!name) throw new RequiredFieldError("Name is required");
    }
}