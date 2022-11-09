import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import chatSlice from "./chat";
import customSlice from "./custom";
import userSlice from "./user";
import modalSlice from "./modal";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        chat: chatSlice.reducer,
        user: userSlice.reducer,
        custom: customSlice.reducer,
        modal: modalSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
