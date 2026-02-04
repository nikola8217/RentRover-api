import { body } from 'express-validator';
import { Role } from '../../entities/enums/Role';

export const createUserRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('role')
        .optional()
        .isIn([Role.USER, Role.ADMIN])
        .withMessage('Role must be User or Admin'),
];