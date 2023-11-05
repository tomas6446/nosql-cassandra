import express from "express";
const router = express.Router();

import {
  addUser,
  getUser,
  deleteUser,
  getUsers,
  getUserRents,
  getUserCars,
} from "../controllers/users.js";

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:user_id", getUser);
router.delete("/:user_id", deleteUser);
router.get("/:user_id/rents/:rent_id", getUserRents);
router.get("/:user_id/cars/:car_id", getUserCars);

export default router;
