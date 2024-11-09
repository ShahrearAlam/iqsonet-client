import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupId: null,
  topic: null
}

const topicSlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setTopic: (state, action) => {
      state.groupId = action.payload.groupId;
      state.topic = action.payload.topic;
    },
    resetTopic: () => initialState
  },
});

export const { setTopic, resetTopic } = topicSlice.actions;
export default topicSlice.reducer;
