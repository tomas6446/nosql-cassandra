import { executeCqlQuery, asyncExecuteCqlQuery } from "../cassandraQuery.js";
import { v4 as uuidv4 } from "uuid";

export const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user_id = uuidv4();
    const emailQuery =
      "INSERT INTO car_rental.user_emails (email, user_id) VALUES (?, ?) IF NOT EXISTS;";
    const emailResult = await asyncExecuteCqlQuery(emailQuery, [
      email,
      user_id,
    ]);

    if (!emailResult.rows[0]["[applied]"]) {
      res.status(409).json({ message: "Email already exists." });
      return;
    }

    const userQuery =
      "INSERT INTO car_rental.users (user_id, name, email) VALUES (?, ?, ?) IF NOT EXISTS";
    await asyncExecuteCqlQuery(userQuery, [user_id, name, email]);

    res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  executeCqlQuery(query, [], res, "Failed to retrieve users.");
};

export const getUserCars = (req, res) => {
  const user_id = req.params.user_id;
  const rent_id = req.params.rent_id;
  const query = "SELECT * FROM user_cars WHERE user_id = ? AND rent_id = ?";
  executeCqlQuery(
    query,
    [user_id, rent_id],
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
  const email = req.body.email;
  const query = `
    BEGIN BATCH
      DELETE FROM car_rental.users WHERE user_id = ?;
      DELETE FROM car_rental.user_emails WHERE email = ?;
    APPLY BATCH;
  `;
  executeCqlQuery(query, [user_id, email], res, "Failed to delete user.");
};
