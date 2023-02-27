const router = require("express").Router();
import roomTypeController from "../controllers/roomTypeController";
import { authentication, adminAccessRole } from "../middlewares/authorization";

import { validate } from "../validator/validator";
import { roomTypeValidation } from "../validator/schemas/roomType.schema";

router.get("/", [authentication, adminAccessRole], roomTypeController.getAllRoomType);
router.post(
  "/",
  [validate(roomTypeValidation), authentication, adminAccessRole],
  roomTypeController.createRoomType
);

export default router;
