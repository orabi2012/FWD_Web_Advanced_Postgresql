import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_token } from '../configuration';

const jwt_validator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get('Authorization');
  if (auth) {
    // console.log(auth);
    // const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];
    if (token) {
      try {
        jwt.verify(token, jwt_token as unknown as string);
        // console.log(jwt_payload);
        console.log('Authorized Access');
        next();
      } catch (error) {
        jwt_error(res);
      }

      // next();
    } else {
      jwt_error(res);
    }
  } else {
    jwt_error(res);
  }
};

const jwt_error = async (res: Response) => {
  res.statusCode = 401;
  console.log('Unauthorized Access');
  res.json({ message: 'Unauthorized Access' });
};
export default jwt_validator;
