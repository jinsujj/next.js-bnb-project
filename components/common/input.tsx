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
  console.log(errorMessage);
  console.log(isValid);
  console.log(validateMode);
  console.log(useValidation);
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

export default Input;