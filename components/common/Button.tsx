import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.button`
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

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

/*
  회원가입, 로그인 폼은 무수한 useState 로 인하여 인풋 변경 시마다 렌더링 발생
  가능한 컴포넌트를 분리하여 리렌더를 막을 수 있다면 좋겠지만, SignUpModal 이 모든
  값을 가지고 있어야 하기 때문에 분리가 제한적입니다. 
  저희는 공통 컴포는트를 사용하여 인풋과 셀렉터를 만들었으며, 공통 컴포넌트는 props 값이
  자주 변경되기 때문에 props 의 값이 같다면 리렌더를 방지 
*/
export default React.memo(Button);
