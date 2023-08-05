import HttpError from '../utils/HttpError';

export default async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return next(new HttpError('Admin rights required!', 403));
  return next();
};
