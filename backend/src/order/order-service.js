import { nanoid } from 'nanoid';
import orderModel from './order-model';
import cartModel from '../cart/cart-model';
import productModel from '../product/product-model';
import HttpError from '../utils/HttpError';

const orderService = {

  readAllOrder: async (queries) => {
    const direction = queries.order || 'ASC';
    const searched = queries.search ? `%${queries.search}%` : null;
    const pageLimit = queries.pageLimit ? queries.pageLimit : 9;
    const page = queries.page ? queries.page : 1;
    const offset = (page - 1) * pageLimit;
    const { orders, totalRows } = await orderModel.readAllOrder({
      direction, searched, pageLimit, offset,
    });
    const totalPages = Math.ceil(totalRows / pageLimit);
    return { orders, totalPages };
  },

  getOrderById: async (orderId) => {
    const orderDetails = await orderModel.getOrderById(orderId);
    return orderDetails.rows[0];
  },

  readUserOrders: async ({ userId }, queries) => {
    const direction = queries.order || 'ASC';
    const searched = queries.search ? `%${queries.search}%` : null;
    const pageLimit = queries.pageLimit ? queries.pageLimit : 9;
    const page = queries.page ? queries.page : 1;
    const offset = (page - 1) * pageLimit;
    const { orders, totalRows } = await orderModel.readAllUserOrder({
      userId, direction, searched, pageLimit, offset,
    });
    const totalPages = Math.ceil(totalRows / pageLimit);
    return { orders, totalPages };
  },

  addOrder: async ({ userId }, { deliveryDate }) => {
    const id = nanoid(24);
    const userCartItems = await cartModel.getUserCart(userId);
    await (async () => {
      for (let i = 0; i < userCartItems.rows.length; i += 1) {
        const product = userCartItems.rows[i];
        // eslint-disable-next-line no-await-in-loop
        const productToSubstractFrom = await productModel.getProductById(product.id);
        if (productToSubstractFrom.rows[0].quantity < product.amount) {
          throw new HttpError('Insufficient stock', 409);
        } else {
          productModel.substractAmount(product.product_id, product.amount);
        }
      }
    })();
    await cartModel.deleteUserItems(userId);
    const newOrder = await orderModel.addOrder(id, userId, deliveryDate);
    userCartItems.rows.forEach(async (product) => {
      await orderModel.addOrderedProducts(id, product.id, product.amount);
    });
    return newOrder.rows[0];
  },

  completeOrder: async ({ orderId }) => {
    const deletedOrder = await orderModel.completeOrder(orderId);
    return deletedOrder.rows;
  },

  deleteOrder: async ({ orderId }) => {
    const deletedOrder = await orderModel.deleteOrder(orderId);
    return deletedOrder.rows;
  },
};

export default orderService;
