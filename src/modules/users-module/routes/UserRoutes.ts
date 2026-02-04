import express from 'express';
import { createUserController } from '../factories/UserControllerFactory';
import { validateRequest } from '../../../shared/middlewares/ValidateRequest';
import { createUserRules } from './httpValidators/CreateUserValidator';
import { requireAuth } from '../../../shared/middlewares/RequireAuth';
import { requireAdmin } from '../../../shared/middlewares/RequireAdmin';

const router = express.Router();

const userController = createUserController();

router.route('/').post(
    createUserRules, 
    validateRequest, 
    userController.create
);

router.route('/').get(
    requireAuth,
    requireAdmin,
    userController.getAll
);

router.route('/:id').get(
    requireAuth,
    requireAdmin,
    userController.getById
);

router.route('/:id').delete(
    requireAuth,
    requireAdmin,
    userController.delete
);


const userRouter = router;

export { userRouter };