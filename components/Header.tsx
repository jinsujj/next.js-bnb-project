import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import { useSelector } from "../store";
import palette from "../styles/palette";
import SignUpModal from "./auth/SignUpModal";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  /* 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      font-weight: 600;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
  .header-user-profile{
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border:0;
    box-shadow: 0px 1px 2px rgba(0,0,0,0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover{
      box-shadow: 0px 2px 8px rgba(0,0,0,0.12);
    }

    .header-user-profile-image{
      margin-left: 8px;
      width:30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  /* 모달 */
  .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .modal-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 10;
    }
    .modal-contents {
      width: 400px;
      height: 400px;
      background-color: white;
      z-index: 11;
    }
  }
`;

const Header: React.FC = () => {
  //모달을 열고 닫을 boolean값
  const { openModal, closeModal, ModalPortal } = useModal();
  const user = useSelector((state) => state.user);
  console.log("로그인")
  console.log(user);
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
          <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={openModal}
          >
            회원가입
          </button>
          <button type="button" className="header-login-button">
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <button className="header-user-profile" type="button">
          <HamburgerIcon/>
          <img src={user.profileImage} className="header-user-profile-image" alt=""/>
        </button>
      )}
      <ModalPortal>
        <SignUpModal closeModal = {closeModal}/>
      </ModalPortal>
    </Container>
  );
};

export default Header;
