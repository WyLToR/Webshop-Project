import cartService from './cart-service';

export default {
  addToCart: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { productId, amount } = req.body;
      const dbResponse = await cartService.addToCart(userId, productId, amount);
      res.json(dbResponse.rows[0]);
    } catch (err) {
      next(err);
    }
  },

  deleteItemFromcart: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { productId, amount } = req.body;
      await cartService.deleteItemFromCart(userId, productId, amount);
      res.status(200).json({ message: 'Successful delete' });
    } catch (err) {
      res.status(400);
      next(err);
    }
  },

  getUserCart: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const dbResponse = await cartService.getUserCart(userId);
      res.json(dbResponse.rows);
    } catch (err) {
      next(err);
    }
  },

};
