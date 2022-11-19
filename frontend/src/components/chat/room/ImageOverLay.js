import Image from "next/image";
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
  width: 500px;
  height: 500px;
  position: relative;
  background-color: #fff;
`;

const OverlayCloseButton = styled.button`
  position: absolute;
  top: -1rem;
  right: -1rem;
  z-index: 1000;
  color: white;
  border: 3px solid #ffa7a5;
  background-color: #ffa7a5;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  font-size: 1.5rem;
`;

const ImageOverLay = ({ imgSrc, closeOverlay }) => {
  return (
    <ModalBackGround>
      <ModalContentWrapper>
        <OverlayCloseButton type="button" onClick={closeOverlay}>
          <i class="fa-solid fa-xmark"></i>
        </OverlayCloseButton>
        <Image src={imgSrc} layout={"fill"} objectFit={"contain"} />
      </ModalContentWrapper>
    </ModalBackGround>
  );
};

export default ImageOverLay;
