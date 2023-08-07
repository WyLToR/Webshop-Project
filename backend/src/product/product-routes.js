import { Router } from 'express';
import productController from './product-controller';
import validate from '../middlewares/validation';
import productsSchema from './products-schema';
import uploadMiddleware from '../middlewares/multer';
import authorize from '../middlewares/authorize';
import verifyAdmin from '../middlewares/verify-admin';
import veryfyUser from '../middlewares/verify-user';

const router = Router();

router.post('/:userId', authorize, veryfyUser, verifyAdmin, uploadMiddleware.single('productPicture'), validate(productsSchema), productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/infinite', productController.getAllProductsInfinite);

router.get('/:productId', productController.getProductById);

router.patch('/:userId/:productId', authorize, veryfyUser, verifyAdmin, uploadMiddleware.single('productPicture'), validate(productsSchema), productController.updateProduct);

router.delete('/:userId/:productId', authorize, veryfyUser, verifyAdmin, productController.deleteProduct);

export default router;
