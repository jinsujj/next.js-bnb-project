import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Home from "../components/home/Home";

const Container = styled.div`
  font-size: 12px;
  color: gray;
`;

const index: React.FC = () => {
  return (
    <Container>
      <Header />
      <Home/>
    </Container>
  );
};

export default index;
