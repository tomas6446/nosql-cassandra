import { executeCqlQuery } from "../cassandraQuery.js";

export const getCars = (req, res) => {
  const query = "SELECT * FROM car_rental.cars";
  executeCqlQuery(query, [], res, "Failed to retrieve cars.");
};

export const deleteCar = (req, res) => {
  const car_id = req.params.car_id;
  const query = "DELETE FROM car_rental.cars WHERE car_id = ?";
  executeCqlQuery(query, [car_id], res, "Failed to delete car.");
};
