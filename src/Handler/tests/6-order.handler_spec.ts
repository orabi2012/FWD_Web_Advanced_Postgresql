import supertest from 'supertest';
import app from '../../server';
import { User_model } from '../../models/user.model';
import { User } from '../../models/types/user.types';
import client from '../../database';
import { Product_model } from '../../models/product.model';
import { Product } from '../../models/types/product.types';
//import { Order_model } from '../../models/order.model';
import { Order_detail } from '../../models/types/order_details.types';
import { Order } from '../../models/types/orders.types';

const request = supertest(app);

const user_model = new User_model();
const product_model = new Product_model();

let test_token = '';
// let user_id = 0;
const user: User = {
  username: 'order_user',
  firstname: 'order',
  lastname: 'user',
  pwd: 'test123',
};
const product: Product = {
  name: 'Endoxan 1gm Vial',
  price: 500,
  category: 'chemo',
};
const order: Order = {
  user_id: 1,
  order_status: 'active',
};
const order_detail: Order_detail = {
  order_id: 1,
  product_id: 1,
  quantity: 100,
};
describe('Check Orders Routes', function () {
  beforeAll(async function () {
    const created_user = await user_model.create(user);
    user.id = created_user.id;

    const created_product = await product_model.create(product);
    product.id = created_product.id;

    const response = await request
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send({ username: user.username, pwd: user.pwd });
    const { token } = response.body;
    // const { id } = response.body.user_data;
    test_token = token;

    //  user_id = id;
  });

  afterAll(async function () {
    const cn = await client.connect();
    const sql = 'DELETE FROM users;';
    const sql_p = 'DELETE FROM product;';
    const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    const reset_p = 'ALTER SEQUENCE product_id_seq RESTART WITH 1;';
    const sql_orders = 'DELETE FROM orders';
    const sql_order_detail = 'DELETE FROM order_details';
    const reset_orders = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    const reset_order_detail =
      'ALTER SEQUENCE order_details_id_seq RESTART WITH 1;';
    await cn.query(reset_order_detail);
    await cn.query(sql_order_detail);
    await cn.query(reset_orders);
    await cn.query(sql_orders);
    await cn.query(reset_p);
    await cn.query(sql_p);

    await cn.query(reset);
    await cn.query(sql);

    cn.release();
  });

  describe('Check /order/create', function () {
    it('check Endpoint is correct data = 200', async () => {
      const response = await request
        .post('/order/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`)
        .send(order);
      expect(response.status).toBe(200);
    });
    it('check Endpoint NOt Authorized = 401', async () => {
      const response = await request
        .post('/order/create')
        .set('Content-Type', 'application/json')
        // .set('Authorization', `Bearer ${test_token}`)
        .send(product);
      expect(response.status).toBe(401);
    });
  });
  describe('Check /order/:order_id/product', function () {
    it('check Endpoint is correct data = 200', async () => {
      const response = await request
        .post('/order/1/product')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`)
        .send(order_detail);
      expect(response.status).toBe(200);
    });
    it('check Endpoint NOt Authorized = 401', async () => {
      const response = await request
        .post('/order/1/product')
        .set('Content-Type', 'application/json')
        // .set('Authorization', `Bearer ${test_token}`)
        .send(product);
      expect(response.status).toBe(401);
    });
  });
  describe('Check /order/active', function () {
    it('check Endpoint /order/active is correct = 200', async () => {
      const response = await request
        .get('/order/active')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          order_id: 1,
          product_id: 1,
          name: 'Endoxan 1gm Vial',
          price: 500,
          quantity: 100,
          total: 50000,
        },
      ]);
    });
    it('check Endpoint /product/1000 is Not correct = 404', async () => {
      const response = await request
        .get('/product/1000')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(404);
      //done();
    });
  });
});
