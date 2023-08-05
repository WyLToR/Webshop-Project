import client from '../db/db';
import {
  addOrderQuery,
  addOrderedProductsQuery,
  completeOrderQuery,
  deleteOrderQuery,
  getOrderByIdQuery,
  getOrdersRowsTotal,
  getUserOrdersRowsTotal,
  readAllOrderQuery,
  readAllUserOrderQuery,
} from './order-queries';

const orderModel = {

  readAllOrder: async ({
    direction, searched, pageLimit, offset,
  }) => {
    const orderQuery = direction ? `ORDER BY delivery_date ${direction}` : '';
    const limitQuery = ` LIMIT ${pageLimit} OFFSET ${offset}`;
    const orders = await client.query(`${readAllOrderQuery} ${orderQuery}${limitQuery}`, [searched]);
    const totalRows = await client.query(getOrdersRowsTotal, [searched]);

    return {
      orders: orders.rows,
      totalRows: totalRows.rows[0].total,
    };
  },

  getOrderById: async (orderId) => client.query(getOrderByIdQuery, [orderId]),

  readAllUserOrder: async ({
    userId, direction, searched, pageLimit, offset,
  }) => {
    const orderQuery = direction ? `ORDER BY delivery_date ${direction}` : '';
    const limitQuery = ` LIMIT ${pageLimit} OFFSET ${offset}`;
    const userOrders = await client.query(`${readAllUserOrderQuery} ${orderQuery}${limitQuery}`, [userId, searched]);
    const totalRows = await client.query(getUserOrdersRowsTotal, [userId, searched]);
    return {
      orders: userOrders.rows,
      totalRows: totalRows.rows[0].total,
    };
  },

  addOrder: async (id, userId, deliveryDate) => {
    const newOrder = client.query(addOrderQuery, [id, userId, deliveryDate]);
    return newOrder;
  },

  addOrderedProducts: async (id, productId, amount) => {
    const orderedProds = client.query(addOrderedProductsQuery, [id, productId, amount]);
    return orderedProds;
  },

  completeOrder: async (orderId) => client.query(completeOrderQuery, [orderId]),

  deleteOrder: async (orderId) => client.query(deleteOrderQuery, [orderId]),

};

export default orderModel;
