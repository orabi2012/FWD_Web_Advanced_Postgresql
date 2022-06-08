/* Replace with your SQL commands */
CREATE TABLE Users
(
    id  SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    firstName VARCHAR(50)  NOT NULL,
    lastName VARCHAR(50)  NOT NULL,
    pwd VARCHAR(100)  NOT NULL
);