import express, { Request, Response } from 'express';
import { product } from '../models/types/product.types';
import { product_store } from '../models/product';
import jwt_validator from '../middleware/jwt_middleware';

const ps = new product_store();

const index = async (req: Request, res: Response) => {
  const p = await ps.index();
  res.json(p);
};

const create = async (req: Request, res: Response) => {
  const p: product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const result = await ps.create(p);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
  //res.status(200).send(p)
};

const showById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result = await ps.show(id);
    if (result) {
      res.json(result);
    } else {
      res.json({ message: 'Product Not found' });
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const showByCategory = async (req: Request, res: Response) => {
  const category: string = req.params.category;

  try {
    const result = await ps.showByCategory(category);
    if (result) {
      res.json(result);
    } else {
      res.json({ message: 'Category Not found' });
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

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

const product_routes = (app: express.Application) => {
  app.get('/product', jwt_validator, index);
  app.post('/product', create);
  app.get('/product/:id', showById);
  app.delete('/product/:id', Delete);
  app.get('/product_category/:category', showByCategory);
  //show all if category not provided
  app.get('/product_category', index);
};
export default product_routes;
