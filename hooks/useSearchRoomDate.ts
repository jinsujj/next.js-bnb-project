import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { searchRoomAction } from "../store/searchRoom";


const useSearchRoomDate = () => {
    const checkInDate = useSelector((state) => state.searcRoom.checkInDate);
    const checkoutDate = useSelector((state) => state.searcRoom.checkOutDate);

    const dispatch = useDispatch();

    // 체크인 날짜 변경
    const setCheckInDateDispatch = (date: Date | null) =>{
        if(date){
            dispatch(searchRoomAction.setStartDate(date.toISOString()));
        }else{
            dispatch(searchRoomAction.setStartDate(null));
        }
    }

    // 체크아웃 날짜 변경
    const setCheckOutDateDisPatch = (date: Date | null) =>{
        if(date){
            dispatch(searchRoomAction.setEndDate(date.toISOString()));
        }else{
            dispatch(searchRoomAction.setEndDate(null));
        };
    }
    return {
        checkInDate : checkInDate ? new Date(checkInDate) : null,
        checkoutDate : checkoutDate ? new Date(checkoutDate) : null,
        setCheckInDateDispatch,
        setCheckOutDateDisPatch,
    }
};

export default useSearchRoomDate;