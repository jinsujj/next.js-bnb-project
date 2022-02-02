import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const normalButtonStyle = css`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

const RegisterButtonStyle = css`
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const Container = styled.button<{ styleType: "normal" | "register" }>`
  ${({ styleType }) =>
    styleType === "register" ? RegisterButtonStyle : normalButtonStyle}
  ${(props) => getButtonColor(props.color || "")};
`;

// 버튼 색상 구하기
const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cray":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    case "white":
      return css`
        background-color: white;
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "dark_cran" | "white";
  styleType?: "normal" | "register";
}

const Button: React.FC<IProps> = ({ children, color, styleType, ...props }) => {
  return (
    <Container {...props} color={color} styleType={styleType}>
      {children}
    </Container>
  );
};

/*
  회원가입, 로그인 폼은 무수한 useState 로 인하여 인풋 변경 시마다 렌더링 발생
  가능한 컴포넌트를 분리하여 리렌더를 막을 수 있다면 좋겠지만, SignUpModal 이 모든
  값을 가지고 있어야 하기 때문에 분리가 제한적입니다. 
  저희는 공통 컴포는트를 사용하여 인풋과 셀렉터를 만들었으며, 공통 컴포넌트는 props 값이
  자주 변경되기 때문에 props 의 값이 같다면 리렌더를 방지 
*/
export default React.memo(Button);
