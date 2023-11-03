import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import carRoutes from "./src/routes/cars.js";
import rentRoutes from "./src/routes/rents.js";
import userRoutes from "./src/routes/users.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/rents", rentRoutes);
app.use("/cars", carRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});