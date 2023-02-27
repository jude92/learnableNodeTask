import roomService from "../services/room";
import { expressResponse } from "../utils/helper";

class roomControlls {
  // create room
  async createRoom(req, res) {
    const reqBody = req.body;

    const existingRoom = await roomService.getRoomByName(
      reqBody.name.toUpperCase()
    );

    if (existingRoom) {
      return expressResponse(res, 403, "Room already exist");
    }

    reqBody.name = reqBody.name.toUpperCase();
    const newRoom = await roomService.createRoom(reqBody);

    return expressResponse(
      res,
      201,
      "Romm created successfully",
      true,
      newRoom
    );
  }

  // update room
  async updateRoom(req, res) {
    const { body } = req;
    const updatedRoom = await roomService.updateRoom(req.params.id, body);

    return expressResponse(
      res,
      200,
      "Room updated successfully",
      true,
      updatedRoom
    );
  }

  // delete a room
  async deleteRoom(req, res) {
    const roomToDelete = await roomService.deleteRoom(req.params.id);

    return expressResponse(
      res,
      200,
      "Room deleted successfully",
      true,
      roomToDelete
    );
  }

  // get a room
  async getRoom(req, res) {
    const room = await roomService.getRoom(req.params.id);

    if (!room) {
      return expressResponse(res, 404, "Room not found");
    }

    return expressResponse(
      res,
      200,
      "Room succeessfully retrieved",
      true,
      room
    );
  }

  // get all rooms
  async getAllRooms(req, res) {
    const query = req.query;
    const allRooms = await roomService.getAllRooms(query);

    return expressResponse(
      res,
      200,
      "Rooms fetched succeessfully",
      true,
      allRooms
    );
  }
}

export default new roomControlls();
