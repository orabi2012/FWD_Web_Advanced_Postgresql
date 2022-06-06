import { Pool } from 'pg';
import {
  PG_HOST,
  NODE_ENV,
  PG_DB_DEV,
  PG_DB_TEST,
  PG_USER,
  PG_PASSOWRD,
  PG_PORT,
} from './configuration';

const client = new Pool({
  host: PG_HOST,
  database: NODE_ENV === 'dev' ? PG_DB_DEV : PG_DB_TEST,
  user: PG_USER,
  password: PG_PASSOWRD,
  port: parseInt(PG_PORT as string, 10),
});

client.on('error', (error: Error) => {
  console.error(error.message);
});

export default client;
