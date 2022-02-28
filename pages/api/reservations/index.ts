import { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash/isEmpty";
import Data from "../../../lib/data";
import { StoredReservation } from "../../../types/reservation";


export default async (req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method === "POST"){
        try{
            const {
                userId,
                checkInDate,
                checkOutDate,
                adultCount,
                childrenCount,
                infantsCount
            } = req.body;

            if(
                !userId ||
                !checkInDate ||
                !checkOutDate || 
                adultCount === undefined ||
                childrenCount === undefined ||
                infantsCount === undefined
            ){
                res.statusCode = 400;
                return res.send("필수 값이 없습니다");
            }

            const reservations = Data.reservation.getList();
            if(isEmpty(reservations)){
                const reservation: StoredReservation = {
                    id: 1,
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                Data.reservation.write([reservation]);
                res.statusCode= 201;
                return res.end();
            }

            const reservation = {
                id: reservations[reservations.length -1].id +1,
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            Data.reservation.write([...reservations, reservation]);
            res.statusCode = 201;
            return res.end();
        } catch (e){
            console.log(e);
            return res.send(e.message);
        }
    }

    res.statusCode = 405;
    return res.end();
}