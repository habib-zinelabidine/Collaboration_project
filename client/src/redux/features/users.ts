import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUsers: null, error: null, loading: null };
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startFetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsers: (state, action) => {
      state.currentUsers = action.payload;
      state.loading = false;
    },
  },
});

export const { startFetchUsers, fetchUsers } = usersSlice.actions;
export default usersSlice.reducer;
