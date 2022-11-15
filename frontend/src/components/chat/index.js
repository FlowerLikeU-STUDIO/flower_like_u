import useUser from "@/hooks/useUser";
import storage from "@/lib/utils/storage";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ChatModal from "./ChatModal";
import ChatTrigger from "./ChatTrigger";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatList, renewalChatList } from "@/store/actions/chat";
import { v4 as uuidv4 } from "uuid";
import {
  addNewListItem,
  setChatClient,
  updateChatList,
} from "@/store/reducers/chat";
import { socketClient } from "@/pages/api/socketClient";

const ChatWrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: ${(props) => props.width};
`;

const chatClient = React.createRef({});

const Chat = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const { user } = useUser();
  const { display } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    const uuid = uuidv4();
    // const newMessage = { ...message, uuid: uuid };
    message.messageType === "START"
      ? dispatch(addNewListItem(message))
      : dispatch(fetchChatList());
  };

  const connectChatServer = () => {
    const testFunc = async () => {
      await chatClient.current.subscribe(
        `/topic/public/${user.type}/${user.userPk}`,
        onMessageReceived
      );
    };
    // STOMP 서버에 연결
    chatClient.current = new StompJs.Client({
      brokerURL: "wss://k7b2091.p.ssafy.io:443/socket/ws/websocket",
      // brokerURL: "ws://k7b2091.p.ssafy.io:8080/socket/ws/websocket",
      // brokerURL: "ws://k7b2091.p.ssafy.io:8080/socket/ws/websocket",
      // brokerURL: "wss://flowerlikeu.com:8080/socket/ws/websocket",
      // brokerURL: "wss://flowerlikeu.com/socket/ws/websocket",

      reconnectDelay: 5000,
      onConnect: () => {
        console.log("연결됐어~");
        testFunc();
      },
    });
    chatClient.current.activate();
    dispatch(
      setChatClient({ chatClient: chatClient.current, type: user.type })
    );
    dispatch(fetchChatList());
    // dispatch(fetchChatList({ type: user.type, uid: user.uid }));
  };

  useEffect(() => {
    if (isLogin && user && chatClient.current === null) {
      connectChatServer();
      return;
    }

    if (!isLogin && chatClient.current) {
      chatClient.current.deactivate();
      chatClient.current = null;
      return;
    }
  }, [isLogin, user]);

  return isLogin ? (
    <>
      <ChatWrapper width={display ? "400px" : ""}>
        <ChatModal />
        <ChatTrigger />
      </ChatWrapper>
    </>
  ) : (
    <></>
  );
};

export default Chat;
