/* Replace with your SQL commands */
CREATE TABLE  Orders
(
    order_id  SERIAL PRIMARY KEY,
    product_id integer REFERENCES Product(id) NOT NULL,
    quantity integer NOT NULL,
    user_id integer REFERENCES Users(id) NOT NULL,
    order_status VARCHAR(10)  NOT NULL
   
);