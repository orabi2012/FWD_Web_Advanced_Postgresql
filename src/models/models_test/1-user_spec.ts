import { User_model } from '../user.model';
//import { user } from '../../models/types/user.types';
//import client from '../../database';

const bs = new User_model();

// beforeAll(async function () {
//     const cn = await client.connect();
//     const sql = 'DELETE FROM users;';
//     await cn.query(sql);

//     const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
//     await cn.query(reset);
//     cn.release();
//     console.log('-RESET-Table---------------------------------');

//     //anything in here will apply to everything in each nested describe
// });
describe('Test User Model Functions', () => {
  describe('1-Test index ', () => {
    it('1-1: test index method is exist', () => {
      expect(bs.index).toBeDefined();
    });

    it('1-2:test index return [] ', async () => {
      const result = await bs.index();
      expect(result).toEqual([]);
    });
  });
  describe('2-Test Create ', () => {
    it('2-1:test Create method is exist', () => {
      expect(bs.create).toBeDefined();
    });

    it('2-2:create method should add a user', async () => {
      const result = await bs.create({
        username: 'aorabi',
        firstname: 'ahmed',
        lastname: 'orabi',
        pwd: '123',
      });

      // console.log(result);
      expect(result.id).toEqual(1);
      expect(result.username).toEqual('aorabi');
      expect(result.firstname).toEqual('ahmed');
      expect(result.lastname).toEqual('orabi');
      expect(result.pwd).toBeTruthy;
    });
  });
  describe('3-Test showByUseId ', () => {
    it('3-1:test show method is exist', () => {
      expect(bs.showByUseId).toBeDefined();
    });

    it('3-2:test show return [1] ', async () => {
      const result = await bs.showByUseId('1');
      expect(result.id).toEqual(1);
      expect(result.username).toEqual('aorabi');
      expect(result.firstname).toEqual('ahmed');
      expect(result.lastname).toEqual('orabi');
      expect(result.pwd).toBeTruthy;
    });
  });
  describe('4-Test showByUsername ', () => {
    it('4-1:test show method is exist', () => {
      expect(bs.showByUsername).toBeDefined();
    });

    it('4-2:test show return [1] ', async () => {
      const result = await bs.showByUsername('aorabi');
      expect(result.id).toEqual(1);
      expect(result.username).toEqual('aorabi');
      expect(result.firstname).toEqual('ahmed');
      expect(result.lastname).toEqual('orabi');
      expect(result.pwd).toBeTruthy;
    });
  });
  describe('5-Test Auth ', () => {
    it('5-1:test Auth method is exist', () => {
      expect(bs.auth).toBeDefined();
    });

    it('5-2:test Auth correct user ', async () => {
      const result = await bs.auth('aorabi', '123');
      expect(result?.id).toEqual(1);
      expect(result?.username).toEqual('aorabi');
      expect(result?.firstname).toEqual('ahmed');
      expect(result?.lastname).toEqual('orabi');
      expect(result?.pwd).toBeTruthy;
    });
    it('5-3:test Auth incorrect user ', async () => {
      const result = await bs.auth('aorabi', '0');
      expect(result).toEqual(null);
    });
  });
});
