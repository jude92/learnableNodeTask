const router = require("express").Router();


import { createUser, userLogin } from "../controllers/userController";
import { validate } from "../validator/validator";
import { loginSchema, registrationSchema } from "../validator/schemas/auth.schema";

router.post("/register", validate(registrationSchema), createUser);
router.post("/login", validate(loginSchema), userLogin);

export default router;
