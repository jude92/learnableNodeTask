import RoomType from "../models/roomType";

class RoomTypeServices {
  // create a room
  async createRoom(roomTypeName: string) {
    return await RoomType.create(roomTypeName);
  }

  // get many books
  async getAllRooms(filter = {}) {
    return await RoomType.find(filter);
  }
}

export default new RoomTypeServices();
