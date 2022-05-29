import client from '../database';
import { book } from './book.types';

export class books_store {
    
    async index(): Promise<book[]> {
        try {
            const cn = await client.connect();
            const sql = 'SELECT * FROM books';
            const result = await cn.query(sql);
           // console.log(result.rows);
            cn.release();
            return result.rows;
        } catch (error) {
            throw new Error('error' + error);
        }
    }
    async show(id: string): Promise<book> {
        try {
            const sql = `SELECT * FROM books WHERE id=${id}`;

            const cn = await client.connect();

            const result = await cn.query(sql);

            cn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
    }
  
    async create(b: book): Promise<book> {
        try {
            const sql =
                'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                b.title,
                b.author,
                b.total_pages,
                b.summary,
            ]);

            const book = result.rows[0];

            conn.release();

            return book;
        } catch (err) {
            throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<book[]> {
        try {
            const sql = `DELETE FROM books WHERE id='${id}'`;
            // @ts-ignore
            const cn = await client.connect();

            const d = await cn.query(sql);

            const sql2 = `SELECT * FROM books WHERE id='${id}'`;
            const result = await cn.query(sql2);
           // console.log(result.rows);
            cn.release();
            return result.rows;

        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`);
        }
    }

    async update(b: book): Promise<book> {
        try {
            const sql = `UPDATE books
            SET  title='${b.title}', total_pages=${b.total_pages}, author='${b.author}', summary='${b.summary}'
            WHERE id=${b.id}`
               
            // @ts-ignore
            const conn = await client.connect();
            await conn.query(sql);

           // const result = await this.show("1");

          //  const book = await this.show(`${b.id}`);

            conn.release();

            return b;
        } catch (err) {
            throw new Error(`Could not update book ${b.title}. Error: ${err}`);
        }
    }
}
