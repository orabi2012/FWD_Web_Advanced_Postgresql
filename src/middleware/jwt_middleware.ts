import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
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
        // get userid from token
        const decoded: JwtPayload = jwt_decode(token);
        const { result } = decoded;
        const user_id = result.id;
        // console.log(user_id);
        // send userid with req
        req.body.user_id = user_id;
        req.body.token = token;
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
