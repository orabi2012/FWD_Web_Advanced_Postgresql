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
  jwt_token,
} = process.env;

console.log('Env = ' + NODE_ENV);

//console.log(`data base = ${NODE_ENV}`)

export {
  PORT,
  PG_HOST,
  PG_PORT,
  PG_DB_DEV,
  PG_DB_TEST,
  PG_USER,
  PG_PASSOWRD,
  bcrypt_pwd,
  bcrypt_salt,
  jwt_token,
  NODE_ENV,
};
