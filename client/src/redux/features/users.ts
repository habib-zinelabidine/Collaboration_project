import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUsers: null };
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state, action) => {
      state.currentUsers = action.payload;
    },
    
    
  },
});

export const { fetchUsers } = usersSlice.actions;
export default usersSlice.reducer;
