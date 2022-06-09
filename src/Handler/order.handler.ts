import express, { Request, Response } from 'express';
import { Order } from '../models/types/orders.types';
import { Order_model } from '../models/order.model';
import jwt_validator from '../middleware/jwt_middleware';

const order_model = new Order_model();

const index = async (req: Request, res: Response) => {
  const order = await order_model.index();
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    user_id: req.body.user_id,
    order_status: req.body.order_status,
  };

  try {
    const result = await order_model.create(order);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
  //res.status(200).send(p)
};

const showByUser = async (req: Request, res: Response) => {
  const user_id: string = req.params.user_id;

  try {
    const result = await order_model.showByUser(user_id);
    if (result) {
      res.json(result);
    } else {
      res.json({ message: 'No Data Found' });
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/order', jwt_validator, index);
  app.post('/order', create);
  app.get('/user_orders/:user_id', showByUser);
  //show all if category not provided
};
export default order_routes;
