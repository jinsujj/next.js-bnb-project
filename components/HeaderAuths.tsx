import React from "react";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import { authAction } from "../store/auth";
import AuthModal from "./auth/AuthModal";

const HeaderAuths: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();

  return (
    <>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authAction.setAuthMode("signup"));
            openModal();
          }}
        >
          회원가입
        </button>
        <button
          type="button"
          className="header-login-button"
          onClick={() => {
            dispatch(authAction.setAuthMode("login"));
            openModal();
          }}
        >
          로그인
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
