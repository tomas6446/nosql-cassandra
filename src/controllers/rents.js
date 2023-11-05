import { executeCqlQuery } from "../cassandraQuery.js";
import { v4 as uuidv4 } from "uuid";

export const getRents = (req, res) => {
  const query = "SELECT * FROM rents";
  executeCqlQuery(query, [], res, "Failed to retrieve rents.");
};

export const addRent = (req, res) => {
  const { user_id, car_id, start_date, end_date } = req.body;
  const rent_id = uuidv4();
  const created_at = Date.now();
  const query = `
        BEGIN BATCH
            INSERT INTO car_rental.rents (rent_id, user_id, car_id, start_date, end_date) VALUES (?, ?, ?, ?, ?);
            INSERT INTO car_rental.user_rents (user_id, rent_id, car_id, created_at) VALUES (?, ?, ?, ?);
            INSERT INTO car_rental.user_cars (user_id, car_id) VALUES (?, ?);
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
      car_id,
      created_at,
      user_id,
      car_id,
    ],
    res,
    "Failed to create rent record."
  );
};

export const deleteRent = (req, res) => {
  const { user_id, car_id, rent_id } = req.body;
  const query = `
        BEGIN BATCH
            DELETE FROM car_rental.rents WHERE rent_id = ?;
            DELETE FROM car_rental.user_rents WHERE user_id = ? AND rent_id = ?;
            DELETE FROM car_rental.user_cars WHERE user_id = ? AND car_id = ?;
        APPLY BATCH;
    `;
  executeCqlQuery(
    select_query,
    [rent_id, user_id, rent_id, user_id, car_id],
    res,
    "Failed to retrieve rent details."
  );
};
