import { createSlice } from "@reduxjs/toolkit";

const initialState = { topic: null };
export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    fetchTopics: (state, action) => {
      state.topic = action.payload;
    },
    
  },
});

export const { fetchTopics } = topicSlice.actions;
export default topicSlice.reducer;
