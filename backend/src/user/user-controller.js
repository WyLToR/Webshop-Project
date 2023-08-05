import userService from './user-service';

const userController = {
  setOrderData: async (req, res, next) => {
    try {
      const data = await userService.setUserOrderData(req.body, req.params.userId);
      res.status(201).json(data[0]);
    } catch (err) {
      next(err);
    }
  },
  setBaseData: async (req, res, next) => {
    try {
      const data = await userService.setUserBaseData(req.body, req.params.userId);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  setNewPassword: async (req, res, next) => {
    try {
      await userService.changeUserPassword(req.params, req.body);
      res.status(201).json({
        message: 'Password change is successful!',
      });
    } catch (err) {
      next(err);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.userId);
      res.status(201).json(user.rows[0]);
    } catch (err) {
      next(err);
    }
  },
  getUserByEmail: async (req, res, next) => {
    try {
      const user = await userService.getUserByEmail(req.params.email);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const users = await userService.getAllUser(req.query);
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  setUserDeactivate: async (req, res, next) => {
    try {
      await userService.deactivateUser(req.params.userId);
      res.status(201).json({ message: 'Account delete successful' });
    } catch (err) {
      next(err);
    }
  },
  setUserAdminPermission: async (req, res, next) => {
    try {
      await userService.setUserPermission(req.body);
      res.status(201).json({ message: 'Account permission sucessfully modified' });
    } catch (err) {
      next(err);
    }
  },
  setAdminUserDeactivate: async (req, res, next) => {
    try {
      await userService.adminDeactivateUser(req.params.deletingUserId);
      res.status(201).json({ message: 'Account delete successful' });
    } catch (err) {
      next(err);
    }
  },
};
export default userController;
