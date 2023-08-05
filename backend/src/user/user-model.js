import client from '../db/db';
import HttpError from '../utils/HttpError';
import {
  activateUser,
  changeUserPasswordQuery,
  createUserOrderDataQuery,
  createUserQuery,
  deactivateUserQuery,
  getUserByEmailAndPassword,
  getUserIdByEmail,
  getUsersRowsTotal,
  readAllUsersQuery,
  readUserByEmailQuery,
  readUserByIdQuery,
  updateUserAdminPermission,
  updateUserBaseDataQuery,
} from './user-queries';

const userModel = {
  create: async (userId, email, password, firstName, lastName) => {
    try {
      const user = await client.query(
        createUserQuery,
        [userId, email, password, firstName, lastName],
      );
      return user;
    } catch {
      throw new HttpError('Server error : already registered', 500);
    }
  },
  createOrderData: async (postcode, state, city, street, houseNumber, userId) => {
    const data = await client.query(
      createUserOrderDataQuery,
      [postcode, state, city, street, houseNumber, userId],
    );
    return data.rows;
  },
  readById: async (userId) => {
    const user = await client.query(readUserByIdQuery, [userId]);
    return user;
  },
  readByEmail: async (email) => client.query(readUserByEmailQuery, [email]),
  readValidUser: async (email, password) => {
    const valid = await client.query(getUserByEmailAndPassword, [email, password]);
    return valid;
  },
  readAllUser: async (options) => {
    const {
      pageLimit, sort, order, search, offset,
    } = options;
    const orderQuery = sort ? ` ORDER BY ${sort} ${order}` : '';
    const limitQuery = ` LIMIT ${pageLimit} OFFSET ${offset}`;
    const users = await client.query(`${readAllUsersQuery}${orderQuery}${limitQuery}`, [search]);
    const totalRows = await client.query(getUsersRowsTotal, [search]);
    return {
      users: users.rows,
      totalRows: totalRows.rows[0].total,
    };
  },
  updateBaseData: async (email, firstName, lastName, userId) => {
    const data = await client.query(
      updateUserBaseDataQuery,
      [email, firstName, lastName, userId],
    );
    return data.rows;
  },
  changePassword: async (userId, password) => {
    const newPassword = await client.query(changeUserPasswordQuery, [password, userId]);
    return newPassword.rows;
  },
  deactivate: async (userId) => client.query(deactivateUserQuery, [userId]),
  updateUserAdminPermission: async (isAdmin, userId) => {
    const data = await client.query(updateUserAdminPermission, [isAdmin, userId]);
    return data.rows;
  },
  adminDeactivate: async (userId) => client.query(deactivateUserQuery, [userId]),
  userEmailActivate: async (userId) => client.query(activateUser, [userId]),
  readUserIdFromEmail: async (email) => client.query(getUserIdByEmail, [email]),
};
export default userModel;
