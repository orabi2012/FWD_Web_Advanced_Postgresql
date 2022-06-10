import express, { Request, Response } from 'express';
// import { Order } from '../models/types/orders.types';
import { Order_model } from '../models/order.model';
import jwt_validator from '../middleware/jwt_middleware';
//import { Order_detail } from '../models/types/order_details.types';
import { Order_reports } from '../services/order_detail';

const order_model = new Order_model();
const order_reports = new Order_reports();

const index = async (req: Request, res: Response) => {
  const order = await order_model.index();
  res.json(order);
};

const create_order = async (req: Request, res: Response) => {
  // const order_id = req.body.id;

  const user_id = parseInt(req.body.user_id);

  try {
    const result = await order_model.create_order(user_id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};
const close_order = async (req: Request, res: Response) => {
  const order_id = parseInt(req.params.order_id);

  try {
    const result = await order_model.close_order(order_id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
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

const add_order_detail = async (req: Request, res: Response) => {
  // const order_id = req.body.id;

  const order_id = parseInt(req.params.order_id);
  const product_id = parseInt(req.body.product_id);
  const quantity = parseInt(req.body.quantity);

  try {
    const result = await order_model.create_order_detail(
      order_id,
      product_id,
      quantity
    );
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};

const showOpenedOrders = async (req: Request, res: Response) => {
  // const order_id = req.body.id;

  const user_id = parseInt(req.body.user_id);

  try {
    const result = await order_reports.showOpenedOrders(user_id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};
const order_routes = (app: express.Application) => {
  app.get('/order', jwt_validator, index);
  app.post('/order/create', jwt_validator, create_order);
  app.get('/order/opened', jwt_validator, showOpenedOrders);
  app.post('/order/:order_id/product', jwt_validator, add_order_detail);
  app.put('/order/:order_id/close', jwt_validator, close_order);
  app.get('/user_orders/:user_id', showByUser);
  //show all if category not provided
};
export default order_routes;
