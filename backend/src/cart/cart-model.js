/* eslint-disable max-len */
import client from '../db/db';
import {
  addToCartQuery, decreaseAmountQuery, deleteItemFromCartQuery, deleteUserItems, findCartItem, getUserCartQuery, increaseAmountQuery,
} from './cart-queries';

export default {
  findCartItem: async (userId, productId) => client.query(findCartItem, [userId, productId]),

  addToCart: async (userId, productId, amount) => client.query(addToCartQuery, [userId, productId, amount]),

  getUserCart: async (userId) => client.query(getUserCartQuery, [userId]),

  deleteItemFromCart: async (userid, productId) => client.query(deleteItemFromCartQuery, [userid, productId]),

  increaseAmount: async (userId, productId, amount) => client.query(increaseAmountQuery, [userId, productId, amount]),

  decreaseAmount: async (userId, productId, amount) => client.query(decreaseAmountQuery, [userId, productId, amount]),

  deleteUserItems: async (userId) => client.query(deleteUserItems, [userId]),
};
