import productModel from '../product/product-model';
import HttpError from '../utils/HttpError';
import cartModel from './cart-model';

export default {
  addToCart: async (userId, productId, amount) => {
    const stockAvailable = await productModel.getProductById(productId);
    if (stockAvailable.rows[0].quantity < amount) throw new HttpError('Insufficent stock', 409);
    const dbResponse = await cartModel.findCartItem(userId, productId);
    if (!dbResponse.rows[0]) {
      try {
        return await cartModel.addToCart(userId, productId, amount);
      } catch (err) {
        throw new HttpError('Error in adding product to cart', 400);
      }
    }
    return cartModel.increaseAmount(userId, productId, amount);
  },

  deleteItemFromCart: async (userId, productId, amount) => {
    const dbResponse = await cartModel.findCartItem(userId, productId);

    if (!dbResponse.rows[0]) {
      throw new HttpError('Cart not found', 401);
    }

    if (dbResponse.rows[0].amount < amount) {
      throw new HttpError('Invalid amount', 409);
    }

    if (dbResponse.rows[0].amount > 1) {
      return cartModel.decreaseAmount(userId, productId, amount);
    }
    return cartModel.deleteItemFromCart(userId, productId);
  },

  getUserCart: async (userId) => cartModel.getUserCart(userId),

};
