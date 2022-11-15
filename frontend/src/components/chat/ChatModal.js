import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatContent from "./ChatContent";

const ChatModalWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  width: 400px;
  height: 80%;
  min-height: 520px;
  max-height: 680px;
  overflow: hidden;
  background-color: rgba(247, 247, 249, 1);
  border-radius: 30px;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;
  animation: 0.25s ease-out 0s 1 normal none running ChatContainerAnimation;
  @keyframes ChatContainerAnimation {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ChatModal = () => {
  const { display } = useSelector((state) => state.chat);
  return (
    <ChatModalWrapper hidden={!display}>
      <ChatContent />
    </ChatModalWrapper>
  );
};

export default ChatModal;
