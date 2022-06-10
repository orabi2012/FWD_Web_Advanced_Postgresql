/* Replace with your SQL commands */
CREATE TABLE  Orders
(
    id  SERIAL PRIMARY KEY,
    user_id integer REFERENCES Users(id) NOT NULL,
    order_status VARCHAR(10)  NOT NULL
);
