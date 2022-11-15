import { socketClient } from "@/pages/api/socketClient";
import { clearNotReadCount, fetchChatList } from "@/store/actions/chat";
import { quitChat, toggleDisplay } from "@/store/reducers/chat";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";
import ChatRoom from "./room";

const ChatContentWrapper = styled.div`
  height: 100%;
`;
const ChatHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  & span {
    margin-left: 4px;
  }
`;

const ChatContentBody = styled.div`
  height: 100%;
  padding: 0px 18px;
`;

const ChatTargetTitle = styled.p``;
const ChatContent = () => {
  const { mode } = useSelector((state) => state.chat);
  const { currentReceiverName, currentRoomAddress } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const onHandleDisplay = (value) => {
    dispatch(toggleDisplay(value));
  };

  const handleQuitChat = async () => {
    dispatch(clearNotReadCount(currentRoomAddress));
    const data = {
      mode: "wait",
      currentRoomAddress: "",
      currentStoreId: "",
      currentConsumerId: "",
      currentReceiveType: "",
      currentReceiverId: "",
      currentLastMessage: "",
      currentReceiverName: "",
    };
    dispatch(quitChat(data));
  };
  return (
    <ChatContentWrapper>
      <ChatHeader
        className={mode === "chat" ? "underline" : ""}
        left={
          mode === "wait" ? (
            <ChatHeaderTitle>
              <Image src={"/chatFlower.png"} width={30} height={30}></Image>
              <span>너 닮 톡</span>
            </ChatHeaderTitle>
          ) : (
            <ChatHeaderTitle>
              <button type="button" onClick={handleQuitChat}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </ChatHeaderTitle>
          )
        }
        center={
          mode === "wait" ? (
            <></>
          ) : (
            <ChatTargetTitle>{currentReceiverName}님과의 대화</ChatTargetTitle>
          )
        }
        right={
          <button onClick={() => onHandleDisplay(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        }
      />
      <ChatContentBody>
        {mode === "wait" ? (
          <>
            <ChatList />
          </>
        ) : (
          <ChatRoom />
        )}
      </ChatContentBody>
    </ChatContentWrapper>
  );
};

export default ChatContent;
