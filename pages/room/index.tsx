import { NextPage } from "next";
import { encode } from "punycode";
import RoomMain from "../../components/room/main/RoomMain";
import { getRoomListAPI } from "../../lib/api/room";
import { wrapper } from "../../store";
import { registerRooomAction } from "../../store/registerRoom";
import { roomActions } from "../../store/room";
import { searchRoomAction } from "../../store/searchRoom";

const index: NextPage = () => {
  return <RoomMain />;
};

index.getInitialProps = async ({ store, query }) => {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = query;
    try {
      const { data } = await getRoomListAPI({
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        latitude,
        longitude,
        limit: limit || "20",
        page: page || "1",
        //? 한글은 encode해주세요.
        location: query.location
          ? encodeURI(query.location as string)
          : undefined,
      });
      store.dispatch(roomActions.setRooms(data));
    } catch (e) {
      console.log(e);
    }
  
    return {};
  };
  
  export default index;
  