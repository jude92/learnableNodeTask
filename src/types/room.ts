export type Room = {
    name: string,
    price: string,
    roomType: string
}

export type RoomFilter = { search: string, roomType: string, minPrice: number, maxPrice: number }