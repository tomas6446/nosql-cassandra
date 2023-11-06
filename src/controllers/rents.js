import { executeCqlQuery } from "../cassandraQuery.js";
import { v4 as uuidv4 } from "uuid";

export const getRents = (req, res) => {
  const query = "SELECT * FROM rents";
  executeCqlQuery(query, [], res, "Failed to retrieve rents.");
};

export const addRent = (req, res) => {
  const { user_id, car_id, amount, car_number, rent_type, car_type, start_date, end_date } = req.body;
  const rent_id = uuidv4();
  const query = `
        BEGIN BATCH
            INSERT INTO car_rental.rents (rent_id, user_id, car_id, start_date, end_date) VALUES (?, ?, ?, ?, ?);
            INSERT INTO car_rental.user_rents (user_id, rent_id, amount, rent_type) VALUES (?, ?, ?, ?);
            INSERT INTO car_rental.user_cars (user_id, rent_id, car_id, car_number, car_type) VALUES (?, ?, ?, ?, ?);
        APPLY BATCH;
    `;
  executeCqlQuery(
    query,
    [
      rent_id,
      user_id,
      car_id,
      start_date,
      end_date,
      user_id,
      rent_id,
      amount,
      rent_type,
      user_id,
      rent_id,
      car_id,
      car_number,
      car_type
    ],
    res,
    "Failed to create rent record."
  );
};

export const deleteRent = (req, res) => {
  const rent_id = req.params.rent_id;
  const user_id = req.params.user_id;
  const query = `
        BEGIN BATCH
            DELETE FROM car_rental.rents WHERE rent_id = ?;
            DELETE FROM car_rental.user_rents WHERE user_id = ? AND rent_id = ?;
            DELETE FROM car_rental.user_cars WHERE user_id = ? AND rent_id = ?;
        APPLY BATCH;
    `;
  executeCqlQuery(
    query,
    [rent_id, user_id, rent_id, user_id, rent_id],
    res,
    "Failed to retrieve rent details."
  );
};
