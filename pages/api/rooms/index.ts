import { NextApiRequest, NextApiResponse } from "next";
import build from "next/dist/build";
import Data from "../../../lib/data";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../../types/room";
import room from "../../../lib/data/room";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const {
            checkInDate,
            checkoutDate,
            adultCount,
            childrenCount,
            latitude,
            longitude,
            limit,
            page = "1",
        } = req.query;

        try {
            const rooms = Data.room.getList();

            // 위치, 날짜, 인원 수 필터링 하기
            const fiteredRooms = rooms.filter((room) => {
                if (latitude && latitude !== '0' && longitude && longitude !== '0') {
                    if (!(
                        Number(latitude) - 0.5 < room.latitude &&
                        room.latitude < Number(latitude) + 0.05 &&
                        Number(longitude) - 0.5 < room.longitude &&
                        room.longitude < Number(longitude) + 0.05
                    )) {
                        return false;
                    }
                }

                if (checkInDate) {
                    if (
                        new Date(checkInDate as string) < new Date(room.startDate) ||
                        new Date(checkInDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }
                if (checkoutDate) {
                    if (
                        new Date(checkoutDate as string) < new Date(room.startDate) ||
                        new Date(checkoutDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }

                if (
                    room.maximumGuestCount <
                    Number(adultCount as string) + 
                    Number(childrenCount as string) * 0.5 || 0) {
                        return false;
                }

                return true;
        })
        // 개수 자르기 start ,end 
        const limitedRooms = fiteredRooms.splice( 0 + (Number(page) -1) * Number(limit), Number(limit));
        // host 정보 넣기
        const roomsWithhost = await Promise.all(limitedRooms.map((room) => {
            const host = Data.user.find({ id: room.hostId });
            return { ...room, host };
        }));

        res.statusCode = 200;
        return res.send(roomsWithhost);
    } catch (e) {
        console.log(e);
    }
}


if (req.method === "POST") {
    // 숙소 등록하기
    try {
        const {
            largeBuildingType,
            buildingType,
            roomType,
            isSetupForGuest,
            maximumGuestCount,
            bedRoomCount,
            bedCount,
            bedList,
            publicBedList,
            bathroomCount,
            bathroomType,
            latitude,
            longitude,
            country,
            city,
            district,
            streetAddress,
            detailAddress,
            postcode,
            amentities,
            conveniences,
            photos,
            description,
            title,
            price,
            startDate,
            endDate,
            hostId,
        } = req.body;
        console.log(req.body);
        if (!largeBuildingType ||
            !buildingType ||
            !roomType ||
            isSetupForGuest === null ||
            !maximumGuestCount ||
            !bedRoomCount ||
            !bedCount ||
            !bedList ||
            !bathroomCount ||
            bathroomType === null ||
            !latitude ||
            !longitude ||
            !country ||
            !city ||
            !district ||
            !streetAddress ||
            (detailAddress !== "" && !detailAddress) ||
            !postcode ||
            !photos ||
            !description ||
            !title ||
            !price ||
            !startDate ||
            !endDate ||
            !hostId
        ) {
            res.statusCode = 400;
            res.send("필수 값이 없습니다");
        }

        const rooms = Data.room.getList();

        if (isEmpty(rooms)) {
            const newRoom: StoredRoomType = {
                id: 1,
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            Data.room.write([newRoom]);
            res.statusCode = 201;
            return res.end();
        }

        const newRoom: StoredRoomType = {
            id: rooms[rooms.length - 1].id + 1,
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        Data.room.write([...rooms, newRoom]);
        res.statusCode = 201;
        return res.end();
    } catch (e) {
        console.log(e);
        return res.send(e.message);
    }
}
req.statusCode = 405;
return res.end();
}