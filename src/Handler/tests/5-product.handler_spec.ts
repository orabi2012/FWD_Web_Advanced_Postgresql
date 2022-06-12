import supertest from 'supertest';
import app from '../../server';
import { User_model } from '../../models/user.model';
import { User } from '../../models/types/user.types';
import client from '../../database';
// import { Product_model } from '../../models/product.model';
import { Product } from '../../models/types/product.types';

//import { token } from 'morgan';

const request = supertest(app);

const user_model = new User_model();
// const product_model = new Product_model();

let test_token = '';
// let user_id = 0;
const user: User = {
  username: 'product_user',
  firstname: 'product',
  lastname: 'user',
  pwd: 'test123',
};
const product: Product = {
  name: 'Endoxan 1gm Vial',
  price: 500,
  category: 'chemo',
};

describe('Check Product Routes', function () {
  beforeAll(async function () {
    const created_user = await user_model.create(user);
    user.id = created_user.id;
    const response = await request
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send({ username: user.username, pwd: user.pwd });
    const { token } = response.body;
    //const { id } = response.body.user_data;
    test_token = token;
    //  user_id = id;
  });

  afterAll(async function () {
    const cn = await client.connect();
    const sql = 'DELETE FROM users;';
    const sql_p = 'DELETE FROM product;';
    const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    const reset_p = 'ALTER SEQUENCE product_id_seq RESTART WITH 1;';

    await cn.query(reset);
    await cn.query(sql);

    await cn.query(reset_p);
    await cn.query(sql_p);

    cn.release();
  });

  describe('Check /product/create', function () {
    it('check Endpoint is correct data = 200', async () => {
      const response = await request
        .post('/product/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`)
        .send(product);
      expect(response.status).toBe(200);
    });
    it('check Endpoint NOt Authorized = 401', async () => {
      const response = await request
        .post('/product/create')
        .set('Content-Type', 'application/json')
        // .set('Authorization', `Bearer ${test_token}`)
        .send(product);
      expect(response.status).toBe(401);
    });
  });
  describe('Check /product/:id', function () {
    it('check Endpoint product/1 is correct = 200', async () => {
      const response = await request
        .get('/product/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe(product.name);
      expect(response.body.price).toBe(product.price);
      expect(response.body.category).toBe(product.category);
      //done();
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
  describe('Check /products', function () {
    it('check Endpoint products is correct = 200', async () => {
      const response = await request
        .get('/products')
        .set('Content-Type', 'application/json');
      // .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });
  describe('Check /products/:category/category', function () {
    it('check Endpoint category/chemo is correct = 200 / 1', async () => {
      const response = await request
        .get('/products/chemo/category')
        .set('Content-Type', 'application/json');
      // .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      //done();
    });
    it('check Endpoint category/fake is Not correct = 404 / 0 ', async () => {
      const response = await request
        .get('/products/fake/category')
        .set('Content-Type', 'application/json');
      // .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(404);
      expect(response.body.length).toBe(undefined);
      //done();
    });
  });
});
