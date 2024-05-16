CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
);
