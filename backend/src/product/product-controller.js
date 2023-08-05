/* eslint-disable max-len */
import productService from './product-service';

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body, req.file);
    res.json(newProduct.rows[0]);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { products, totalPages } = await productService.getAllProducts(req.query);
    res.json({ products, totalPages });
  } catch (err) {
    next(err);
  }
};

const getAllProductsInfinite = async (req, res, next) => {
  try {
    const { products } = await productService.getAllProducts(req.query);
    res.send([...products]);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.productId, req.body, req.file);
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.productId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsInfinite,
};
