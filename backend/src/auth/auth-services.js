import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import brcrypt from 'bcrypt';
import userModel from '../user/user-model';
import HttpError from '../utils/HttpError';
import { JWT_SECRET } from '../constants/constants';
import sendActivateMail from '../email/email-service';

const authService = {
  register: async ({
    email, password, firstName, lastName,
  }) => {
    const id = nanoid(24);
    const user = {
      id, email, firstName, lastName,
    };
    sendActivateMail(user);
    const hashedPassword = await brcrypt.hash(password, 10);
    return userModel.create(id, email, hashedPassword, firstName, lastName);
  },
  login: async ({ email, password }) => {
    const result = await userModel.readByEmail(email);
    const user = result.rows[0];
    if (!user) throw new HttpError('Invalid email/password', 403);
    if (await brcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        id: user.id,
        email,
        firstName: user.first_name,
        lastName: user.last_name,
        created: user.created,
        isAdmin: user.is_admin,
        isActivated: user.is_activated,
      }, JWT_SECRET);
      return { token };
    }
    throw new HttpError('Invalid email/password', 403);
  },
  setUserEmailActive: async (userId) => {
    const user = await userModel.userEmailActivate(userId);
    if (!user) {
      throw new HttpError('User activation error', 400);
    }
    return user;
  },
  resendActivationEmail: async (email) => {
    const response = await userModel.readUserIdFromEmail(email);
    if (!response) {
      throw new HttpError('This user does not exist', 404);
    }
    const foundedUser = response.rows[0];
    const user = {
      email, firstName: foundedUser.first_name, lastName: foundedUser.last_name, id: foundedUser.id,
    };
    sendActivateMail(user);
    return user;
  },
};
export default authService;
