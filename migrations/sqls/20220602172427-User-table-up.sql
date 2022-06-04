/* Replace with your SQL commands */
CREATE TABLE "User"
(
    id  SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    firstName VARCHAR(50)  NOT NULL,
    lastName VARCHAR(50)  NOT NULL,
    "password" VARCHAR(100)  NOT NULL
);