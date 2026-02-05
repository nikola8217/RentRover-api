import { body } from 'express-validator';

export const brandRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
];