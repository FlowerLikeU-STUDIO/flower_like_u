import useUser from "@/hooks/useUser";
import { updateChatList } from "@/store/reducers/chat";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useSWR from "swr";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const ChatRoomWrapper = styled.div`
  height: 100%;
`;

const ChatRoomBubblesWrapper = styled.div`
  height: 85%;
  overflow: scroll;
`;

const Target = styled.div`
  height: 1px;
`;

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const ChatRoom = ({ receiveId, receiveType, sendId, address, chatClient }) => {
  const { user } = useUser();
  const [roomChatContents, setRoomChatContents] = useState([]);
  const dispatch = useDispatch();
  const [{ latestMessage }] = useSelector((state) =>
    state.chat.chatList.filter((item) => item.id === address)
  );
  const sendMessage = async (value) => {
    chatClient.current.publish({
      destination: `/topic/public/${receiveType}/${receiveId}`,
      body: JSON.stringify({
        content: value,
        address: address,
        messageType: "RECEIVE",
        storeId: user.type === "consumer" ? receiveId : sendId,
        consumerId: user.type === "consumer" ? sendId : receiveId,
      }),
    });
    await axios.post("http://localhost:8080/api/chatting", {
      content: value,
      storeId: user.type === "consumer" ? receiveId : sendId,
      consumerId: user.type === "consumer" ? sendId : receiveId,
      direction: user.type,
      imgSrc: [],
    });
    await axios.put("http://localhost:8080/api/chatting/room", {
      id: address,
      storeId: user.type === "consumer" ? receiveId : sendId,
      consumerId: user.type === "consumer" ? sendId : receiveId,
      userType: receiveType,
      latestMessage: value,
    });
    const data = { address: address, content: value };
    dispatch(updateChatList(data));
    fetchRoomChat();
  };
  const fetchRoomChat = async () => {
    const res = await axios
      .get(`http://localhost:8080/api/chatting/${receiveId}/${sendId}`)
      .then((res) => res.data.response);
    setRoomChatContents([...res]);
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    await axios
      .post("http://localhost:8080/api/chatting", {
        content: "",
        storeId: user.type === "consumer" ? receiveId : sendId,
        consumerId: user.type === "consumer" ? sendId : receiveId,
        direction: user.type,
        imgSrc: [base64],
      })
      .then((res) => {
        chatClient.current.publish({
          destination: "/topic/public/store/2",
          body: JSON.stringify({
            content: "",
            address: address,
            messageType: "RECEIVE",
            storeId: user.type === "consumer" ? receiveId : sendId,
            consumerId: user.type === "consumer" ? sendId : receiveId,
            imgSrc: res.data.response,
          }),
        });
      });
    await axios.put("http://localhost:8080/api/chatting/room", {
      id: address,
      storeId: user.type === "consumer" ? receiveId : sendId,
      consumerId: user.type === "consumer" ? sendId : receiveId,
      userType: receiveType,
      latestMessage: "사진",
    });
    const data = { address: address, content: "사진" };
    dispatch(updateChatList(data));
    fetchRoomChat();
    e.target.value = null;
  };
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      block: "end",
    });
    fetchRoomChat();
  }, [roomChatContents.length, latestMessage]);
  return (
    <ChatRoomWrapper>
      <ChatRoomBubblesWrapper>
        {roomChatContents.map((item, idx) => (
          <ChatBubble key={item.id} {...item} type={user.type} />
        ))}
        <Target ref={scrollRef} />
      </ChatRoomBubblesWrapper>
      <ChatInput
        sendMessage={sendMessage}
        chatClient={chatClient}
        sendImage={sendImage}
      />
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
