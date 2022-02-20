import { UserType } from "./user";

// 침대 유형
export type BedType = 
    | "다른 침대 추가"
    | "소파"
    | "에어 매트릭스"
    | "요와 이불"
    | "싱글"
    | "더블"
    | "퀸"
    | "이층 침대"
    | "바닥용 에어매트릭스"
    | "유아 침대"
    | "유아용 침대"
    | "해먹"
    | "물침대";

    type RegisterRoomState = {
        // 숙소 유형
        largeBuildingType: string | null;
        buildingType: string | null;
        roomType: string | null;
        isSetupForGuest: boolean | null;
    
        // 숙소 종류 디테일
        maximumGuestCount: number;
        bedRoomCount: number;
        bedCount: number;
        bedList: { id: number, beds: { type: BedType, count: number }[] }[];
        publicBedList: { type: BedType; count: number }[];
    
        // 욕실 유형
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
    
        // 편의시설
        amentities: string[];
        // 공용공간
        conveniences: string[];
        
        photos: string[];
        description: string;
        title: string;
        price: number;
        startDate: string | null;
        endDate : string | null;
    };

    export type StoredRoomType = {
        id: number;
        largeBuildingType: string | null;
        roomType: string | null;
        isSetupForGuest: boolean | null;
        maximumGuestCount : number;
        bedroomCount: number;
        bedCount: number;
        bedLit: {id: number; beds: {type: BedType; count: number}[]}[];
        publicBedList: {type:BedType; count: number}[];
        bathroomCount: number;
        bathroomType: "private" | "public";
        latitude: number;
        longitude: number;
        country:string;
        city: string;
        district: string;
        streetAddress: string;
        detailAddress: string;
        postcode: string;
        amentities: string[];
        conveniences: string[];
        photos: string[];
        description: string;
        title: string;
        price: string;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        hostId: number;
    }

    // 숙소 타입
    export type RoomType ={
        id: number;
        largeBuildingType: string | null;
        buildingType: string | null;
        roomType: string | null;
        isSetupForGuest: boolean | null;
        maximumGuestCount:number;
        bedroomCount: number;
        bedCount: number;
        bedList: {id: number, beds: {type:BedType; count: number}[]}[];
        publicBedList : {type:BedType; count: number}[];
        bathroomCount : number;
        bathroomType : "private" | "public";
        latitude: number;
        longitude: number;
        country: string;
        city: string;
        district: string;
        streetAddress: string;
        detailAddress: string;
        postcode: string;
        amentities: string[];
        conveniences: string[];
        photos: string[];
        description: string;
        title: string;
        price: string;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
        host: UserType;
    }