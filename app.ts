import express from "express";
require("dotenv").config();
import { config } from "./config";
import router from "./src/routes/index";
import "./src/database/db";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", router);

const port = config.PORT || 2020;

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
