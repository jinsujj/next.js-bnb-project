import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

/*
리액트 포털
- https://reactjs.org/docs/portals.html

부모 컴포넌트의 DOM 계층 외부에 있는 DOM 노드로 자식을 렌더링 하는 방법<div className=""></div>
엘리먼트를 다른 엘리먼트에서 렌더링을 하게 하는 방법

1) React.createPortal(child, container);
첫번째 인자(child) : 리액트 컴포넌트
두번째 인자(container) : 실제 엘리먼트에 넣어줄 DOM 위치(id)
*/

const Container = styled.div`
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
`;

interface IProps {
  children: React.ReactNode;
  closePortal:() => void;
}

const ModalPortal: React.FC<IProps> = ({ children ,closePortal}) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector("#root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <Container>
        <div className="modal-background" 
            role="presentation"
            onClick={closePortal}/>
        {children}
      </Container>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;
