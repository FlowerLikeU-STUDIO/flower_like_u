import useUser from "@/hooks/useUser";
import { socketClient } from "@/pages/api/socketClient";
import { clearNotReadCount } from "@/store/actions/chat";
import { updateChatList } from "@/store/reducers/chat";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

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

const getMilliseconds = () => {
  const date = new Date();
  return date.getMilliseconds();
};
const ChatRoom = () => {
  const { user } = useUser();
  const chatClient = useSelector((props) => props.chat.client);
  const {
    currentRoomAddress: address,
    currentStoreId: storeId,
    currentConsumerId: consumerId,
    currentReceiveType: receiveType,
    currentReceiverId: receiverId,
  } = useSelector((props) => props.chat);
  const [{ latestMessage, uuid }] = useSelector((state) => {
    if (state.chat.chatList.length === 0) {
      return [{ latestMessage: "", uuid: "" }];
    }
    const targetChatList = state.chat.chatList.filter(
      (item) => item.id === address
    )[0];
    if (targetChatList) {
      return [
        {
          latestMessage: targetChatList.latestMessage,
          uuid: targetChatList.uuid,
        },
      ];
    } else {
      return [{ latestMessage: "", uuid: "" }];
    }
  });
  const roomLatestMessage = useSelector(
    (state) => state.chat.currentLastMessage
  );
  const [roomChatContents, setRoomChatContents] = useState([]);
  const dispatch = useDispatch();

  const sendMessage = async (value) => {
    const milliseconds = getMilliseconds();
    const uuid = uuidv4();

    await socketClient.post("chatting", {
      content: value,
      opponent: user.type === "consumer" ? storeId : consumerId,
      imgSrc: [],
    });
    await socketClient.put("chatting/room", {
      id: address,
      opponent: user.type === "consumer" ? storeId : consumerId,
      latestMessage: value,
      uuid: uuid,
    });
    chatClient.publish({
      destination: `/topic/public/${receiveType}/${receiverId}`,
      body: JSON.stringify({
        content: value,
        address: address,
        messageType: "RECEIVE",
        storeId: storeId,
        consumerId: consumerId,
        time: milliseconds,
      }),
    });
    const data = { address: address, content: value };
    dispatch(updateChatList(data));
    fetchRoomChat();
  };
  const fetchRoomChat = async () => {
    const res = await socketClient
      .get(`chatting/message/${address}`)
      .then((res) => {
        return res.data.response;
      });
    setRoomChatContents([...res]);
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const milliseconds = getMilliseconds();
    const uuid = uuidv4();

    await socketClient
      .post("chatting", {
        content: "",
        opponent: user.type === "consumer" ? storeId : consumerId,
        imgSrc: [base64],
        uuid: uuid,
      })
      .then((res) => {
        chatClient.publish({
          destination: `/topic/public/${receiveType}/${receiverId}`,
          body: JSON.stringify({
            content: "",
            address: address,
            messageType: "RECEIVE",
            storeId: storeId,
            consumerId: consumerId,
            imgSrc: res.data.response,
          }),
        });
      });
    await socketClient
      .put("chatting/room", {
        id: address,
        opponent: user.type === "consumer" ? storeId : consumerId,
        latestMessage: "사진",
        uuid: uuid,
      })
      .then((res) => {
        const data = { address: address, content: "사진", time: milliseconds };
        dispatch(updateChatList(data));
      });

    fetchRoomChat();
    e.target.value = null;
  };
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      block: "end",
    });
    dispatch(clearNotReadCount(address));
  }, [roomChatContents.length, latestMessage]);

  useEffect(() => {
    fetchRoomChat();
  }, [roomLatestMessage, uuid]);
  return (
    <ChatRoomWrapper>
      <ChatRoomBubblesWrapper>
        {roomChatContents.map((item, idx) => (
          <ChatBubble key={item.id} {...item} type={user.type} />
        ))}
        <Target ref={scrollRef} />
      </ChatRoomBubblesWrapper>
      <ChatInput sendMessage={sendMessage} sendImage={sendImage} />
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
