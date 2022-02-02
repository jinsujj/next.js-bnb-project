import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { secondaryUnitBuildingTypeList } from "../lib/staticData";
import { BedType } from "../types/room";
import { authAction } from "./auth";

type RegisterRoomState = {
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    isSetupForGuest: boolean | null;
    maximunGuestCount: number;
    bedRoomCount: number;
    bedCount: number;
    bedList: { id: number, beds: { type: BedType, count: number }[] }[];
    publicBedList: { type: BedType; count; number }[];
};

//초기상태
const initialState: RegisterRoomState = {
    // 건물 유형 큰 범주 
    largeBuildingType: null,
    // 건물 유형
    buildingType: null,
    // 숙소 유형
    roomType: null,
    // 게스트만을 위해 만들어진 숙소인가
    isSetupForGuest: null,
    // 최대 숙박 인원
    maximunGuestCount: 1,
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
        setLargeBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === "") {
                state.largeBuildingType = null;
            }
            state.largeBuildingType = action.payload;
            return state;
        },
        // 건물 유형 변경하기
        setBuildingType(state, action: PayloadAction<string>) {
            if (action.payload === "") {
                state.buildingType = null;
            }
            state.buildingType = action.payload;
            return state;
        },
        // 숙소 유형 변경하기
        setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
            state.roomType = action.payload;
            return state;
        },
        // 게스트용 숙소인지 변경하기
        setIsSetupForGuest(state, action: PayloadAction<boolean>) {
            state.isSetupForGuest = action.payload;
            return state;
        },
        // 최대 숙박 인원 변경하기
        setMaximumGuestCount(state, action: PayloadAction<number>) {
            state.maximunGuestCount = action.payload;
            return state;
        },
        // 침실 개수 변경하기
        setBedRoomCount(state, action: PayloadAction<number>) {
            const bedroomCount = action.payload;

            state.bedRoomCount = bedroomCount;
            state.bedList = Array.from(Array(bedroomCount), (_, index) => ({
                id: index + 1,
                beds: [],
            }));
            return state;
        },
        // 최대침대 개수 변경하기
        setBedCount(state, action: PayloadAction<number>) {
            state.bedCount = action.payload;
            return state;
        },
        //* 침대 유형 갯수 변경하기
        setBedTypeCount(
            state,
            action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
        ) {
            const { bedroomId, type, count } = action.payload;

            const bedroom = state.bedList[bedroomId - 1];

            const prevBeds = bedroom.beds;
            const index = prevBeds.findIndex((bed) => bed.type === type);
            if (index === -1) {
                //* 타입이 없다면
                state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
                return state;
            }
            //* 타입이 존재한다면
            if (count === 0) {
                state.bedList[bedroomId - 1].beds.splice(index, 1);
            } else {
                state.bedList[bedroomId - 1].beds[index].count = count;
            }
            return state;
        },
    },
});

export const registerRooomAction = { ...registerRoom.actions };

export default registerRoom;