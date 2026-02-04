import { body } from 'express-validator';

export const loginUserRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];