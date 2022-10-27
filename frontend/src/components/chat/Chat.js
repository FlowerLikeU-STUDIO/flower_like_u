import { useCallback, useState } from "react";
import styled from "styled-components";
import ChatModal from "./ChatModal";
import ChatTrigger from "./ChatTrigger";

const ChatWrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: ${(props) => props.width};
`;

const Chat = () => {
  const [display, setDisplay] = useState(false);
  const onChangeDisplay = useCallback((value) => setDisplay(value), [display]);
  return (
    <>
      <ChatWrapper width={display ? "360px" : ""}>
        <ChatModal hidden={!display} onClick={onChangeDisplay} />
        <ChatTrigger hidden={display} onClick={onChangeDisplay} />
      </ChatWrapper>
    </>
  );
};

export default Chat;
