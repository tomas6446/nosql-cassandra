import express from "express";
const router = express.Router();

import { getRents, addRent, deleteRent } from "../controllers/rents.js";

router.get("/", getRents);
router.post("/", addRent);
router.delete("/:rent_id/users/:user_id", deleteRent);

export default router;
