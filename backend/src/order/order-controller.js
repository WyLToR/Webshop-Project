import orderService from './order-service';

const orderController = {

  readAll: async (req, res, next) => {
    try {
      const allOrder = await orderService.readAllOrder(req.query);
      res.json(allOrder);
    } catch (err) {
      next(err);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const orderById = await orderService.getOrderById(req.params.orderId);
      res.json(orderById);
    } catch (err) {
      next(err);
    }
  },

  readAllUserOrder: async (req, res, next) => {
    try {
      const allUserOrder = await orderService.readUserOrders(req.params, req.query);
      res.json(allUserOrder);
    } catch (err) {
      next(err);
    }
  },

  addOrder: async (req, res, next) => {
    try {
      const newOrder = await orderService.addOrder(req.params, req.body);
      res.json(newOrder);
    } catch (err) {
      next(err);
    }
  },

  completeOrder: async (req, res, next) => {
    try {
      const deletedOrder = await orderService.completeOrder(req.params);
      res.json(deletedOrder);
    } catch (err) {
      next(err);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const deletedOrder = await orderService.deleteOrder(req.params);
      res.json(deletedOrder);
    } catch (err) {
      next(err);
    }
  },

};

export default orderController;
