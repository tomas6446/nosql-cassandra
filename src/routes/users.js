import express from 'express';
const router = express.Router();

import {
  addUser,
//   getUser,
//   deleteUser,
  getUsers,
//   getUserRents,
} from "../controllers/users.js";

router.get("/", getUsers);
router.post("/", addUser);
// router.get("/:id", getUser);
// router.delete("/:id", deleteUser);
// router.get("/:id/rents", getUserRents);

export default router;