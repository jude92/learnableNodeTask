const router = require("express").Router();

import { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } from "../controllers/roomController";
import { adminAccessRole, adminGuestAccessRole, authentication } from "../middlewares/authorization";
import { validate } from "../validator/validator";
import { roomValidator, updateRoomValidator } from "../validator/schemas/room.schema";

router.post(
  "/",
  [validate(roomValidator), authentication, adminAccessRole],
  createRoom
);
router.patch(
  "/:id",
  [validate(updateRoomValidator), authentication, adminAccessRole],
  updateRoom
);
router.delete("/:id", [authentication, adminAccessRole], deleteRoom);
router.get(
  "/:id",
  [authentication, adminAccessRole, adminGuestAccessRole],
  getRoom
);
router.get(
  "/",
  [authentication, adminAccessRole, adminGuestAccessRole],
  getAllRooms
);

export default router;
