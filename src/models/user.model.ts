import client from '../database';
import { User } from './types/user.types';
import bcrypt from 'bcrypt';
import { bcrypt_pwd, bcrypt_salt } from '../configuration';

const hash_pwd = (passowrd: string): string => {
  if (passowrd == null) {
    return '';
  }
  const salt: number = parseInt(bcrypt_salt as string, 10);

  return bcrypt.hashSync(`${passowrd}${bcrypt_pwd}`, salt);
};

export class User_model {
  async index(): Promise<User[]> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT * FROM Users';
      const result = await cn.query(sql);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error('error' + error);
    }
  }
  async showByUseId(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM Users WHERE id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Users ${id}. Error: ${err}`);
    }
  }

  async showByUsername(username: string): Promise<User> {
    try {
      const sql =
        'SELECT id,username,firstname,lastname FROM Users WHERE username=($1)';

      const cn = await client.connect();

      const result = await cn.query(sql, [username]);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${username}. Error: ${err}`);
    }
  }

  async create(p: User): Promise<User> {
    try {
      if (p.pwd != null && p.pwd != '') {
        const sql =
          'INSERT INTO Users (username,firstname,lastname,pwd) VALUES($1, $2, $3 ,$4) RETURNING *';

        const conn = await client.connect();

        const result = await conn.query(sql, [
          p.username,
          p.firstname,
          p.lastname,
          hash_pwd(p.pwd),
        ]);

        const _user = result.rows[0];

        conn.release();
        return _user;
      } else {
        throw new Error(`No Password Provided ${p.username}`);
      }
    } catch (err) {
      throw new Error(`Could not add new user ${p.username}. ${err}`);
    }
  }

  async auth(username: string, plainPassword: string): Promise<User | null> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT "pwd" FROM Users WHERE username=($1)';
      const result = await cn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        const isvalid = bcrypt.compareSync(
          `${plainPassword}${bcrypt_pwd}`,
          user.pwd
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
