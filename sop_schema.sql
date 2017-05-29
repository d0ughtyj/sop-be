-- psql -U jamesdoughty -f sop_schema.sql


-- heroku addons:create heroku-postgresql:sop-dev

DROP DATABASE IF EXISTS sop;
CREATE DATABASE sop;

\c sop;



CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR,
  email VARCHAR,
  full_name VARCHAR,
  full_address VARCHAR,
  street VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip VARCHAR,
  zone INTEGER,
  pin INTEGER,
  lat BIGINT,
  long BIGINT,
  notes VARCHAR
);

CREATE TABLE pickups (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER,
  type VARCHAR,
  date_entered DATE,
  date_for_pickup DATE,
  status VARCHAR,
  zone INTEGER,
  year INTEGER,
  juilian_day_number INTEGER,
  notes VARCHAR
);

INSERT INTO users (username, password, email, full_name, full_address, street, city, state, zip,
zone,pin, lat, long, notes)
  VALUES ('jimbo2', '12345678', 'jimbo1@mail.com', 'jimbo', '2445 Virgo Drive, Colorado Springs,
    CO', 'Virgo Dr', 'Colorado Springs','CO', '80906',2,1234, 38, -104, 'tbd');

INSERT INTO pickups (user_id, type, date_entered, date_for_pickup, status, zone, year, juilian_day_number, notes)
    VALUES (2, 'Grass', '2017-05-24', '2017-06-12', 'planned', 2, 2017, 180, 'tbd');
