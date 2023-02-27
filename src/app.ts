import express from "express";
require("dotenv").config();
import { PORT } from "../config";
import router from "./routes/index";
require("./database/db");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", router);

const port = PORT || 2020;

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
