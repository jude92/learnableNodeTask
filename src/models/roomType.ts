import mongoose from "mongoose";

const roomTypes = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can not be empty"],
    maxLength: [20, "name can not be more than 20 characters"],
  },
});
const roomTypesModel = mongoose.model("roomTypes", roomTypes);
export default roomTypesModel;
