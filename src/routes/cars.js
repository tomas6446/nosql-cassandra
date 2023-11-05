import express from "express";
const router = express.Router();

import { deleteCar, getCars } from "../controllers/cars.js";

router.get("/", getCars);
router.delete("/:car_id", deleteCar);

export default router;
