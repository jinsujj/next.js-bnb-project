import React from "react";
import styled from "styled-components";
import useSearchRoomDate from "../../../hooks/useSearchRoomDate";
import palette from "../../../styles/palette";
import DatePicker from "../../common/DatePicker";

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 70px;
    border: 2px solid transparent;
    border-radius:12px;
    cursor: pointer;
    &:hover{
        border-color: ${palette.gray_dd};
    }
    .search-room-bar-date-label {
        font-size: 10px;
        font-weight: 800;
        margin-bottom: 4px;
        position: absolute;
        z-index:1;
        left:20px;
        top:16px;
    }
    input {
        width: 100%;
        height: 100%;
        padding: 20px 0 0 20px;
        border: 0;
        border-radius: 12px;
        font-weight: 600;
        outline: none;
        cursor:pointer;
    }
    > div{
        width:100%;
        height: 100%;
        .react-datepicker-wrapper{
            width: 100%;
            height: 100%;
            .react-datepicker__input-container{
                width:100%;
                height:100%;
            }
        }
        .react-datepicker{
            display: flex;
        }
    }
`;

const SearchRoomCheckInDate: React.FC = () => {
    const {checkInDate, checkoutDate, setCheckInDateDispatch} = useSearchRoomDate();
    
    // 체크인 날짜 변경시
    const onChangeCheckInDate = (date: Date | null) => setCheckInDateDispatch(date);

    return (
        <Container>
            <div>
                <p className="search-room-bar-date-label">
                    체크인
                </p>
                <DatePicker
                    selected={checkInDate}
                    monthsShown={2}
                    onChange={onChangeCheckInDate}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkoutDate}
                    placeholderText="날짜 추가"
                    minDate={new Date()}
                />
            </div>
        </Container>
    )
};

export default SearchRoomCheckInDate;