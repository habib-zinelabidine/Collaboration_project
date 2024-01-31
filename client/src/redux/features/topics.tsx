import { createSlice } from "@reduxjs/toolkit";

const initialState = { topics: null, error: null, loading: null };
export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    startFetchTopics : (state)=>{
      state.loading=true;
    },
    fetchTopics: (state, action) => {
      state.topics = action.payload;
      state.loading = false;
    },
    fetchTopic : (state,action)=>{
      state.topics = [action.payload];
    },
    createTopic: (state, action) => {
      let newTopic = [...state.topics, action.payload];
      state.topics = newTopic;
    },
    updateTopic: (state, action) => {
      let topic = state.topics.findIndex((topic) => {
        return topic._id === action.payload._id;
      });
      state.topics[topic] = action.payload;
    },
    deleteTopic: (state, action) => {
      let deletedTopic = state.topics.filter((topic) => {
        return topic._id !== action.payload;
      });
      state.topics = deletedTopic;
    },
  },
});

export const {startFetchTopics, fetchTopics, updateTopic, createTopic, deleteTopic,fetchTopic } =
  topicSlice.actions;
export default topicSlice.reducer;
