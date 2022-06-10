import { product_model } from '../product.model';
//import { product } from '../../models/types/product.types';
//import client from '../../database';
import { user_model } from '../user.model';
const bs = new product_model();
const _user_model = new user_model();

describe('product test', () => {
  beforeAll(async function () {
    const _created_user = await _user_model.auth('aorabi', '123');
    console.log('&&&&&&&&&&&&&&');
    console.log(_created_user?.id);
  });
  describe('1-Test product index ', () => {
    it('1-1: test index method is exist', () => {
      expect(bs.index).toBeDefined();
    });

    it('1-2:test index return [] ', async () => {
      const result = await bs.index();
      expect(result).toEqual([]);
    });
  });

  describe('2-Test product Create ', () => {
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

  describe('3-Test product show ', () => {
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

  describe('4-Test product show By Category ', () => {
    it('4-1:test showByCategory method is exist', () => {
      expect(bs.showByCategory).toBeDefined();
    });

    it('4-2:test show By category Exist', async () => {
      const result = await bs.showByCategory('Injection');
      expect(result.length).toEqual(1);
    });
    it('4-3:test show By category NOT Exist', async () => {
      const result = await bs.showByCategory('fake');
      expect(result.length).toEqual(0);
    });
  });
});
