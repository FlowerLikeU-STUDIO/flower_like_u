import { useSelector } from "react-redux";
import styled from "styled-components";

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContentWrapper = styled.div`
  width: 80%;
  max-width: 920px;
  height: 520px;
  background-color: #fff;
  @media screen and (max-width: 720px) {
    height: 800px;
  }
`;

const Modal = ({ children }) => {
  return (
    <ModalBackGround>
      <ModalContentWrapper>{children}</ModalContentWrapper>
    </ModalBackGround>
  );
};
export default Modal;
