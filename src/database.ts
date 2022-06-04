import { Pool } from 'pg';
import * as dotenv from 'dotenv';
//let client: Pool;

dotenv.config();

const {
  PORT,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_DB_DEV,
  PG_DB_TEST,
  PG_USER,
  PG_PASSOWRD,
  bcrypt_pwd,
  bcrypt_salt,
} = process.env;

const client = new Pool({
  host: PG_HOST,
  database: NODE_ENV === 'dev' ? PG_DB_DEV : PG_DB_TEST,
  user: PG_USER,
  password: PG_PASSOWRD,
  port: parseInt(PG_PORT as string, 10),
});

console.log('Env = ' + NODE_ENV);
client.on('error', (error: Error) => {
  console.error(error.message);
});

//console.log(`data base = ${NODE_ENV}`)

export { PORT, client, bcrypt_pwd, bcrypt_salt };
