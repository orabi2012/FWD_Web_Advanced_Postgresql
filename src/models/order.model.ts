import client from '../database';
import { Order } from './types/orders.types';
import { Order_detail } from './types/order_details.types';

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
      const sql = `SELECT * FROM orders WHERE id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create_order(user_id: number): Promise<Order> {
    try {
      const order_status = 'opened';
      const sql =
        'INSERT INTO orders(user_id, order_status) VALUES ( $1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [user_id, order_status]);

      const _created = result.rows[0];

      conn.release();

      return _created;
    } catch (err) {
      throw new Error(`Could not add new order : ${err}`);
    }
  }
  async close_order(order_id: number): Promise<Order> {
    try {
      const order_status = 'completed';
      const sql_update = `UPDATE orders SET order_status='${order_status}' WHERE id=${order_id};`;
      const sql = `SELECT * FROM orders WHERE id=${order_id}`;

      const conn = await client.connect();
      await conn.query(sql_update);

      const result = await conn.query(sql);

      const _updated = result.rows[0];

      conn.release();

      return _updated;
    } catch (err) {
      throw new Error(`Could not update  order : ${order_id}`);
    }
  }
  async showByUser(user_id: number): Promise<Order[]> {
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
  async create_order_detail(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<Order_detail> {
    try {
      // const order_status = 'pending';
      const sql =
        'INSERT INTO order_details(order_id, product_id, quantity) VALUES ( $1, $2 ,$3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [order_id, product_id, quantity]);

      const _created = result.rows[0];

      conn.release();

      return _created;
    } catch (err) {
      throw new Error(`Could not add new order_detail : ${err}`);
    }
  }
}
