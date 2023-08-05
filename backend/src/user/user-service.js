import brcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../utils/HttpError';
import userModel from './user-model';
import { JWT_SECRET } from '../constants/constants';

const userService = {
  setUserOrderData: async (orderData, userId) => {
    const {
      postCode, state, city, street, houseNumber,
    } = orderData;
    const createOrderData = await userModel.createOrderData(
      postCode,
      state,
      city,
      street,
      houseNumber,
      userId,
    );
    if (!createOrderData) {
      throw new HttpError('User data updating problem', 400);
    }
    return createOrderData;
  },
  setUserBaseData: async (userBaseData, userId) => {
    const {
      email, firstName, lastName,
    } = userBaseData;
    await userModel.updateBaseData(
      email,
      firstName,
      lastName,
      userId,
    );
    const result = await userModel.readByEmail(email);
    const newUserData = result.rows[0];
    const token = jwt.sign({
      id: newUserData.id,
      email,
      firstName: newUserData.first_name,
      lastName: newUserData.last_name,
      created: newUserData.created,
      isAdmin: newUserData.is_admin,
      isActivated: newUserData.is_activated,
    }, JWT_SECRET);
    return token;
  },
  changeUserPassword: async ({ userId }, { email, oldPassword, newPassword }) => {
    const result = await userModel.readByEmail(email);
    const user = result.rows[0];
    if (!user) throw new HttpError('Reading the user failed', 403);
    if (await brcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await brcrypt.hash(newPassword, 10);
      await userModel.changePassword(userId, hashedPassword);
    } else {
      throw new HttpError('Try again, something wrong', 403);
    }
  },
  getUserById: async (userId) => {
    const user = await userModel.readById(userId);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    return user;
  },
  getUserByEmail: async (email) => {
    const user = await userModel.readByEmail(email);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    return user;
  },
  getAllUser: async (query) => {
    const pageLimit = query.pageLimit ? query.pageLimit : 9;
    const sort = query.sort ? query.sort : 'users.email';
    const order = query.order ? query.order : 'ASC';
    const search = query.search ? `%${query.search}%` : null;
    const page = query.page ? query.page : 1;
    const offset = (page - 1) * pageLimit;
    const { users, totalRows } = await userModel.readAllUser(
      {
        pageLimit, sort, order, search, page, offset,
      },
    );
    const totalPages = Math.ceil(totalRows / pageLimit);
    return { users, totalPages };
  },
  deactivateUser: async (userId) => {
    const user = await userModel.deactivate(userId);
    if (!user) {
      throw new HttpError('User deactivate problem', 400);
    }
    return user;
  },
  setUserPermission: async (userData) => {
    const { isAdmin, userId } = userData;
    const user = await userModel.updateUserAdminPermission(isAdmin, userId);
    if (!user) {
      throw new HttpError('User permission change problem', 400);
    }
    return user;
  },
  adminDeactivateUser: async (userId) => {
    const user = await userModel.adminDeactivate(userId);
    if (!user) {
      throw new HttpError('User deactivate problem', 400);
    }
    return user;
  },
};
export default userService;
