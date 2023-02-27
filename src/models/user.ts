import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../../config";

export interface IUser extends mongoose.Document {
  name: String,
  role: String,
  email: String,
  password: String,
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can not be empty"],
    maxLength: [20, "name can not be more than 20 characters"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "guest" },
});

User.pre("save", function (next) {
  bcrypt.genSalt(+config.HASGNUMBER, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = async function (userPassword): Promise<boolean> {
  try {
    return bcrypt.compare(userPassword, this.password);
  } catch (err) {
    return false;
  }
};

const UserModel = mongoose.model<IUser>("user", User);
export default UserModel;
