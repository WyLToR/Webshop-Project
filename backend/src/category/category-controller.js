import categoriesService from './category-service';

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoriesService.createCategory(req.body);
    res.status(201).json(newCategory.rows[0]);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const { categories, totalPages } = await categoriesService.getAllCategories(req.query);
    res.json({ categories, totalPages });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const Category = await categoriesService.getCategoryById(req.params.categoryId);
    res.json(Category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoriesService.updateCategory(req.params.categoryId, req.body);
    res.json(updatedCategory.rows[0]);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoriesService.deleteCategory(req.params.categoryId);
    res.status(204).json({ message: 'Successful category delete' });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
