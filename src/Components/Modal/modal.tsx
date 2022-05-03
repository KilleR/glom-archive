import React, {ReactChild, ReactChildren} from "react";
import styled from "@emotion/styled";

const Overlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex; // make us of Flexbox
  align-items: center; // does vertically center the desired content
  justify-content: center; // horizontally centers single line items
`;

const Content = styled.div`
  background: white;
  width: 400px;
  height: 300px;
  text-align: center; // optional, but helps horizontally center text that breaks into multiple lines
`;

const Modal = ({ visible, children }: { visible: boolean, children: ReactChild | ReactChildren }) => (
  <Overlay hidden={!visible}>
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  </Overlay>
);

export default Modal
