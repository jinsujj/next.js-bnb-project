import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    --webkit-appearance: none;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? "white" : palette.snow};
      }
    `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
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
export default React.memo(Selector);
