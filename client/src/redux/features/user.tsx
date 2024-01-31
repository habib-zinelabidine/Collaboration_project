import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: null, error: null, loading: null };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    
  },
});

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;
