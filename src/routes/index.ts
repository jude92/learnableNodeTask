import roomRouter from "./roomRoute";
import roomTypeRouter from "./roomTypeRoute";
import userRouter from "./userRoute";

const router = require("express").Router();

router.use("/room", roomRouter);
router.use("/room-type", roomTypeRouter);
router.use("/auth", userRouter);

export default router;
