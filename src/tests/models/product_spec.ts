import { product_model } from '../../models/product.model';
//import { product } from '../../models/types/product.types';
//import client from '../../database';

const bs = new product_model();

// beforeAll(async function () {
//     const cn = await client.connect();
//     const sql = 'DELETE FROM books;';
//     await cn.query(sql);

//     const reset = 'ALTER SEQUENCE books_id_seq RESTART WITH 1;';
//     await cn.query(reset);
//     cn.release();
//     console.log('-RESET-Table-Books--------------------------------');

//     //anything in here will apply to everything in each nested describe
// });

describe('product test', () => {
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

    it('2-2:create method should add a product', async () => {
      const result = await bs.create({
        name: 'meronem',
        price: 100,
        category: 'Injection',
      });
      expect(result).toEqual({
        id: 1,
        name: 'meronem',
        price: 100,
        category: 'Injection',
      });
    });
  });

  describe('3-Test show ', () => {
    it('3-1:test show method is exist', () => {
      expect(bs.show).toBeDefined();
    });

    it('3-2:test show return [meronem] ', async () => {
      const result = await bs.show('1');
      expect(result).toEqual({
        id: 1,
        name: 'meronem',
        price: 100,
        category: 'Injection',
      });
    });
  });

  describe('4-Test Update ', () => {
    it('4-1:test Update method is exist', () => {
      expect(bs.update).toBeDefined();
    });

    it('4-2:update method should update a product', async () => {
      const result = await bs.update({
        id: 1,
        name: 'meronem',
        price: 150,
        category: 'Injection',
      });
      expect(result).toEqual({
        id: 1,
        name: 'meronem',
        price: 150,
        category: 'Injection',
      });
    });
  });

  describe('5-Test Delete ', () => {
    it('5-1:test Delete method is exist', () => {
      expect(bs.delete).toBeDefined();
    });

    it('5-2:test Dalete return [] ', async () => {
      const result = await bs.delete('1');
      expect(result).toEqual([]);
    });
  });
});
