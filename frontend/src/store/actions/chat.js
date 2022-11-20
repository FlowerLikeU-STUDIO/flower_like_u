import { socketClient } from "@/pages/api/socketClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatList = createAsyncThunk(
  "fetchChatList",
  async (data, thunkAPI) => {
    const result = await socketClient
      .get(`chatting/room/list`)
      .then((res) => res);
    return result.data.response;
  }
);

export const startChatting = createAsyncThunk(
  "startChat",
  async (data, thunkAPI) => {
    const res = await socketClient
      .get(`chatting/room/${data.storeId}`)
      .then((res) => res);
    if (res.status === 200) {
      const data = {
        address: res.data.response.id,
        consumerId: res.data.response.consumerId,
        storeId: res.data.response.storeId,
        currentReceiverName: res.data.response.name,
        latestMessage: res.data.response.latestMessage,
      };
      return data;
    }
  }
);

export const clearNotReadCount = createAsyncThunk(
  "clearNotReadCount",
  async (data, thunkAPI) => {
    const res = await socketClient
      .put("/chatting/room/cnt", {
        id: data,
      })
      .then((res) => res);
    return res.data;
  }
);
