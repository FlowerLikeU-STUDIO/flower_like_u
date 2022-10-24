import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";

const ChatHeaderTitle = styled.div`
  padding: 0 0 0 14px;
  display: flex;
  align-items: center;
  & span {
    margin-left: 4px;
  }
`;
const ChatContent = ({ onClick }) => {
  const [chatMode, setChatMode] = useState("wait");
  return (
    <div>
      <ChatHeader
        left={
          chatMode === "wait" ? (
            <ChatHeaderTitle>
              <Image src={"/chatFlower.png"} width={30} height={30}></Image>
              <span>너 닮 톡</span>
            </ChatHeaderTitle>
          ) : (
            <button>이전</button>
          )
        }
        center={chatMode === "wait" ? <></> : <h1>멍뭉이님과의 대화</h1>}
        right={<button onClick={() => onClick(false)}>닫기</button>}
      />
    </div>
  );
};

export default ChatContent;
