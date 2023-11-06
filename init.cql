CREATE KEYSPACE IF NOT EXISTS car_rental WITH replication = {
  'class': 'SimpleStrategy', 'replication_factor': '1'
};

USE car_rental;

CREATE TABLE IF NOT EXISTS car_rental.users
(
    user_id UUID,
    name TEXT,
    email TEXT,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS car_rental.rents
(
    rent_id UUID,
    user_id UUID,
    car_id UUID,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    PRIMARY KEY (rent_id)
);

CREATE TABLE IF NOT EXISTS car_rental.cars
(
    car_id UUID,
    make TEXT,
    model TEXT,
    year INT,
    PRIMARY KEY (car_id)
);

CREATE TABLE IF NOT EXISTS car_rental.user_rents
(
    user_id UUID,
    rent_id UUID,
    created_at TIMESTAMP,
    PRIMARY KEY ((user_id), rent_id)
) WITH CLUSTERING ORDER BY (rent_id DESC);

CREATE TABLE IF NOT EXISTS car_rental.user_cars
(
    user_id UUID,
    car_id UUID,
    PRIMARY KEY ((user_id), car_id)
) WITH CLUSTERING ORDER BY (car_id DESC);

INSERT INTO car_rental.cars (car_id, make, model, year) VALUES (uuid(), 'Toyota', 'Corolla', 2020);
INSERT INTO car_rental.cars (car_id, make, model, year) VALUES (uuid(), 'Ford', 'Mustang', 2021);
INSERT INTO car_rental.cars (car_id, make, model, year) VALUES (uuid(), 'Tesla', 'Model S', 2022);
