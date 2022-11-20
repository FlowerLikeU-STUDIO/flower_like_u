import { createSlice } from "@reduxjs/toolkit";
import {
  clearNotReadCount,
  fetchChatList,
  startChatting,
} from "../actions/chat";

const initialState = {
  loading: false,
  display: false,
  // 현재 채팅 상태 wait === "대기(리스트를 반환)" / chat === "특정 사용자와 채팅 중"
  mode: "wait",

  // 한 번이라도 대화를 나눈 사람들의 리스트
  chatList: [],
  // stompJS 소켓 클라이언트
  client: null,
  senderType: "",
  // 현재 대화를 나누고 있는 방 번호
  currentRoomAddress: "",
  // 현재 대화를 나누고 있는 꽃집의 ID
  currentStoreId: "",
  // 현재 대화를 나누고 있는 구매자의 ID
  currentConsumerId: "",
  // 현재 대화를 나누고 있는 상대방
  currentReceiveType: "",
  // 현재 대화를 나누고 있는 상대방의 ID
  currentReceiverId: "",
  // 현재 대화를 나누고 있는 상대방과 마지막으로 주고 받은 메세지
  currentLastMessage: "",
  // 현재 대화를 나누고 있는 상대방의 이름
  currentReceiverName: "",
  // 수신자가 읽지 않은 메세지 전체 개수
  totalNotReadCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleDisplay: (state, action) => {
      return {
        ...state,
        display: action.payload,
      };
    },
    toggleMode: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      };
    },

    quitChat: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearChatList: () => initialState,

    setChatClient: (state, action) => {
      return {
        ...state,
        client: action.payload.chatClient,
        senderType: action.payload.type,
      };
    },

    calcTotalNotReadCount: (state, action) => {
      let count = 0;
      state.chatList.forEach((item) => {
        state.senderType === "consumer"
          ? (count += item.consumerNotReadCnt)
          : (count += item.storeNotReadCnt);
      });
      state.totalNotReadCount = count;
    },
    addNewListItem: (state, action) => {
      const newItem = {
        id: action.payload.address,
        storeId: action.payload.storeId,
        consumerId: action.payload.consumerId,
        latestMessage: action.payload.content,
        storeNotReadCnt: 1,
        consumerNotReadCnt: 0,
      };
      return {
        ...state,
        chatList: [...state.chatList, newItem],
      };
    },
    updateChatList: (state, action) => {
      const updateChatList = state.chatList.map((item) => {
        return item.id === action.payload.address
          ? {
              ...item,
              latestMessage:
                action.payload.content !== "" ? action.payload.content : "사진",
              time: action.payload.time,
            }
          : { ...item };
      });

      return {
        ...state,
        chatList: updateChatList,
        currentLastMessage:
          state.currentRoomAddress === action.payload.address
            ? action.payload.uuid + action.payload.content
            : "",
      };
    },
    enterRoom: (state, action) => {
      state.mode = "chat";
      state.display = true;
      state.currentRoomAddress = action.payload.address;
      state.currentStoreId = action.payload.storeId;
      state.currentConsumerId = action.payload.consumerId;
      state.currentReceiveType = action.payload.receiveType;
      state.currentReceiverId = action.payload.receiverId;
      state.currentReceiverName = action.payload.receiverName;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
        let count = 0;
        state.chatList.forEach((item) => {
          state.senderType === "consumer"
            ? (count += item.consumerNotReadCnt)
            : (count += item.storeNotReadCnt);
        });
        state.totalNotReadCount = count;
      })
      .addCase(startChatting.fulfilled, (state, action) => {
        state.mode = "chat";
        state.display = true;
        state.currentRoomAddress = action.payload.address;
        state.currentStoreId = action.payload.storeId;
        state.currentConsumerId = action.payload.consumerId;
        state.currentReceiveType = "store";
        state.currentReceiverId = action.payload.storeId;
        state.currentReceiverName = action.payload.currentReceiverName;
        state.currentLastMessage = action.payload.latestMessage;
      }),
});

export default chatSlice;
export const {
  toggleDisplay,
  setChatClient,
  clearChatList,
  addNewListItem,
  updateChatList,
  enterRoom,
  toggleMode,
  quitChat,
  calcTotalNotReadCount,
} = chatSlice.actions;
