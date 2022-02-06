import axios from ".";

type GetLocationInfoAPIResponse = {
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longtitude: number;
}


// 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({
    latitude, longtitude,
}: {
    latitude: number;
    longtitude: number;
}) => {
    return axios.get<GetLocationInfoAPIResponse>(`/api/maps/location?latitude=${latitude}&longtitude=${longtitude}`);
};