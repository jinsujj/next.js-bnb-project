import Link from "next/link";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../lib/api/auth";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import { useSelector } from "../store";
import { userActions } from "../store/user";

const HeaderUserProfile: React.FC = () => {
  //모달을 열고 닫을 boolean값
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  /*
    useSelector 에서 user 객체를 불러오는 것에서 userProfileImage 하나만 불러오도록 수정
    useSelector는 비교를 할 때 객체의 주소를 비교하게 됩니다.
    유저 정보가 변경되어 user 가 변경된다면 객체가 새로 만들어져 user 객체를 불어온
    컴포넌트는 전부 리렌더링 될 것. userProfileImage 와 같이 원시타입을 사용한다면 리렌더링 방지 가능
   */
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const dispatch = useDispatch();

  //로그아웃
  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpened) {
          setIsUsermenuOpened(false);
        }
      }}
    >
      <button
        className="header-user-profile"
        type="button"
        onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
      >
        <HamburgerIcon />
        <img
          src={userProfileImage}
          className="header-user-profile-image"
          alt=""
        />
      </button>
      {isUsermenuOpened && (
        <ul className="header-usermenu">
          <li>숙소 관리</li>
          <Link href="/room/register/building">
            <a
              role="presentation"
              onClick={() => {
                setIsUsermenuOpened(false);
              }}
            >
              <li>숙소 등록하기</li>
            </a>
          </Link>
          <div className="header-usermenu-divider" />
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
