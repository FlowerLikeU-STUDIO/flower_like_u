import { socketClient } from "@/pages/api/socketClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatList = createAsyncThunk(
  "fetchChat",
  async (data, thunkAPI) => {
    const result = await socketClient
      .get(`chatting/room/list`)
      .then((res) => res);
    console.log(result);
    return result.data.response;
  }
);
