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

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};
  svg {
    margin-right: 12px;
  }
`;

// 버튼 색상 구하기
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "dark_cran":
        return css`
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "dark_cran":
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;
    case "bittersweet":
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;
    case "gray_c4":
      return css`
        border: 1px solid ${palette.gray_c4};
        background-color: white;
        color: ${palette.gray_48};
      `;
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "dark_cran" | "white" | "gray_c4"| "bittersweet";
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<IProps> = ({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
    >
      {icon}
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
