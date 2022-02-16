import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { lazy } from "react";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method ==="GET"){
        const {placeId} = req.query;
        if(!placeId){
            res.statusCode = 400;
            return res.send("placeId 없습니다");
        }

        try{
            const {data} = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=ko&key=${
                    process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
            );
            const {formatted_address: location} = data.results[0];
            const {lat, lng} = data.results[0].geometry.location;
            const result = {
                location,
                latitude: lat,
                longitude: lng,
            };

            res.statusCode = 200;
            res.send(result);
        }catch(e){
            res.statusCode = 404;
            console.log(e);
            return res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}