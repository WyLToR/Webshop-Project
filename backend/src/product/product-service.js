/* eslint-disable max-len */
import { nanoid } from 'nanoid';
import productsModel from './product-model';
import { deleteProductPicture, handleProductPicture, updateProductPicture } from '../pictures/image-service';
import HttpError from '../utils/HttpError';

const createProduct = async (product, imageFile) => {
  const id = nanoid(24);
  const createdProduct = await productsModel.createProduct(id, product);
  await productsModel.addCategoriesToProduct(id, product.categoryIds);
  if (imageFile) {
    const productWithImage = await handleProductPicture(imageFile.path, createdProduct.rows[0].id);
    return productWithImage;
  }
  return createdProduct;
};

const getAllProducts = async (queries) => {
  const category = queries.category ? `%${queries.category}%` : null;
  const pageLimit = queries.pageLimit ? queries.pageLimit : 9;
  const sort = queries.sort ? queries.sort : 'p.created';
  const order = queries.order ? queries.order : 'DESC';
  const search = queries.search ? `%${queries.search}%` : null;
  const minPrice = queries.minPrice ? queries.minPrice : 1;
  const maxPrice = queries.maxPrice ? queries.maxPrice : 1000000;
  const page = queries.page ? queries.page : 1;
  const offset = (page - 1) * pageLimit;

  const { products, totalRows } = await productsModel.getAllProducts({
    category, pageLimit, sort, order, search, minPrice, maxPrice, offset,
  });
  const totalPages = Math.ceil(totalRows / pageLimit);
  return { products, totalPages };
};

const getProductById = async (productId) => {
  const product = await productsModel.getProductById(productId);
  if (!product) {
    throw new HttpError('Product not found.', 404);
  }
  return product.rows[0];
};

const updateProduct = async (productId, updates, imgFile) => {
  const updatedProduct = await productsModel.updateProduct(productId, updates);
  await productsModel.deleteAllCategoriesFromProduct(productId);
  await productsModel.addCategoriesToProduct(productId, updates.categoryIds);
  if (!updatedProduct) {
    throw new HttpError('Product not found.', 404);
  }
  if (imgFile) {
    const productWithImage = await updateProductPicture(updatedProduct.rows[0].product_url, imgFile, updatedProduct.rows[0].id);
    return productWithImage;
  }
  return updatedProduct;
};

const deleteProduct = async (productId) => {
  await productsModel.deleteAllCategoriesFromProduct(productId);
  const deleteResult = await productsModel.deleteProduct(productId);
  await deleteProductPicture(deleteResult.rows[0].product_url);
  return deleteResult;
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
