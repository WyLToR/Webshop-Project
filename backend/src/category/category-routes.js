import { Router } from 'express';
import categoriesController from './category-controller';
import validate from '../middlewares/validation';
import categoriesSchema from './category-schema';
import authorize from '../middlewares/authorize';
import veryfyUser from '../middlewares/verify-user';
import verifyAdmin from '../middlewares/verify-admin';

const router = Router();

router.post('/:userId', authorize, veryfyUser, verifyAdmin, validate(categoriesSchema), categoriesController.createCategory);

router.get('/:userId', authorize, veryfyUser, verifyAdmin, categoriesController.getAllCategories);

router.get('/', categoriesController.getAllCategories);

router.get('/:userId/:categoryId', authorize, veryfyUser, verifyAdmin, categoriesController.getCategoryById);

router.patch('/:userId/:categoryId', authorize, veryfyUser, verifyAdmin, validate(categoriesSchema), categoriesController.updateCategory);

router.delete('/:userId/:categoryId', authorize, veryfyUser, verifyAdmin, categoriesController.deleteCategory);

export default router;
