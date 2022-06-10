/* Replace with your SQL commands */
CREATE TABLE  Order_details
(   id  SERIAL PRIMARY KEY,
    order_id  integer REFERENCES Orders(id) NOT NULL,
    product_id integer REFERENCES Product(id) NOT NULL,
    quantity integer NOT NULL
);