import { body } from 'express-validator';

export const categoryRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
];