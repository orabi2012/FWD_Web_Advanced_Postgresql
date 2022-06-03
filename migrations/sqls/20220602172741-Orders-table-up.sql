/* Replace with your SQL commands */
CREATE TABLE  Orders
(
    id  SERIAL PRIMARY KEY,
    product_id integer REFERENCES Product(id) NOT NULL,
    quantity integer NOT NULL,
    "user_id" integer REFERENCES "User"(id) NOT NULL,
    status VARCHAR(10)  NOT NULL
   
);