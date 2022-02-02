import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { secondaryUnitBuildingTypeList } from "../lib/staticData";
import { BedType } from "../types/room";

type RegisterRoomState = {
    largeBuildingType: string | null;
    buildingType : string | null;
    roomType : string |null;
    isSetupForGuest : boolean | null;
    maximunGuestCount : number;
    bedRoomCount: number;
    bedCount: number;
    bedList: { id: number, beds: {type: BedType, count: number}[]}[];
    publicBedList: {type:BedType; count; number}[];
};

//초기상태
const initialState : RegisterRoomState = {
    // 건물 유형 큰 범주 
    largeBuildingType: null,
    // 건물 유형
    buildingType: null,
    // 숙소 유형
    roomType: null,
    // 게스트만을 위해 만들어진 숙소인가
    isSetupForGuest: null,
    // 최대 숙박 인원
    maximunGuestCount:1,
    // 침실 개수
    bedRoomCount: 0,
    // 침대 개수
    bedCount: 1,
    // 침대 유형
    bedList: [],
    // 공용공간 침대 유형
    publicBedList: [],
};

const registerRoom = createSlice({
    name: "registerRoom",
    initialState,
    reducers: {
        // 큰 건물 유형 변경하기
        setLargeBuildingType(state, action:PayloadAction<string>){
            if(action.payload === ""){
                state.largeBuildingType = null;
            }
            state.largeBuildingType = action.payload;
            return state;
        },
        // 건물 유형 변경하기
        setBuildingType(state, action: PayloadAction<string>){
            if(action.payload === ""){
                state.buildingType = null;
            }
            state.buildingType = action.payload;
            return state;
        },
        // 숙소 유형 변경하기
        setRoomType(state, action: PayloadAction<"entire"|"private"|"public">){
            state.roomType = action.payload;
            return state;
        },
        // 게스트용 숙소인지 변경하기
        setIsSetupForGuest(state, action: PayloadAction<boolean>){
            state.isSetupForGuest = action.payload;
            return state;
        }
    },
});

export const registerRooomAction = {... registerRoom.actions};

export default registerRoom;