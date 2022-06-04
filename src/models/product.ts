import { client } from '../database';
import { product } from './types/product.types';

export class product_store {
  async index(): Promise<product[]> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await cn.query(sql);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error('error' + error);
    }
  }
  async show(id: string): Promise<product> {
    try {
      const sql = `SELECT * FROM product WHERE id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: product): Promise<product> {
    try {
      const sql =
        'INSERT INTO product (name,price,category) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const _product = result.rows[0];

      conn.release();

      return _product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<product[]> {
    try {
      const sql = `DELETE FROM product WHERE id='${id}'`;

      const cn = await client.connect();

      await cn.query(sql);

      const sql2 = `SELECT * FROM product WHERE id='${id}'`;
      const result = await cn.query(sql2);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async update(p: product): Promise<product> {
    try {
      const sql = `UPDATE product
            SET  name='${p.name}', price=${p.price}, category='${p.category}'
            WHERE id=${p.id}`;

      const conn = await client.connect();
      await conn.query(sql);

      // const result = await this.show("1");

      conn.release();

      return p;
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}`);
    }
  }

  async showByCategory(category: string): Promise<product[]> {
    try {
      const sql = `SELECT * FROM product WHERE category='${category}'`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find product ${category}. Error: ${err}`);
    }
  }
}
