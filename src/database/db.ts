import mongoose from "mongoose";
import { config } from "../../config";

mongoose.set("strictQuery", false);

mongoose
  .connect(config.DB as string,)
  .then(() => {
    console.log("connected to the database");
  })
  .catch(() => {
    console.log(" error connecting to the database");
  });

