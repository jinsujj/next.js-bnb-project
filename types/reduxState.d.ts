import { UserType } from "./user";



// 유저 redux state
export type UserStae = UserType & {
    isLogged: booolean;
}

// 공통 redux State
export type CommonState = {
    validateMode : boolean;
}

// 숙소 검색 Redux State
export type SearchRoomState ={
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
}