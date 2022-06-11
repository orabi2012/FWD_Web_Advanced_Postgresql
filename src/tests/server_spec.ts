import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

describe('Check Route GET /', function () {
  it('check /  Endpoint is Found = 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    //done();
  });
  it('check /x Endpoint Not Found = 404', async () => {
    const response = await request.get('/x');
    expect(response.status).toBe(404);
    //done();
  });
});
