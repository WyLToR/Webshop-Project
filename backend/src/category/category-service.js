/* eslint-disable max-len */
import { nanoid } from 'nanoid';
import categoriesModel from './category-model';
import HttpError from '../utils/HttpError';

const createCategory = async ({ category }) => {
  const categoryId = nanoid(24);
  const createdCategory = await categoriesModel.createCategory(categoryId, category);
  return createdCategory;
};

const getAllCategories = async (queries) => {
  const pageLimit = queries.pageLimit ? queries.pageLimit : 9;
  const order = queries.order ? queries.order : 'ASC';
  const search = queries.search ? `%${queries.search}%` : null;
  const page = queries.page ? queries.page : 1;

  const offset = (page - 1) * pageLimit;

  const { categories, totalRows } = await categoriesModel.getAllCategories({
    pageLimit, order, search, offset,
  });

  const totalPages = Math.ceil(totalRows / pageLimit);
  return { categories, totalPages };
};

const getCategoryById = async (categoryId) => {
  const category = await categoriesModel.getCategoryById(categoryId);
  if (!category) {
    throw new HttpError('Category not found.', 404);
  }
  return category.rows[0];
};

const updateCategory = async (categoryId, { category }) => {
  const updatedCategory = await categoriesModel.updateCategory(categoryId, category);

  if (!updatedCategory) {
    throw new HttpError('Category not found.', 404);
  }
  return updatedCategory;
};

const deleteCategory = async (categoryId) => {
  const deleteResponse = await categoriesModel.deleteCategory(categoryId);
  if (deleteResponse.rowCount === 0) throw new HttpError('No such category', 404);
  return deleteResponse;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
