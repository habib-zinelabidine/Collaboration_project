import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import usersReducer from './features/users'
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
    users : usersReducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck : false
    })
})

export const persistor = persistStore(store);
export default store;

/* // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch */