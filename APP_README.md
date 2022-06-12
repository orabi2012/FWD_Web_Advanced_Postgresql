# Storefront Backend Project

## Getting Started
- clone this reoo
-run npm install ( to install all required Packages)
- Create .env file in main app directory
  add this values (use your information) :- 

NODE_ENV=dev
PORT
PG_PORT
PG_HOST
PG_DB_DEV
PG_DB_TEST
PG_USER
PG_PASSOWRD
bcrypt_pwd
bcrypt_salt
jwt_token

- create 2 postgres databases  (dev and test)

- use package scripts : 
  - npm run up:dev 
    to run migrations up and create Dev database tabels 

  - npm run watch
    to run the application in development mood

  - npm run test 
    to run jasmine testing

## Required Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
