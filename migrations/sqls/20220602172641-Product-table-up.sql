/* Replace with your SQL commands */
CREATE TABLE  Product
(
    id  SERIAL PRIMARY KEY,
    name VARCHAR(100)  NOT NULL UNIQUE,
    price integer NOT NULL,
    category VARCHAR(50)  NOT NULL
);
