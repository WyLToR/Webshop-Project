import HttpError from '../utils/HttpError';

export default async (req, res, next) => {
  const { userId } = req.params;
  const { id, isActivated } = req.user;
  if (!userId) return next(new HttpError('UserId is missing.', 500));
  if (!id) return next(new HttpError('Token is missing.', 500));
  if (!isActivated) return next(new HttpError("User isn't activated", 500));

  if (id === userId && isActivated) return next();

  return next(new HttpError('Permission denied.', 403));
};
