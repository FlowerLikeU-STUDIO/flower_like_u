import { createSlice } from "@reduxjs/toolkit";
import { fetchChatList } from "../actions/chat";

const initialState = {
  loading: false,
  display: false,
  // 한 번이라도 대화를 나눈 사람들의 리스트
  chatList: [],
  // stompJS 소켓 클라이언트
  client: null,
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
  currentLastMessage: "",
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
    clearChatList: () => initialState,

    setChatClient: (state, action) => {
      return {
        ...state,
        client: action.payload.chatClient,
      };
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
      return {
        ...state,
        currentRoomAddress: action.payload.address,
        currentStoreId: action.payload.storeId,
        currentConsumerId: action.payload.consumerId,
        currentReceiveType: action.payload.receiveType,
        currentReceiverId: action.payload.receiverId,
      };
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchChatList.fulfilled, (state, action) => {
      state.chatList = action.payload;
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
} = chatSlice.actions;
