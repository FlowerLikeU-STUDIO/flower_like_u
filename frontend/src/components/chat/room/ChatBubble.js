import Modal from "@/components/modal";
import { modalOpen } from "@/store/reducers/modal";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import ImageOverLay from "./ImageOverLay";

const ChatBubbleWrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  &.mine {
    justify-content: end;
  }

  & img {
    cursor: pointer;
  }
`;

const ChatBubbleStyle = styled.div`
  text-align: start;
  width: fit-content;
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.85);
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  &.myBubble {
    color: rgb(255, 255, 255);
    background-color: rgb(103, 97, 236);
    border-radius: 18px;
  }
`;

const areEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id ? true : false;
};

const ChatBubble = (props) => {
  const [overlayImage, setOverlayImage] = useState("");
  const [overlayState, setOverlayState] = useState(false);
  const imageOverLay = () => {
    setOverlayImage(props.imgSrc);
    setOverlayState(true);
  };

  const closeOverlay = () => {
    setOverlayImage("");
    setOverlayState(false);
  };
  return (
    <>
      {overlayState && overlayImage ? (
        <ImageOverLay imgSrc={overlayImage} closeOverlay={closeOverlay} />
      ) : (
        <></>
      )}
      <ChatBubbleWrapper
        className={props.direction === props.type ? "mine" : ""}
        key={props.id}
      >
        <ChatBubbleStyle
          className={props.direction === props.type ? "myBubble" : ""}
        >
          {props.imgSrc ? (
            <Image
              src={props.imgSrc}
              width={200}
              height={200}
              onClick={imageOverLay}
            />
          ) : (
            props.content
          )}
        </ChatBubbleStyle>
      </ChatBubbleWrapper>
    </>
  );
};

export default React.memo(ChatBubble, areEqual);
