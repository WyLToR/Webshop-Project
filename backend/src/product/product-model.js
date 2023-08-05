/* eslint-disable camelcase */
/* eslint-disable max-len */
import client from '../db/db';
import {
  createProductQuery, readAllProductsQuery, getProductsRowsTotal, readProductQuery, updateProductQuery, deleteProductQuery, addCategoriesToProductQuery, deleteCategoryFromProductQuery, deleteAllCategoriesFromProductQuery, addPictureQuery, substractAmountQuery,
} from './product-queries';

const createProduct = async (productId, productData) => {
  const {
    name, description, price, quantity,
  } = productData;
  return client.query(createProductQuery, [productId, name, description, price, quantity]);
};

const getAllProducts = async (options) => {
  const {
    category, pageLimit, sort, order, search, minPrice, maxPrice, offset,
  } = options;

  const queryParams = [minPrice, maxPrice, search, category];
  const orderQuery = sort ? ` ORDER BY ${sort} ${order}` : '';
  const limitQuery = ` LIMIT ${pageLimit} OFFSET ${offset}`;

  const products = await client.query(`${readAllProductsQuery}${orderQuery}${limitQuery}`, queryParams);
  const totalRows = await client.query(getProductsRowsTotal, queryParams);
  return {
    products: products.rows,
    totalRows: totalRows.rows[0].total,
  };
};

const getProductById = async (productId) => client.query(readProductQuery, [productId]);

const updateProduct = async (productId, updates) => {
  const {
    name, description, price, quantity, product_url,
  } = updates;
  return client.query(updateProductQuery, [name, description, price, quantity, product_url, productId]);
};

const deleteProduct = async (productId) => client.query(deleteProductQuery, [productId]);

const addCategoriesToProduct = async (productId, categoryIds) => {
  categoryIds.map((categoryId) => client.query(addCategoriesToProductQuery, [productId, categoryId]));
};

const deleteCategoryFromProduct = async (productId, categoryId) => client.query(deleteCategoryFromProductQuery, [productId, categoryId]);

const deleteAllCategoriesFromProduct = async (productId) => client.query(deleteAllCategoriesFromProductQuery, [productId]);

const addPicutre = async (productId, url) => client.query(addPictureQuery, [productId, url]);

const substractAmount = async (productId, amount) => client.query(substractAmountQuery, [productId, amount]);

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addCategoriesToProduct,
  deleteCategoryFromProduct,
  deleteAllCategoriesFromProduct,
  addPicutre,
  substractAmount,
};
