import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../../store";
import RoomCard from "./RoomCard";


const Container = styled.ul<{showMap :boolean}>`
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    width:100%;
    ${({showMap}) => 
        showMap && css`
            flex-direction: column;
        `
    };  
`;

interface IProps {
    showMap: boolean;
}

const RoomList : React.FC<IProps> = ({showMap}) => {
    const rooms = useSelector((state)=> state.room.rooms);
    return (
        <Container showMap={showMap}> 
            {rooms.map((room) => (
                <RoomCard room={room} showMap={showMap} key={room.id}/>
            ))}
        </Container>
    )
};

export default RoomList;