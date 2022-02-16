import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 70px;
    border: 2px solid transparent;
    border-radius: 12px;
    &:hover{
        border-color: ${palette.gray_dd};
    }
`;

const SearchRoomCheckOutDate: React.FC = () => {
    return <Container>체크아웃</Container>
};

export default SearchRoomCheckOutDate;