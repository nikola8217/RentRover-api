import express from 'express';
import { createCategoryController } from '../factories/CategoryControllerFactory';
import { validateRequest } from '../../../shared/middlewares/ValidateRequest';
import { categoryRules } from './httpValidators/CategoryValidator';
import { requireAuth } from '../../../shared/middlewares/RequireAuth';
import { requireAdmin } from '../../../shared/middlewares/RequireAdmin';

const router = express.Router();

const categoryController = createCategoryController();

router.route('/').post(
    requireAuth,
    requireAdmin,
    categoryRules, 
    validateRequest, 
    categoryController.create
);

router.route('/').get(categoryController.getAll);

router.route('/:id').get(categoryController.getById);

router.route('/:id').put(
    requireAuth,
    requireAdmin,
    categoryRules, 
    validateRequest, 
    categoryController.update
);

router.route('/:id').delete(
    requireAuth,
    requireAdmin,
    categoryController.delete
);

const categoryRouter = router;

export { categoryRouter };