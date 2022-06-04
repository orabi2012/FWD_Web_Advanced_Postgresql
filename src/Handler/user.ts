import express, { Request, Response } from 'express';
import { user } from '../models/types/user.types';
import { user_store } from '../models/user';

const ps = new user_store();

const index = async (req: Request, res: Response) => {
  const p = await ps.index();
  res.json(p);
};

const create = async (req: Request, res: Response) => {
  const p: user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  try {
    const result = await ps.create(p);
    console.log({ result });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};

const showById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result = await ps.show(id);
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

const Delete = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result = await ps.delete(id);
    if (!result) {
      res.json(result);
    } else {
      res.json('Not found');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/user', index);
  app.post('/user', create);
  app.get('/user/:id', showById);
  app.delete('/user/:id', Delete);
};
export default user_routes;
