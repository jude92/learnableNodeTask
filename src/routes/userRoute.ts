const router = require("express").Router();


import userController from "../controllers/userController";
import { validate } from "../validator/validator";
import { loginSchema, registrationSchema } from "../validator/schemas/auth.schema";

router.post("/register", validate(registrationSchema), userController.createUser);
router.post("/login", validate(loginSchema), userController.userLogin);

export default router;
