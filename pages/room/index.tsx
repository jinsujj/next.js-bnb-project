import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useDispatch } from "react-redux";
import RoomMain from "../../components/room/main/RoomMain";
import { getRoomListAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { RoomType } from "../../types/room";


interface IProps {
  rooms : RoomType[];
}


const index:NextPage<IProps> = ({rooms}) => {
  const dispatch = useDispatch();
  dispatch(roomActions.setRooms(rooms));

  return <RoomMain />;
};

export const getServerSideProps: GetServerSideProps = async (context : GetServerSidePropsContext) => {

  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    latitude,
    longitude,
    limit,
    page = "1",
  } = context.query;

  console.log(context.query);

  try {
    const { data: rooms} = await getRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit: limit || "20",
      page: page || "1",
      //? 한글은 encode해주세요.
      location: context.query.location
        ? encodeURI(context.query.location as string)
        : undefined,
    });
    console.log(rooms);
    return {
      props: {
        rooms,
      }
    }
  } catch (e) {
    console.log(e);
  }
};


export default index;
