import { readFileSync, writeFileSync } from "fs";
import { StoredReservation } from "../../types/reservation";

// 예약 리스트 데이터 불러오기
const getList = () => {
    const reservationsBuffer = readFileSync("data/reservation.json");
    const reservationString = reservationsBuffer.toString();

    if(!reservationString){
        return [];
    }

    const reservation: StoredReservation[] = JSON.parse(reservationString);
    return reservation;
};

// id 의 예약이 있는지
const exist = (reservationId: number) => {
    const reservations = getList();
    return reservations.some((room) => room.id === reservationId);
};


// id 의 예약 불러오기
const find = (reservationId: number) =>{
    const reservations = getList();
    return reservations.find((room) => room.id === reservationId);
}

// 예약 리스트 저장하기
const write = (reservation : StoredReservation[]) => {
    writeFileSync("data/reservation.json", JSON.stringify(reservation));
}

export default {getList, exist, write, find};