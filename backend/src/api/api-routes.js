import { Router } from 'express';
import cartRouter from '../cart/cart-router';
import productRoutes from '../product/product-routes';
import userRouter from '../user/user-routes';
import categoriesRoutes from '../category/category-routes';
import ordersRouter from '../order/order-routes';

const apiRoutes = Router();
apiRoutes.use('/user', userRouter);
apiRoutes.use('/cart', cartRouter);
apiRoutes.use('/product', productRoutes);
apiRoutes.use('/category', categoriesRoutes);
apiRoutes.use('/order', ordersRouter);

export default apiRoutes;
