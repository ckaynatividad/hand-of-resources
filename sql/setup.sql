-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS animes;


CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL CHECK (age > -1),
    type TEXT
);

CREATE TABLE animes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL
);

INSERT INTO 
    animes (title, genre)
VALUES
    ('My Dress-Up Darling', 'shojo'),
    ('xxxHolic', 'shonen');
INSERT INTO
    cats (name, age, type)
VALUES
    ('Cardamon', 4, 'Himalayan'),
    ('Bucket', 5, 'Scottish Fold Tabby');

