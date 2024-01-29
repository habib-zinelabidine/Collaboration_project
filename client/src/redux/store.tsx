import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import usersReducer from './features/users'
import topicsReducer from './features/topics'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    user : persistedReducer,
    users : usersReducer,
    topics: topicsReducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck : false
    })
})

export const persistor = persistStore(store);
export default store;