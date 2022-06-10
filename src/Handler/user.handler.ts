import express, { Request, Response } from 'express';
import { User } from '../models/types/user.types';
import { user_model } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { jwt_token } from '../configuration';
import jwt_validator from '../middleware/jwt_middleware';

const ps = new user_model();

const index = async (req: Request, res: Response) => {
  const p = await ps.index();
  res.json(p);
};

const create = async (req: Request, res: Response) => {
  const p: User = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pwd: req.body.pwd,
  };

  try {
    const result = await ps.create(p);
    // const user = result;
    const token = jwt.sign(`${result}`, `${jwt_token}`);
    console.log({ data: result, token: token });
    res.json({ data: result, token: token });
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};

const showByUseId = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result = await ps.showByUseId(id);
    if (result) {
      res.json(result);
    } else {
      res.json({ message: 'User Not found' });
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

// const showByCategory = async (req: Request, res: Response) => {
//   const category: string = req.params.category;

//   try {
//     const result = await ps.showByCategory(category);
//     if (result) {
//       res.json(result);
//     } else {
//       res.json({ message: 'Category Not found' });
//     }
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

// const Delete = async (req: Request, res: Response) => {
//   const id: string = req.params.id;

//   try {
//     const result = await ps.delete(id);
//     if (!result) {
//       res.json(result);
//     } else {
//       res.json('Not found');
//     }
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

const auth = async (req: Request, res: Response) => {
  const p: User = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pwd: req.body.pwd,
  };
  try {
    const result = await ps.auth(p.username, p.pwd);
    console.log('result=>' + result?.username);
    if (result) {
      //const user = result;
      const token = jwt.sign({ result }, `${jwt_token}`);
      res.status(200);
      res.json({
        user_data: { ...result },
        token: token,
        message: `user ${result.username} successfully authenticated`,
      });
    } else {
      res.status(400);
      res.json({ message: 'wrong user name or pwd !' });
      // res.json('Not found');
    }
  } catch (error) {
    res.status(400);
    res.json({ message: 'Error => ' + error });
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', jwt_validator, index);
  app.post('/user/create', create);
  app.get('/user/:id', jwt_validator, showByUseId);
  // app.delete('/user/:id', Delete);
  app.post('/login', auth);
};
export default user_routes;
