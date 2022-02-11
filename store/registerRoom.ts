import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BedType } from "../types/room";

type RegisterRoomState = {
    // 숙소 등록
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    isSetupForGuest: boolean | null;
    maximunGuestCount: number;
    bedRoomCount: number;
    bedCount: number;
    bedList: { id: number, beds: { type: BedType, count: number }[] }[];
    publicBedList: { type: BedType; count: number }[];
    bathroomCount: number;
    bathroomType: "private" | "public" | null;

    //위치 등록
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;

    amentities: string[];
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
    // 욕실 개수
    bathroomCount: 1,
    // 욕실 타입
    bathroomType: null,

    // 국가/지역
    country: "",
    // 시/도
    city: "",
    // 시/군/구
    district: "",
    // 도로명 주소
    streetAddress: "",
    // 동 호수
    detailAddress: "",
    // 우편 번호
    postcode: "",
    // 위도
    latitude: 0,
    // 경로
    longitude: 0,
    // 편의시설
    amentities: [],
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
        // 공용 공간 침대 유형 개수 변경하기
        setPublicBedTypeCount(
            state,
            action: PayloadAction<{ type: BedType; count: number }>
        ) {
            const { type, count } = action.payload;

            const index = state.publicBedList.findIndex((bed) => bed.type === type);
            if (index === -1) {
                //* 타입이 없다면
                state.publicBedList = [...state.publicBedList, { type, count }];
                return state;
            }
            //* 타입이 존재한다면
            if (count === 0) {
                state.publicBedList.splice(index, 1);
            } else {
                state.publicBedList[index].count = count;
            }
            return state;
        },
        // 욕실 개수 변경하기
        setBathroomCount(state, action: PayloadAction<number>) {
            state.bathroomCount = action.payload;
            return state;
        },
        // 욕실 유형 변경하기
        setBathroomType(state, action: PayloadAction<"private" | "public">) {
            state.bathroomType = action.payload;
            return state;
        },
        // 국가 변경하기
        setCountry(state, action: PayloadAction<string>) {
            state.country = action.payload;
            return state;
        },
        // 시/도 변경하기
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
            return state;
        },
        // 시/군/구 변경하기
        setDistrict(state, action: PayloadAction<string>) {
            state.district = action.payload;
            return state;
        },
        // 도로명 주소 변경하기
        setStreetAddress(state, action: PayloadAction<string>) {
            state.streetAddress = action.payload;
            return state;
        },
        // 동 호수 변경하기
        setDetailAddress(state, action: PayloadAction<string>) {
            state.detailAddress = action.payload;
            return state;
        },
        // 우편 번호 변경하기
        setPostCode(state, action: PayloadAction<string>) {
            state.postcode = action.payload;
            return state;
        },
        // 위도 변경하기
        setLatitude(state, action: PayloadAction<number>) {
            state.latitude = action.payload;
        },
        // 경도 변경하기
        setLongitude(state, action: PayloadAction<number>) {
            state.longitude = action.payload;
        },
        // 편의시설 변경하기
        setAmentities(state, action: PayloadAction<string[]>){
            state.amentities = action.payload;
        }
    },
});

export const registerRooomAction = { ...registerRoom.actions };

export default registerRoom;