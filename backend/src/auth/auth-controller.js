import authService from './auth-services';

const authController = {
  register: async (req, res, next) => {
    try {
      await authService.register(req.body);
      res.json({ message: 'Registration successful' });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const token = await authService.login(req.body);
      res.json(token);
    } catch (err) {
      next(err);
    }
  },
  setUserEmailActivate: async (req, res, next) => {
    try {
      await authService.setUserEmailActive(req.params.userId);
      res.status(201).json({ message: 'User email activated successfully' });
    } catch (err) {
      next(err);
    }
  },
  sendUserActivatorMail: async (req, res, next) => {
    try {
      await authService.resendActivationEmail(req.body.email);
      res.status(201).json({ message: 'Email sended for activation!' });
    } catch (err) {
      next(err);
    }
  },
};
export default authController;
