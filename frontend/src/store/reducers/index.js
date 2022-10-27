import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import chatSlice from "./chat";
import userSlice from "./user";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        chat: chatSlice.reducer,
        user: userSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
