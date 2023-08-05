/* eslint-disable max-len */
import client from '../db/db';
import {
  createCategoryQuery, readAllCategoriesQuery, getCategoriesRowsTotal, readCategoryQuery, updateCategoryQuery, deleteCategoryQuery,
} from './category-queries';

const createCategory = async (categoryId, category) => client.query(createCategoryQuery, [categoryId, category]);

const getAllCategories = async (options) => {
  const {
    pageLimit, order, search, offset,
  } = options;
  const queryParams = [search];
  const orderQuery = order ? ` ORDER BY name ${order}` : '';
  const limitQuery = ` LIMIT ${pageLimit} OFFSET ${offset}`;
  const categories = await client.query(`${readAllCategoriesQuery}${orderQuery}${limitQuery}`, queryParams);
  const totalRows = await client.query(getCategoriesRowsTotal, queryParams);
  return {
    categories: categories.rows,
    totalRows: totalRows.rows[0].total,
  };
};

const getCategoryById = async (categoryId) => client.query(readCategoryQuery, [categoryId]);

const updateCategory = async (categoryId, category) => client.query(updateCategoryQuery, [category, categoryId]);

const deleteCategory = async (categoryId) => client.query(deleteCategoryQuery, [categoryId]);

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
