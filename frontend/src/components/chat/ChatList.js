import useUser from "@/hooks/useUser";
import { fetchChatList } from "@/store/actions/chat";
import { enterRoom, toggleMode } from "@/store/reducers/chat";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ChatListWrapper = styled.div`
  box-shadow: rgb(255 255 255 / 12%) 0px 0px 2px 0px inset,
    rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 8%) 0px 2px 6px;
  width: 100%;
  padding: 12px 0px 6px;
  border-radius: 10px;
`;

const ChatListParagraph = styled.p`
  white-space: pre-line;
  margin: 30px 0px;
`;
const ChatListTitle = styled.div`
  padding: 0px 14px 2px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

const ItemStyle = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 6px;
  margin: 4px 6px;
  cursor: pointer;
  border-radius: 14px;
  &:hover {
    background-color: #eee;
  }
  &.not_read {
    font-weight: 700;
  }
`;

const LastChatWrapper = styled.div`
  width: 270px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
`;

const TempDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;
const ChatList = () => {
  const chatListData = useSelector((props) =>
    props.chat.chatList.filter((item) => item.latestMessage !== "")
  );
  const { user } = useUser();
  const dispatch = useDispatch();

  const onHandleSendReceive = (address, storeId, consumerId, name) => {
    dispatch(
      enterRoom({
        address: address,
        storeId: storeId,
        consumerId: consumerId,
        receiveType: user.type === "consumer" ? "store" : "consumer",
        receiverId: user.type === "consumer" ? storeId : consumerId,
        receiverName: name,
      })
    );
  };

  return (
    <>
      <ChatListParagraph>
        {"플로리스트와의 상담을 통해\n나만의 꽃다발을 만들어보세요🌹"}
      </ChatListParagraph>
      <ChatListWrapper>
        <ChatListTitle>상담목록</ChatListTitle>
        <ol>
          {chatListData.length !== 0 ? (
            <>
              {chatListData.map((item, idx) => (
                <ChatList.Item
                  key={item.id + item.storeId}
                  {...item}
                  user={user}
                  onClick={() => {
                    onHandleSendReceive(
                      item.id,
                      item.storeId,
                      item.consumerId,
                      item.name
                    );
                  }}
                />
              ))}
            </>
          ) : (
            <>
              <TempDiv>진행중인 상담이 없습니다.</TempDiv>
            </>
          )}
        </ol>
      </ChatListWrapper>
    </>
  );
};

const confirmNotRead = (userType, consumerNotReadCnt, storeNotReadCnt) => {
  if (userType === "consumer" && parseInt(consumerNotReadCnt) === 0) {
    return "";
  }
  if (userType === "store" && parseInt(storeNotReadCnt) === 0) {
    return "";
  }
  return "not_read";
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.uuid === nextProps.uuid ? true : false;
};
const Item = (props) => {
  return (
    <ItemStyle
      onClick={props.onClick}
      className={confirmNotRead(
        props.user.type,
        props.consumerNotReadCnt,
        props.storeNotReadCnt
      )}
    >
      <div>
        <Image src={props.imgSrc || "/greetings.png"} width={36} height={36} />
      </div>
      <div>
        <div>{props.name}</div>
        <LastChatWrapper>{props.latestMessage}</LastChatWrapper>
      </div>
    </ItemStyle>
  );
};

ChatList.Item = React.memo(Item, areEqual);
export default ChatList;
