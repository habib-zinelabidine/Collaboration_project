import { createSlice } from "@reduxjs/toolkit";

const initialState = { topics: null };
export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    fetchTopics: (state, action) => {
      state.topics = action.payload;
    },
    createTopic : (state,action)=>{
      let newTopic= [...state.topics,action.payload]
      state.topics=newTopic;
    },
    updateTopic: (state, action) => {
      let topic = state.topics.findIndex((topic) => {
        return topic._id === action.payload._id;
      });
      state.topics[topic] = action.payload;
    },
    deleteTopic : (state,action)=>{
      let deletedTopic = state.topics.filter((topic)=>{
          return topic._id !== action.payload;
      })
      state.topics = deletedTopic;
    
    }
  },
});

export const { fetchTopics, updateTopic,createTopic,deleteTopic } = topicSlice.actions;
export default topicSlice.reducer;
