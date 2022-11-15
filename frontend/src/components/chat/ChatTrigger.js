import { toggleDisplay } from "@/store/reducers/chat";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ChatTriggerWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  width: 60px;
  height: 60px;
  overflow: initial;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 26px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px, rgb(0 0 0 / 15%) 0px 8px 30px,
    rgb(255 255 255 / 20%) 0px 0px 0px 1px inset;
  transition: box-shadow 0.2s ease-out 0s;
  animation: 0.2s cubic-bezier(0.1, 0, 0.6, 1) 0.35s 1 normal backwards running
    triggerAnimation;

  @keyframes triggerAnimation {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const NotReadMark = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: #ffa7a5;
  border: 1px solid transparent;
`;
const ChatButton = styled.button``;

const ChatTrigger = () => {
  const { display } = useSelector((state) => state.chat);
  const { totalNotReadCount } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const onHandleDisplay = (value) => {
    dispatch(toggleDisplay(value));
  };
  return (
    <ChatTriggerWrapper hidden={display}>
      {totalNotReadCount !== 0 ? <NotReadMark /> : <></>}
      <ChatButton
        onClick={() => onHandleDisplay(true)}
        aria-label={"너닮꽃 너닮톡"}
      >
        <Image
          src={"/chatting.png"}
          width={"38px"}
          height={"38px"}
          alt={"너닮꽃 채팅"}
        />
      </ChatButton>
    </ChatTriggerWrapper>
  );
};

export default ChatTrigger;
