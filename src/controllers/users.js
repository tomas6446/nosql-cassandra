import { executeCqlQuery } from "../cassandraQuery.js";
import { v4 as uuidv4 } from "uuid";

export const addUser = (req, res) => {
  const { name, email } = req.body;
  const user_id = uuidv4();
  const query =
    "INSERT INTO car_rental.users (user_id, name, email) VALUES (?, ?, ?) IF NOT EXISTS;";
  executeCqlQuery(
    query,
    [user_id, name, email],
    res,
    "Failed to add user or user with that email already exists."
  );
};

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  executeCqlQuery(query, [], res, "Failed to retrieve users.");
};

export const getUserCars = (req, res) => {
  const user_id = req.params.user_id;
  const car_id = req.params.car_id;
  const query = "SELECT * FROM user_cars WHERE user_id = ? AND car_id = ?";
  executeCqlQuery(
    query,
    [user_id, car_id],
    res,
    "Failed to retrieve user cars."
  );
};

export const getUserRents = (req, res) => {
  const user_id = req.params.user_id;
  const rent_id = req.params.rent_id;
  const query = "SELECT * FROM user_rents WHERE user_id = ? AND rent_id = ?";
  executeCqlQuery(
    query,
    [user_id, rent_id],
    res,
    "Failed to retrieve user rents."
  );
};

export const getUser = (req, res) => {
  const user_id = req.params.user_id;
  const query = "SELECT * FROM users WHERE user_id = ?";
  executeCqlQuery(query, [user_id], res, "Failed to retrieve user.");
};

export const deleteUser = (req, res) => {
  const user_id = req.params.user_id;
  const query = "DELETE FROM users WHERE user_id = ?";
  executeCqlQuery(query, [user_id], res, "Failed to retrieve user.");
};
