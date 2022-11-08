import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// * session storage
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["custom"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: true,
  });

  return store;
};

const wrapper = createWrapper(createStore);

export default wrapper;
