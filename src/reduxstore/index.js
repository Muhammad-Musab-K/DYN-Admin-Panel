import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import UserSlice from "./Users/UserSlice";
import AuthReducer from "./Auth/AuthSlice";
import SidebarSlice from "./SideBar/SidebarSlice";

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
import PostSlice from "./Posts/PostSlice";

const allreducers = combineReducers({
  users: UserSlice,
  login: AuthReducer,
  posts: PostSlice,
  sidebar: SidebarSlice
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, allreducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
