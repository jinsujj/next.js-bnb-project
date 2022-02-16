import { stringify } from "querystring";
import axios from ".";

type GetLocationInfoAPIResponse = {
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;
}


// 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({
    latitude, longitude,
}: {
    latitude: number;
    longitude: number;
}) => {
    return axios.get<GetLocationInfoAPIResponse>(`/api/maps/location?latitude=${latitude}&longitude=${longitude}`);
};

// 구글 장소 검색 api
export const searchPlacesAPI = (keyword: string) =>
    axios.get<{description: string; placeId: string}[]>(
        `/api/maps/places?keyword=${keyword}`
    );

// placeId 로 장소 정보 가져오기
export const getPlaceAPI = (placeId: string) =>
    axios.get<{location: string; latitude:number, longitude: number}>(
        `/api/maps/places/${placeId}`
    );