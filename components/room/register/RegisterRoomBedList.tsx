import React from "react";
import { useSelector } from "../../../store";
import RegisterRoomBedType from "./RegisterRoomBedTypes";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";


const RegisterRoomBedList: React.FC = () =>{
    const bedList = useSelector((state) => state.registerRoom.bedList);

    return(
        <ul className="register-room-bed-type-list-wrapper">
            {bedList.map((bedList) => (
                <RegisterRoomBedType key={bedList.id} bedroom={bedList}/>
            ))}
            <RegisterRoomPublicBedTypes/>
        </ul>
    )
};

export default RegisterRoomBedList;