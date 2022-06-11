import supertest from 'supertest';
import app from '../../server';
import { User_model } from '../../models/user.model';
import { User } from '../../models/types/user.types';
import client from '../../database';
//import { token } from 'morgan';

const request = supertest(app);

const user_model = new User_model();
let test_token = '';
let user_id = 0;
const user: User = {
  username: 'test_user',
  firstname: 'test',
  lastname: 'user',
  pwd: 'test123',
};
describe('Check Users Routes', function () {
  beforeAll(async function () {
    const created_user = await user_model.create(user);
    user.id = created_user.id;
  });

  afterAll(async function () {
    const cn = await client.connect();
    const sql = 'DELETE FROM users;';

    const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await cn.query(reset);
    await cn.query(sql);
    cn.release();
  });
  describe('Check user/login', function () {
    it('check Endpoint is correct = 200', async () => {
      const response = await request
        .post('/user/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'test_user', pwd: 'test123' });
      const { token } = response.body;
      const { id, username } = response.body.user_data;
      expect(response.status).toBe(200);
      expect(username).toEqual(user.username);
      test_token = token;
      user_id = id;
      //done();
    });
    it('check /  Endpoint is wrong = 400', async () => {
      const response = await request
        .post('/user/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'test_user', pwd: 'wrong' });
      expect(response.status).toBe(400);
      //done();
    });
  });
  describe('Check /users', function () {
    it('check Endpoint is correct = 200', async () => {
      const response = await request
        .get('/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      //done();
    });
    // it('check /  Endpoint is wrong = 400', async () => {
    //   const response = await request
    //     .post('/user/login')
    //     .set('Content-Type', 'application/json')
    //     .send({ username: 'test_user', pwd: 'wrong' });
    //   expect(response.status).toBe(400);
    //   //done();
    // });
  });
  describe('Check /user/create', function () {
    it('check Endpoint is correct data = 200', async () => {
      const response = await request
        .post('/user/create')
        .set('Content-Type', 'application/json')
        .send({
          username: 'test_user_2',
          pwd: 'test123',
          firstname: 'test',
          lastname: 'user_2',
        });
      expect(response.status).toBe(200);
    });
    it('check Endpoint is wrong data = 400', async () => {
      const response = await request
        .post('/user/create')
        .set('Content-Type', 'application/json')
        .send({
          // username: 'test_user_2',
          pwd: 'test123',
          firstname: 'test',
          lastname: 'user_2',
        });
      expect(response.status).toBe(400);
    });
  });
  describe('Check /user/:id', function () {
    it('check Endpoint user/1 is correct = 200', async () => {
      const response = await request
        .get('/user/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(user_id);
      expect(response.body.username).toBe(user.username);
      expect(response.body.firstname).toBe(user.firstname);
      expect(response.body.lastname).toBe(user.lastname);
      //done();
    });
    it('check Endpoint /user/1000 is Not correct = 404', async () => {
      const response = await request
        .get('/user/1000')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${test_token}`);
      expect(response.status).toBe(404);
      //done();
    });
  });
});
