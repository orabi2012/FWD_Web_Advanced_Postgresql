import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_token } from '../configuration';

const jwt_generator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;
  const token = jwt.verify(user, `${jwt_token}`);
  res.json(token);
  next();
};

export default jwt_generator;
