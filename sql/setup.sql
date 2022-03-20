-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS animes;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS undertones;
DROP TABLE IF EXISTS songs;

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

CREATE TABLE shows (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    watch_app TEXT NOT NULL
);

CREATE TABLE undertones (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tone TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    singer TEXT NOT NULL
);

INSERT INTO
    songs (title, singer)
VALUES
    ('Addiction', 'Doja Cat'),
    ('Eventually', 'Tame Impala');
INSERT INTO
    undertones (tone, color)
VALUES
    ('olive', 'green'),
    ('cool', 'blue');
INSERT INTO
    shows (title, watch_app)
VALUES
    ('Ugly Betty', 'Hulu'),
    ('Peep Show', 'Hulu');
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

