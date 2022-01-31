import { platform } from "os";
import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

type InputContainerProps = {
  iconExist : boolean;
  isValid : boolean;
  useValidation : boolean;
};

const Container = styled.div<InputContainerProps>`
  input{
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({iconExist}) => (iconExist ? "0 44px 0 11px": "0 11px")};
    border: 1px solid ${palette.gray_eb};
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus{
      border-color: ${palette.dark_cyan};
    }
  }
  svg{
    position: absolute;
    right: 11px;
    height: 44px;
    top:15px
  }
  .input-error-message{
    margin-top: 8px;
    font-weight: 600;
    font-size:14px;
    color: ${palette.tawny};
  }
  ${({useValidation, isValid}) => 
      useValidation &&
        !isValid &&
        css`
          input{
            background-color: ${palette.snow};
            border-color: ${palette.orange};
            & :focus {
              border-color: ${palette.orange}
            }
          }
        `}  
   ${({useValidation, isValid}) => 
        useValidation &&
          isValid &&
          css`
            input {
              border-color : ${palette.orange}
            }
          `
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon? : JSX.Element;
  isValid?: boolean;
  validateMode?: boolean;
  useValidation?: boolean;
  errorMessage?:string;
}

const Input: React.FC<IProps> = ({
  icon,
  isValid = false,
  useValidation,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      <input {...props}/>
      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  )
}

/*
  회원가입, 로그인 폼은 무수한 useState 로 인하여 인풋 변경 시마다 렌더링 발생
  가능한 컴포넌트를 분리하여 리렌더를 막을 수 있다면 좋겠지만, SignUpModal 이 모든
  값을 가지고 있어야 하기 때문에 분리가 제한적입니다. 
  저희는 공통 컴포는트를 사용하여 인풋과 셀렉터를 만들었으며, 공통 컴포넌트는 props 값이
  자주 변경되기 때문에 props 의 값이 같다면 리렌더를 방지 
*/
export default React.memo(Input);