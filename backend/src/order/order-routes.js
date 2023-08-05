import { Router } from 'express';
import orderController from './order-controller';
import validate from '../middlewares/validation';
import orderSchema from './order-schema';
import authorize from '../middlewares/authorize';
import verifyAdmin from '../middlewares/verify-admin';
import veryfyUser from '../middlewares/verify-user';

const orderRouter = Router();

orderRouter.get('/admin/:userId', authorize, veryfyUser, verifyAdmin, orderController.readAll);
orderRouter.get('/:userId/:orderId', authorize, veryfyUser, orderController.getOrderById);
orderRouter.get('/:userId', authorize, veryfyUser, orderController.readAllUserOrder);
orderRouter.post('/:userId', authorize, veryfyUser, validate(orderSchema), orderController.addOrder);
orderRouter.patch('/admin/complete/:userId/:orderId', authorize, veryfyUser, verifyAdmin, orderController.completeOrder);
orderRouter.delete('/admin/delete/:userId/:orderId', authorize, veryfyUser, verifyAdmin, orderController.deleteOrder);

export default orderRouter;
