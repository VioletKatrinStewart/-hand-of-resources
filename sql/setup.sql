-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS music;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS aliens;

CREATE TABLE music (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    artist TEXT NOT NULL, 
    favorite_song TEXT NOT NULL 
);

CREATE TABLE venues (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    size TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    common_name TEXT NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    age INT NOT NULL CHECK (age > -1),
    color TEXT NOT NULL
);

CREATE TABLE aliens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    number_of_eyes INT NOT NULL, 
    color TEXT NOT NULL,
    location_sighted TEXT NOT NULL
);