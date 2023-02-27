const router = require("express").Router();
import { createRoomType, getAllRoomType } from "../controllers/roomTypeController";
import { authentication, adminAccessRole } from "../middlewares/authorization";

import { validate } from "../validator/validator";
import { roomTypeValidation } from "../validator/schemas/roomType.schema";

router.get("/", [authentication, adminAccessRole], getAllRoomType);
router.post(
  "/",
  [validate(roomTypeValidation), authentication, adminAccessRole],
  createRoomType
);

export default router;
