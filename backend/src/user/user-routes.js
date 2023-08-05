import { Router } from 'express';
import userController from './user-controller';
import validate from '../middlewares/validation';
import registerUserDataSchema from '../auth/auth-register-schema';
import userOrderDataSchema from './user-orderdata-schema';
import userPasswordSchema from './user-password-schema';
import authorize from '../middlewares/authorize';
import verifyAdmin from '../middlewares/verify-admin';
import verifyUser from '../middlewares/verify-user';

const router = Router();
router.get('/admin/:userId', authorize, verifyUser, verifyAdmin, userController.getAllUser);
router.get('/:userId', authorize, verifyUser, userController.getUserById);
router.patch('/basedata/:userId', authorize, verifyUser, validate(registerUserDataSchema), userController.setBaseData);
router.post('/password/:userId', authorize, verifyUser, validate(userPasswordSchema), userController.setNewPassword);
router.patch('/orderdata/:userId', authorize, verifyUser, validate(userOrderDataSchema), userController.setOrderData);
router.delete('/active/:userId', authorize, verifyUser, userController.setUserDeactivate);
router.patch('/admin/permission/:userId', authorize, verifyUser, verifyAdmin, userController.setUserAdminPermission);
router.delete('/admin/:userId/:deletingUserId', authorize, verifyUser, verifyAdmin, userController.setAdminUserDeactivate);
export default router;