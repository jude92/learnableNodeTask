import roomTypeService from "../services/roomType";
import { expressResponse } from "../utils/helper";

class RoomTypeController {
  async createRoomType(req, res) {
    const { body } = req;
    const roomtype = await roomTypeService.createRoom(body);

    return expressResponse(
      res,
      201,
      "Room Type created successfully",
      true,
      roomtype
    );
  }

  async getAllRoomType(req, res) {
    const roomtypes = await roomTypeService.getAllRooms();

    return expressResponse(
      res,
      200,
      "Rooms Types fetched successfully",
      true,
      roomtypes
    );
  }
}

export default new RoomTypeController();
