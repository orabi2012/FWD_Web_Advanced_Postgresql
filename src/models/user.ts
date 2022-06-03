import client from '../database';
import { user } from './types/user.types';

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

    async create(p: user): Promise<user> {
        try {
            const sql =
                'INSERT INTO "User" (firstName,lastName,password) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                p.firstname,
                p.lastname,
                p.password,
            ]);

            const _user = result.rows[0];

            conn.release();
          //  console.log(_user);
            return _user;
        } catch (err) {
            throw new Error(
                `Could not add new user ${p.firstname}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<user[]> {
        try {
            const sql = `DELETE FROM "User" WHERE id='${id}'`;
            // @ts-ignore
            const cn = await client.connect();

            const d = await cn.query(sql);

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

            // @ts-ignore
            const conn = await client.connect();
            await conn.query(sql);

            // const result = await this.show("1");

            conn.release();

            return p;
        } catch (err) {
            throw new Error(
                `Could not update user ${p.firstname}. Error: ${err}`
            );
        }
    }
}
