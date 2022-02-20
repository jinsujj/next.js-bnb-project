import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";


// 초기상태
const initialState: RoomState ={
    rooms: [],
    detail: null,
};

const room = createSlice({
    name:"room",
    initialState,
    reducers: {
        setRooms(state, action: PayloadAction<RoomType[]>){
            state.rooms = action.payload;
        },
        // 상세 숙소 변경하기
        setDetailRoom(state, action: PayloadAction<RoomType>){
            state.detail = action.payload;;
        }
    }
});

export const roomActions = {...room.actions};

export default room;
