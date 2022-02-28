import { NumberList } from "aws-sdk/clients/iot";
import axios from ".";

type MakeReservationAPIBody = {
    userId: Number;
    checkInDate: string;
    checkOutDate: string;
    adultCount : number;
    childrenCount : number;
    infantsCount: number;
};

// 숙소 예약히기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
    axios.post("/api/reservations",body);