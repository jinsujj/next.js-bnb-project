import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

interface IProps {
  closeModal: () => void;
}

const Container = styled.div`
  z-index: 11;
`;

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state) => state.auth.authMode);
  return (
    <Container>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && (
        <LoginModal closeModal={closeModal}>로그인</LoginModal>
      )}
    </Container>
  );
};

export default AuthModal;
