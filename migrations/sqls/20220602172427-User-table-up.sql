/* Replace with your SQL commands */
CREATE TABLE "User"
(
    id  SERIAL PRIMARY KEY,
    firstName VARCHAR(50)  NOT NULL,
    lastName VARCHAR(50)  NOT NULL,
    "password" VARCHAR(50)  NOT NULL
);