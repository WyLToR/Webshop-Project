import { Router } from 'express';
import cartController from './cart-controller';
import validate from '../middlewares/validation';
import cartSchema from './cart-schema';
import authorize from '../middlewares/authorize';
import veryfyUser from '../middlewares/verify-user';

const cartRouter = Router();

cartRouter.get('/:userId', authorize, veryfyUser, cartController.getUserCart);
cartRouter.post('/:userId', authorize, veryfyUser, validate(cartSchema), cartController.addToCart);
cartRouter.delete('/:userId', authorize, veryfyUser, validate(cartSchema), cartController.deleteItemFromcart);
export default cartRouter;
