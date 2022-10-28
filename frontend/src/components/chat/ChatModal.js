import styled from "styled-components";
import ChatContent from "./ChatContent";

const ChatModalWrapper = styled.div`
  position: fixed !important;
  bottom: 25px !important;
  width: 370px !important;
  height: 80% !important;
  min-height: 520px !important;
  max-height: 680px !important;
  overflow: hidden !important;
  background-color: white !important;
  border-radius: 30px !important;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px !important;
  animation: 0.25s ease-out 0s 1 normal none running ChatContainerAnimation !important;
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

const ChatModal = ({ hidden, onClick }) => {
  return (
    <ChatModalWrapper hidden={hidden}>
      <ChatContent onClick={onClick} />
    </ChatModalWrapper>
  );
};

export default ChatModal;
