import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/constants';

export default async function authorize(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Invalid token' });
  } else {
    const tokenBody = token.slice(7);
    jwt.verify(tokenBody, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = { ...decoded };
        next();
      }
    });
  }
}
