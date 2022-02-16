import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "aws-sdk/clients/iotdata";
import { access } from "fs";
import { SearchRoomState } from "../types/reduxState";


// 초기상태
const initailState: SearchRoomState ={
    location:"",
    latitude: 0,
    longitude: 0,
    checkInDate: null,
    checkOutDate: null,
    adultCount: 1,
    childrenCount: 0,
    infantsCount:0,
};


const searchRoom = createSlice({
    name: "searchRoom",
    initialState: initailState,
    reducers: {
        // 장소 변경하기
        setLocation(state, action: PayloadAction<string>){
            state.location = action.payload;
            return state;
        },
        // 체크인 날짜 변경하기
        setStartDate(state, action: PayloadAction<string | null>){
            state.checkInDate = action.payload;
            return state;
        },
        // 체크아웃 날짜 변경하기
        setEndDate(state, action: PayloadAction<string | null>){
            state.checkOutDate = action.payload;
            return state;
        },
        // 성인 수 변경하기
        setAdultCount(state, action: PayloadAction<number>){
            state.adultCount = action.payload;
            return state;
        },
        // 어린이 수 변경하기
        setChildrenCount(state, action: PayloadAction<number>){
            state.childrenCount = action.payload;
            return state;
        },
        // 유아 수 변경하기
        setInfantsCount(state, action: PayloadAction<number>){
            state.infantsCount = action.payload;
            return state;
        },
        // 위도 섷정하기
        setLatitude(state, action: PayloadAction<number>){
            state.latitude = action.payload;
        },
        // 경도 설정하기
        setLongitude(state, action: PayloadAction<number>){
            state.longitude = action.payload;
        },
    }
});

export const searchRoomAction = {...searchRoom.actions};

export default searchRoom;