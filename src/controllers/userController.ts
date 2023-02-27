import userService from "../services/user";
import { expressResponse } from "../utils/helper";

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      delete user.password;

      return expressResponse(res, 201, "User created successfully", true, {
        ...user.toJSON(),
        password: undefined,
      });
    } catch (err: any) {
      return expressResponse(res, 400, err.message);
    }
  }

  async userLogin(req, res) {
    try {
      const token = await userService.userLogin(req.body);

      return expressResponse(
        res,
        200,
        "User loggedIn successfully",
        true,
        token
      );
    } catch (err: any) {
      return expressResponse(res, 400, err.message);
    }
  }
}

export default new UserController();
