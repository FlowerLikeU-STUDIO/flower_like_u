import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: false,
  chatList: [],
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
  },
  //   extraReducers: (builder) => builder.addCase,
});

export default chatSlice;
export const { toggleDisplay } = chatSlice.actions;
