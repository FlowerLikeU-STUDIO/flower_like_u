import Image from "next/image";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ChatBubbleWrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  &.mine {
    justify-content: end;
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
  return (
    <ChatBubbleWrapper
      className={props.direction === props.type ? "mine" : ""}
      key={props.id}
    >
      <ChatBubbleStyle
        className={props.direction === props.type ? "myBubble" : ""}
      >
        {props.imgSrc ? (
          <Image src={props.imgSrc} width={200} height={200} />
        ) : (
          props.content
        )}
      </ChatBubbleStyle>
    </ChatBubbleWrapper>
  );
};

export default React.memo(ChatBubble, areEqual);
