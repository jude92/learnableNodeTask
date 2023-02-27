const router = require("express").Router();

import roomController from "../controllers/roomController";
import { adminAccessRole, adminGuestAccessRole, authentication } from "../middlewares/authorization";
import { validate } from "../validator/validator";
import { roomValidator, updateRoomValidator } from "../validator/schemas/room.schema";

router.post(
  "/",
  [validate(roomValidator), authentication, adminAccessRole],
  roomController.createRoom
);
router.patch(
  "/:id",
  [validate(updateRoomValidator), authentication, adminAccessRole],
  roomController.updateRoom
);
router.delete("/:id", [authentication, adminAccessRole], roomController.deleteRoom);
router.get(
  "/:id",
  [authentication, adminAccessRole, adminGuestAccessRole],
  roomController.getRoom
);
router.get(
  "/",
  [authentication, adminAccessRole, adminGuestAccessRole],
  roomController.getAllRooms
);

export default router;
