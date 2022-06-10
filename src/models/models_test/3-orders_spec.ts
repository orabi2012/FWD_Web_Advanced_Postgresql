import { Order_model } from '../../models/order.model';

const order_model = new Order_model();

describe('order test', () => {
  //   beforeAll(async function () {
  //     const _created_user = await _user_model.auth('aorabi', '123');
  //     console.log(_created_user?.id);
  //   });
  describe('1-Test order index ', () => {
    it('1-1: test index method is exist', () => {
      expect(order_model.index).toBeDefined();
    });

    it('1-2:test index return [] ', async () => {
      const result = await order_model.index();
      expect(result).toEqual([]);
    });
  });

  describe('2-Test order create_order ', () => {
    it('2-1:test Create method is exist', () => {
      expect(order_model.create_order).toBeDefined();
    });

    it('2-2:create method should add a order', async () => {
      const result = await order_model.create_order(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        order_status: 'opened',
      });
    });
  });

  describe('3-Test order show ', () => {
    it('3-1:test show method is exist', () => {
      expect(order_model.show).toBeDefined();
    });

    it('3-2:test show  ', async () => {
      const result = await order_model.show('1');
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        order_status: 'opened',
      });
    });
  });

  describe('4-Test order close_order ', () => {
    it('4-1:test close_order method is exist', () => {
      expect(order_model.close_order).toBeDefined();
    });

    it('4-2:close_order method should add a order', async () => {
      const result = await order_model.close_order(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        order_status: 'completed',
      });
    });
  });
  describe('5-Test order showByUser ', () => {
    it('5-1:test showByUser method is exist', () => {
      expect(order_model.showByUser).toBeDefined();
    });

    it('5-2:showByUser method should = 1', async () => {
      const result = await order_model.showByUser(1);
      expect(result.length).toEqual(1);
    });
  });
  describe('6-Test order create_order_detail ', () => {
    it('6-1:test create_order_detail method is exist', () => {
      expect(order_model.create_order_detail).toBeDefined();
    });

    it('6-2:create_order_detail method ', async () => {
      const result = await order_model.create_order_detail(1, 1, 100);
      expect(result).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 100,
      });
    });
  });
});
