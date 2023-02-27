import RoomsModel from "../models/room";
import { PipelineStage } from "mongoose"
import { Room, RoomFilter } from "../types/room"

class RoomServices {
  // create a room
  async createRoom(roomData: Room) {
    return await RoomsModel.create(roomData);
  }

  // edit a room
  async updateRoom(id: string, roomData: Partial<Room>) {
    return await RoomsModel.findByIdAndUpdate(
      id,
      {
        $set: { ...roomData },
      },
      { new: true }
    );
  }

  // delete a room
  async deleteRoom(id: string) {
    return await RoomsModel.findByIdAndDelete(id);
  }

  // get a room
  async getRoom(id: string) {
    const result = await RoomsModel.findById(id)
      .populate("roomType", "name -_id")
      .lean();

    return {
      ...result,
      ...{ roomType: result.roomType["name"] },
    };
  }

  // get a room
  async getRoomByName(name: string) {
    return await RoomsModel.findOne({ name });
  }

  // get many books
  async getAllRooms(filter: Partial<RoomFilter>) {
    let { search, roomType, maxPrice, minPrice } = filter;
    if (maxPrice && !minPrice) minPrice = 0;

    const query: Array<PipelineStage> = [
      {
        $lookup: {
          from: "roomtypes",
          localField: "roomType",
          foreignField: "_id",
          as: "_roomType",
        },
      },
      {
        $unwind: { path: "$_roomType", preserveNullAndEmptyArrays: true },
      },
    ];

    if (search)
      query.push({ $match: { name: { $regex: search, $options: "$i" } } });

    if (roomType)
      query.push({
        $match: { "_roomType.name": { $regex: roomType, $options: "$i" } },
      });

    if (maxPrice && minPrice) {
      query.push({
        $match: { $or: [{ price: { $gte: minPrice, $lte: maxPrice } }] },
      });
    } else if (maxPrice && !minPrice) {
      query.push({
        $match: { $or: [{ price: { $gte: 0, $lte: maxPrice } }] },
      });
    }

    query.push({
      $project: {
        name: "$name",
        roomType: "$_roomType.name",
        price: "$price",
      },
    });

    return await RoomsModel.aggregate(query);
  }
}

export default new RoomServices();
