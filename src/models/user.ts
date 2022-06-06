import client from '../database';
import { user } from './types/user.types';
import bcrypt from 'bcrypt';
import { bcrypt_pwd, bcrypt_salt } from '../configuration';

const hash_pwd = (passowrd: string): string => {
  const salt: number = parseInt(bcrypt_salt as string, 10);

  return bcrypt.hashSync(`${passowrd}${bcrypt_pwd}`, salt);
};

export class user_store {
  async index(): Promise<user[]> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT * FROM "User"';
      const result = await cn.query(sql);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error('error' + error);
    }
  }
  async show(id: string): Promise<user> {
    try {
      const sql = `SELECT * FROM "User" WHERE id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find "User" ${id}. Error: ${err}`);
    }
  }

  async showByUsername(username: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM "User" WHERE username=($1)';

      const cn = await client.connect();

      const result = await cn.query(sql, [username]);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find "User" ${username}. Error: ${err}`);
    }
  }

  async create(p: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO "User" (username,firstname,lastname,password) VALUES($1, $2, $3 ,$4) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        p.username,
        p.firstname,
        p.lastname,
        hash_pwd(p.password),
      ]);

      const _user = result.rows[0];

      conn.release();
      return _user;
    } catch (err) {
      throw new Error(`Could not add new user ${p.username}. ${err}`);
    }
  }

  async delete(id: string): Promise<user[]> {
    try {
      const sql = `DELETE FROM "User" WHERE id='${id}'`;

      const cn = await client.connect();

      await cn.query(sql);

      const sql2 = `SELECT * FROM "User" WHERE id='${id}'`;
      const result = await cn.query(sql2);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async update(p: user): Promise<user> {
    try {
      const sql = `UPDATE "User"
            SET  password='${p.password}'
            WHERE id=${p.id}`;

      const conn = await client.connect();
      await conn.query(sql);

      // const result = await this.show("1");

      conn.release();

      return p;
    } catch (err) {
      throw new Error(`Could not update user ${p.username}. Error: ${err}`);
    }
  }

  async auth(username: string, plainPassword: string): Promise<user | null> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT "password" FROM "User" WHERE username=($1)';
      const result = await cn.query(sql, [username]);
      console.log(plainPassword + bcrypt_pwd);
      if (result.rows.length) {
        const user = result.rows[0];
        const isvalid = bcrypt.compareSync(
          `${plainPassword}${bcrypt_pwd}`,
          user.password
        ); // true
        // console.log('isvalid =>' + isvalid);
        if (isvalid) {
          const user = await this.showByUsername(username);
          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('error' + error);
    }
  }
}
