import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeicon from "../../public/static/svg/auth/closed_eye.svg";
import palette from "../../styles/palette";
import Input from "../common/Input";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { userActions } from "../../store/user";

const Conatiner = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const dispatch = useDispatch();
  const {setValiedateMode} = useValidateMode();

  // 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 비밀번호 변경시
  const onChangedPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 비밀번호 숨길 토글하기
  const toggleHidePassword = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  // 회원가입 모달로 변경하기
  const changeToSignupModal = () =>{
    dispatch(authAction.setAuthMode("signup"));
  }


  useEffect(() => {
    return () => {
      setValiedateMode(false);
    }
  },[]);

  // 로그인 클릭시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    setValiedateMode(true);

    if(!email || !password){
      alert("이메일과 비밀번호를 입력해주세요");
    }
    else{
      const loginBody = { email, password};
      try{
        const {data} = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
      }
      catch(e){
        const errorMessage:string = e.message;
        if(errorMessage.includes("403")){
          alert("해당 계정이 없거나 비밀번호가 일치하지 않습니다.")
        }
      }
    }
  }

  return (
    <Conatiner onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          onChange={onChangeEmail}
          isValid={email !== ""}
          useValidation
          errorMessage="이메일이 필요합니다"
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={isPasswordHided ? "password" : "text"}
          icon={isPasswordHided ? (
            <CloseXIcon onClick={toggleHidePassword}/>
          ):(
            <OpenedEyeIcon onClick={toggleHidePassword}/>
          )}
          onChange={onChangedPassword}
          value={password}
          isValid={password !== ""}
          useValidation
          errorMessage="비밀번호를 입력하세요"
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit" color="bittersweet">로그인</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span className="login-modal-set-signup"
            role="presentation"
            onClick={changeToSignupModal}
        >회원가입</span>
      </p>
    </Conatiner>
  );
};

export default LoginModal;
