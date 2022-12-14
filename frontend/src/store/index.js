import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import { chatMiddleware } from "./middleware/chatMiddleware";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// * session storage
const persistConfig = {
  key: "root",
  storage: storageSession,
  version: 1,
  whitelist: ["custom"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(chatMiddleware),
  devTools: false,
});

const setUpStore = (context) => store;
const makeStore = (context) => setUpStore(context);

export const persistor = persistStore(store);

export const wrapper = createWrapper(makeStore);
