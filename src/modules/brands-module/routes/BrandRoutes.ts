import express from 'express';
import { validateRequest } from '../../../shared/middlewares/ValidateRequest';
import { requireAuth } from '../../../shared/middlewares/RequireAuth';
import { requireAdmin } from '../../../shared/middlewares/RequireAdmin';
import { createBrandController } from '../factories/BrandControllerFactory';
import { brandRules } from './httpValidators/BrandValidator';

const router = express.Router();

const brandController = createBrandController();

router.route('/').post(
    requireAuth,
    requireAdmin,
    brandRules, 
    validateRequest, 
    brandController.create
);

router.route('/').get(brandController.getAll);

router.route('/:id').get(brandController.getById);

router.route('/:id').put(
    requireAuth,
    requireAdmin,
    brandRules, 
    validateRequest, 
    brandController.update
);

router.route('/:id').delete(
    requireAuth,
    requireAdmin,
    brandController.delete
);

const brandRouter = router;

export { brandRouter };