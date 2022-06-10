import express, { Request, Response } from 'express';
import { Product } from '../models/types/product.types';
import { product_model } from '../models/product.model';
import jwt_validator from '../middleware/jwt_middleware';

const ps = new product_model();

const index = async (req: Request, res: Response) => {
  const p = await ps.index();
  res.json(p);
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
const create = async (req: Request, res: Response) => {
  const p: Product = {
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
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/product/create', jwt_validator, create);
  app.get('/product/:id', showById);
  app.get('/products/:category/category', showByCategory);
};
export default product_routes;
