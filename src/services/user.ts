import User from "../models/user";
import { signJWT } from "../utils/helper";
import { UserLoginType, UserRegistrationType } from "../types/user"

class UserService {
  async createUser(payload: UserRegistrationType) {
    try {
      const { name, email, password, role } = payload;

      const userRecord = await this.getUserByEmail(email);

      if (userRecord) {
        throw new Error("User already exists");
      }

      const user = new User({ name, email, password, role });

      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    return User.findOne({ email });
  }

  async userLogin(data: UserLoginType) {
    try {
      const { email, password } = data;

      const user = await this.getUserByEmail(email);

      if (!user) {
        throw new Error("User does not exist");
      }

      const isVaalidPassword = await user.comparePassword(password);

      if (!isVaalidPassword) {
        throw new Error("Invalid password");
      }

      const token = signJWT(user.id, user.role);

      return token;
    } catch (error) {
      throw new Error("User not found");
    }
  }
}

export default new UserService();
