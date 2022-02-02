import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Conatiner = styled.div`
  /* 위 (좌, 우) 아래 */
  padding: 62px 30px 100px;
  h2 {
      font-size: 19px;
      font-weight: 800;
      margin-bottom: 56px;
  }
  h3 {
      font-weight: bold;
      color: ${palette.gray_76};
      margin-bottom: 6px;
  }
  .register-room-step-info {
      font-size: 14px;
      max-width: 400px;
      margin-bottom: 24px;
      max-width: 400px;
      word-break: keep-all;
  }
`;

const RegisterRoomBedrooms: React.FC = () => {
    return (
        <Conatiner>
            <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
            <h3>2단계</h3>
            <p className="register-room-step-info">
                모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
            </p>
        </Conatiner>
    )
};

export default RegisterRoomBedrooms;