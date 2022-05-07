import Link from "next/link";
import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../../common/Button";
import { useSelector } from "../../../store";
import { useRouter } from "next/router";
import {registerRoomAPI} from "../../../lib/api/room";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  // 등록하기 클릭
  const onClickReg8isterRoom = async () => {
      const registerRoomBody ={
          ...registerRoom,
          hostId: userId,
      };
      try{
          await registerRoomAPI(registerRoomBody);
          router.push("/");
      }
      catch(e){
          console.log(e);
      }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="regist8er-room-footer-back">
          <BackArrowIcon />
        </a>
      </Link>
      <Button onClick={onClickReg8isterRoom} color="bittersweet" width="102px">
        등록하기
      </Button>
    </Container>
  );
};

export default RegisterRoomSubmitFooter;
