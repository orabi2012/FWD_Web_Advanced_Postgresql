import client from '../database';
import { Order } from './types/orders.types';

export class Order_model {
  async index(): Promise<Order[]> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await cn.query(sql);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error('error' + error);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE order_id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create(p: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders(product_id, quantity, user_id, order_status) VALUES ( $1, $2, $3, $4) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        p.product_id,
        p.quantity,
        p.user_id,
        p.order_status,
      ]);

      const _created = result.rows[0];

      conn.release();

      return _created;
    } catch (err) {
      throw new Error(`Could not add new order : ${err}`);
    }
  }
  async showByUser(user_id: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${user_id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }
}
