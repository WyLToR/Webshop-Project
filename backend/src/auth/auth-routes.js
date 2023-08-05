import { Router } from 'express';
import authController from './auth-controller';
import validate from '../middlewares/validation';
import loginUserSchema from './auth-login-schema';
import registerUserDataSchema from './auth-register-schema';

const router = Router();

router.post('/login', validate(loginUserSchema), authController.login);
router.post('/register', validate(registerUserDataSchema), authController.register);
router.post('/activate/:userId', authController.setUserEmailActivate);
router.post('/resend', authController.sendUserActivatorMail);

export default router;
