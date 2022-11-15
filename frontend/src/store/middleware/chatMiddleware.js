import { clearNotReadCount, fetchChatList } from "../actions/chat";
import { calcTotalNotReadCount } from "../reducers/chat";

export const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case clearNotReadCount.fulfilled.type:
      store.dispatch(fetchChatList());
      break;
    default:
      break;
  }

  return next(action);
};
