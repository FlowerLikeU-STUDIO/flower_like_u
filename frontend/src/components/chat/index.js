import useUser from "@/hooks/useUser";
import storage from "@/lib/utils/storage";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ChatModal from "./ChatModal";
import ChatTrigger from "./ChatTrigger";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useDispatch } from "react-redux";
import { fetchChatList } from "@/store/actions/chat";
import { updateChatList } from "@/store/reducers/chat";

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
  const [display, setDisplay] = useState(false);
  const onChangeDisplay = useCallback((value) => setDisplay(value), [display]);
  const dispatch = useDispatch();

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    dispatch(updateChatList(message));
  };

  const connectChatServer = () => {
    const testFunc = async () => {
      await chatClient.current.subscribe(
        `/topic/public/${user.type}/1`,
        onMessageReceived
      );
    };
    // STOMP 서버에 연결
    chatClient.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
      reconnectDelay: 5000,
      onConnect: () => {
        testFunc();
      },
    });
    chatClient.current.activate();
    dispatch(fetchChatList(user.type));
  };

  useEffect(() => {
    if (isLogin && user) {
      connectChatServer();
    }
    if (isLogin === null) {
      chatClient.current.deactivate();
    }
  }, [isLogin, user]);

  return isLogin ? (
    <>
      <ChatWrapper width={display ? "400px" : ""}>
        <ChatModal
          hidden={!display}
          onClick={onChangeDisplay}
          chatClient={chatClient}
        />
        <ChatTrigger hidden={display} onClick={onChangeDisplay} />
      </ChatWrapper>
    </>
  ) : (
    <></>
  );
};

export default Chat;

// if (imgSrcLst.length === 0)
//   stompClient.send(
//     "/topic/public/" + receiveType + "/" + receiveId,
//     {},
//     JSON.stringify({
//       content: document.querySelector("#id" + String(message.address.id)).value,
//       address: message.address.id,
//       messageType: "RECEIVE",
//       storeId: message.storeId,
//       consumerId: message.consumerId,
//     })
//   );
// // 메세지를 MongoDB에 저장한다. 'direction'을 통해 보낸 사람이 누구인지 명시한다.
// // 메세지 등록이 성공하면 해당 채팅방에 대한 최근 메세지 수정 요청을 보내고 element value도 수정한다.
// axios
//   .post("http://localhost:8080/api/chatting", {
//     content: document.querySelector("#id" + String(message.address)).value,
//     storeId: message.storeId,
//     consumerId: message.consumerId,
//     direction: document.querySelector("#userType").value,
//   })
//   .then((r) => {
//     if (imgSrcLst.length > 0)
//       stompClient.send(
//         "/topic/public/" + receiveType + "/" + receiveId,
//         {},
//         JSON.stringify({
//           content: document.querySelector("#id" + String(message.address))
//             .value,
//           address: message.address,
//           messageType: "RECEIVE",
//           storeId: message.storeId,
//           consumerId: message.consumerId,
//           imgSrc: r.data.response,
//         })
//       );
//   });
