import { NextApiRequest, NextApiResponse } from "next";
import build from "next/dist/build";
import Data from "../../../lib/data";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../../types/room";

export default async (req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method ==="POST"){
        // 숙소 등록하기
        try{
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
            if(!largeBuildingType ||
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
                ){
                    res.statusCode = 400;
                    res.send("필수 값이 없습니다");
                }

                const rooms = Data.room.getList();
                if(isEmpty(rooms)){
                    const newRoom : StoredRoomType ={
                        id: 1,
                        ...req.body,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    Data.room.write([newRoom]);
                    res.statusCode=201;
                    return res.end();
                }
                
                const newRoom: StoredRoomType = {
                    id: rooms[rooms.length -1].id +1,
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                Data.room.write([...rooms, newRoom]);
                res.statusCode = 201;
                return res.end();
        } catch(e){
            console.log(e);
            return res.send(e.message);
        }
    }
    req.statusCode = 405;
    return res.end();
}