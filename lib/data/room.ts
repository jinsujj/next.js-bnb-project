import { readFileSync, writeFileSync } from "fs"
import { StoredRoomType } from "../../types/room";


// 숙소 리스트 데이터 불러오기
const getList = () => {
    const roomsBuffer = readFileSync("data/rooms.json");
    const roomsString = roomsBuffer.toString();

    if(!roomsString){
        return [];
    }
    const rooms: StoredRoomType[] = JSON.parse(roomsString);
    return rooms;
};

// id 의 숙소가 있는지 확인하기
const exist = (roomId: number) => {
    const rooms = getList();
    return rooms.some((room) => room.id === roomId);
};

// id 의 숙소 불러오기
const find = (roomId: number) =>{
    const rooms = getList();
    return rooms.find((room) => room.id === roomId);
};

// 숙소 리스트 저장하기
const write = (rooms: StoredRoomType[]) =>{
    writeFileSync("data/rooms.json", JSON.stringify(rooms));
};

export default {getList, exist, find, write};