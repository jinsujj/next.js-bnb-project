import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";


/* dnamic 을 사용하여 서버 사이드 렌더링을 하지 않고 불러오게 됩니다.
    컴포넌트 안에서 window를 사용하게 될 예정이기에 dynamic 을 사용하여 서버
    사이드 렌더링을 방지했습니다.
    dynamic 을 사용하지 않고 import 했다면 window is undefined 라는 에러를 보게됩니다.
    서버에서는 window 와 document 를 사용할 수 없기 때문입니다.
*/
const RegisterRoomGeometry = dynamic(
    import("../../../components/room/register/RegisterRoomGeometry"),
    {ssr: false}
);

const geometry : NextPage =() =>{
    return <RegisterRoomGeometry/>;
};

export default geometry;